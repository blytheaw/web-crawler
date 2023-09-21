const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  if (typeof url !== "string") {
    throw new Error("invalid input");
  }

  url = url.endsWith("/") ? url.slice(0, -1) : url;

  const cleanUrl = new URL(url);
  return `${cleanUrl.host}${cleanUrl.pathname}`;
}

function getURLsFromHTML(htmlBody, baseUrl) {
  const dom = new JSDOM(htmlBody);
  const aTags = dom.window.document.querySelectorAll("a");

  return [...aTags.values()].map((a) =>
    a.href.startsWith("/") ? `${baseUrl}${a.href}` : a.href
  );
}

async function crawlPage(baseUrl) {
  try {
    const response = await fetch(baseUrl);
    if (response.status != 200) {
      console.error(`HTTP Status Code: ${response.status}`);
      return;
    }
    if (!response.headers.get("Content-Type").startsWith("text/html")) {
      console.error(
        `Invalid Content-Type: ${response.headers.get("Content-Type")}`
      );
      return;
    }
    const html = await response.text();
    console.log(html);
  } catch (e) {
    console.error("There was a problem crawling the page!");
    return;
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
