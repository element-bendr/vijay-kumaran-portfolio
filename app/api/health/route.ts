import { NextResponse } from "next/server";

export function GET() {
  const usingProvider = !!process.env.AI_PROVIDER_URL;
  const modelConfigured = usingProvider
    ? !!process.env.AI_PROVIDER_URL && !!process.env.AI_PROVIDER_KEY && !!process.env.AI_MODEL
    : !!process.env.CLOUDFLARE_ACCOUNT_ID && !!process.env.AI_GATEWAY_ID && !!process.env.AI_GATEWAY_TOKEN && !!process.env.AI_MODEL;

  return NextResponse.json({
    ok: true,
    model: modelConfigured ? "configured" : "missing",
    provider: usingProvider ? "custom" : "cloudflare-workers-ai",
  });
}
