import { JSDOM } from "jsdom";

export function normalizeURL(url: string) {
  if (typeof url !== "string") {
    throw new Error("invalid input");
  }

  url = url.endsWith("/") ? url.slice(0, -1) : url;

  const cleanUrl = new URL(url);
  return `${cleanUrl.host}${cleanUrl.pathname}`;
}

export function getURLsFromHTML(htmlBody: string, baseUrl: string) {
  const dom = new JSDOM(htmlBody);
  const aTags = dom.window.document.querySelectorAll("a");

  return [...aTags.values()].map((a) =>
    a.href.startsWith("/") ? `${baseUrl}${a.href}` : a.href
  );
}

export async function crawlPage(
  baseUrl: string,
  currentUrl: string,
  pages: { [url: string]: number }
) {
  const baseDomain = new URL(baseUrl).hostname;
  const currentDomain = new URL(currentUrl).hostname;

  if (baseDomain !== currentDomain) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeURL(currentUrl);
  const normalizedBaseUrl = normalizeURL(baseUrl);

  if (normalizedCurrentUrl in pages) {
    pages[normalizedCurrentUrl]++;
    return pages;
  } else {
    pages[normalizedCurrentUrl] =
      normalizedBaseUrl === normalizedCurrentUrl ? 0 : 1;
  }

  console.log(`Fetching ${normalizedCurrentUrl}`);

  try {
    const response = await fetch(currentUrl);
    if (response.status != 200) {
      console.error(`HTTP Status Code: ${response.status}`);
      return pages;
    }
    if (!response.headers.get("Content-Type")?.startsWith("text/html")) {
      console.error(
        `Invalid Content-Type: ${response.headers.get("Content-Type")}`
      );
      return pages;
    }
    const html = await response.text();
    const urls = getURLsFromHTML(html, baseUrl);

    for (const url of urls) {
      pages = await crawlPage(baseUrl, url, pages);
    }

    return pages;
  } catch (e) {
    console.error("There was a problem crawling the page!");
    return pages;
  }
}
