import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sitemap = fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
const siteUrl = "https://vijay-kumaran-portfolio-ask.pages.dev";
const routes = [...sitemap.matchAll(new RegExp(`<loc>${siteUrl.replaceAll(".", "\\.")}([^<]*)<\\/loc>`, "g"))].map(([, route]) => route || "/");

const linkAttr = (html, attribute) => {
  const match = html.match(new RegExp(`<link[^>]+${attribute}=["']([^"']+)["'][^>]*>`, "i"));
  return match?.[1] ?? "";
};
const meta = (html, name) => html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"))?.[1] ?? "";
const title = (html) => html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";

for (const route of routes) {
  const file = path.join(root, "out", route === "/" ? "index.html" : `${route.slice(1)}.html`);
  const html = fs.readFileSync(file, "utf8");
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/gi) ?? [];
  assert.equal(canonical.length, 1, `${route}: expected one canonical`);
  const expectedUrl = `${siteUrl}${route === "/" ? "" : route}`;
  assert.equal(linkAttr(canonical[0], "href"), expectedUrl, `${route}: canonical`);
  assert.equal(meta(html, "og:url"), expectedUrl, `${route}: og:url`);
  assert.equal(meta(html, "og:title"), title(html), `${route}: og:title`);
  assert.ok(meta(html, "og:description"), `${route}: og:description`);
  assert.equal(meta(html, "twitter:title"), meta(html, "og:title"), `${route}: twitter:title`);
  assert.equal(meta(html, "twitter:description"), meta(html, "og:description"), `${route}: twitter:description`);
  assert.equal(meta(html, "twitter:card"), "summary_large_image", `${route}: twitter:card`);
  assert.ok(meta(html, "og:image"), `${route}: og:image`);
  assert.ok(meta(html, "twitter:image"), `${route}: twitter:image`);

  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    const src = image[0].match(/\bsrc=["']([^"']+)["']/i)?.[1];
    const alt = image[0].match(/\balt=["']([^"']*)["']/i)?.[1];
    if (src?.startsWith("/")) assert.ok(fs.existsSync(path.join(root, "public", src.slice(1))), `${route}: missing ${src}`);
    assert.ok(alt, `${route}: image missing alt`);
  }
}

for (const file of ["out/thinking/cloudflare-native-news-intelligence-agent.html", "out/thinking/giving-ai-coding-agents-a-governed-memory.html", "out/thinking/what-client-delivery-actually-requires.html", "out/thinking/making-automation-reviewable-not-just-fast.html"]) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const pageTitle = title(html);
  assert.equal((pageTitle.match(/Vijay Kumaran/g) ?? []).length, 1, `${file}: title brand count`);
  const article = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/gi)]
    .map(([, json]) => JSON.parse(json))
    .find((schema) => schema["@type"] === "Article");
  assert.ok(article, `${file}: Article schema`);
  assert.ok(article.url, `${file}: Article url`);
  assert.deepEqual(article.mainEntityOfPage, { "@type": "WebPage", "@id": article.url }, `${file}: mainEntityOfPage`);
  assert.deepEqual(article.author, { "@type": "Person", "@id": `${siteUrl}/#person` }, `${file}: author`);
  assert.equal(article.headline, meta(html, "og:title").replace(" · Vijay Kumaran", ""), `${file}: headline`);
  assert.equal(article.description, meta(html, "og:description"), `${file}: description`);
  assert.ok(article.datePublished && !article.dateModified, `${file}: publication date`);
  assert.match(html, new RegExp(article.datePublished), `${file}: visible publication date`);
}

assert.match(fs.readFileSync(path.join(root, "out/404.html"), "utf8"), /noindex/i, "404: expected noindex");
console.log(`metadata check passed for ${routes.length} sitemap routes`);
