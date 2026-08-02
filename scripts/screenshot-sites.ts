import { chromium } from "playwright";
import { execSync } from "child_process";
import { mkdirSync, existsSync, unlinkSync } from "fs";

const dir = "public/projects";
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const SHOTS = [
  { name: "steelmade", url: "https://steelmade.co.in/" },
  { name: "kpdc-trifecta", url: "https://www.kpcollege.in/" },
  { name: "sterling", url: "https://sterlingsynergies.com/" },
  { name: "sopranos", url: "https://sopranosinc.com/" },
  { name: "greenshoot", url: "https://greenshoot.in/" },
  { name: "newsharness", url: "https://cf-news-intel-agent.random-planzz.workers.dev/" },
];

function pngToAvif(name: string) {
  const png = `${dir}/${name}.png`;
  const avif = `${dir}/${name}.avif`;
  if (!existsSync(png)) return;
  execSync(`magick ${png} -quality 50 ${avif}`, { stdio: "inherit" });
  unlinkSync(png);
  const kb = (require("fs").statSync(avif).size / 1024).toFixed(0);
  console.log(`  AVIF ${kb}KB`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true,
  });

  for (const { name, url } of SHOTS) {
    try {
      const page = await context.newPage();
      console.log(`${url} ...`);
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      await page.waitForTimeout(2000);
      const path = `${dir}/${name}.png`;
      await page.screenshot({ path, fullPage: false });
      await page.close();
      pngToAvif(name);
    } catch (err) {
      console.error(`  Failed: ${(err as Error).message}`);
    }
  }

  await browser.close();
  console.log("Done.");
}

main();
