import "server-only";

import { buildSystemPrompt, buildUserPrompt } from "./prompts";

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

export class ModelUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ModelUnavailableError";
  }
}

function env(name: string): string {
  const val = process.env[name];
  if (!val) {
    throw new ConfigError(`Missing environment variable: ${name}`);
  }
  return val;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateAskAnswer({
  question,
  corpus,
}: {
  question: string;
  corpus: string;
}): Promise<string> {
  const model = process.env.AI_MODEL ?? "@cf/meta/llama-3.1-8b-instruct";

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(question, corpus);

  const providerUrl = process.env.AI_PROVIDER_URL;
  let url: string;
  let token: string;

  if (providerUrl) {
    url = providerUrl;
    token = process.env.AI_PROVIDER_KEY ?? "";
    if (!token) {
      throw new ConfigError("AI_PROVIDER_URL is set but AI_PROVIDER_KEY is missing.");
    }
  } else {
    const accountId = env("CLOUDFLARE_ACCOUNT_ID");
    const gatewayId = env("AI_GATEWAY_ID");
    token = env("AI_GATEWAY_TOKEN");
    url = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/workers-ai/v1/chat/completions`;
  }

  const body = JSON.stringify({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.1,
    max_tokens: 1024,
  });

  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error(`Gateway server error: ${response.status}`);
        }
        throw new ModelUnavailableError(
          `AI Gateway returned ${response.status}: ${await response.text().catch(() => "")}`,
        );
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new ModelUnavailableError(
          "Model returned empty response.",
        );
      }

      return content;
    } catch (e) {
      lastError = e;
      if (e instanceof ModelUnavailableError || e instanceof ConfigError) {
        throw e;
      }
      if (attempt < 2) {
        await sleep(200 * Math.pow(2, attempt));
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new ModelUnavailableError(
    `Model unavailable after 3 attempts: ${String(lastError)}`,
  );
}
