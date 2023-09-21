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

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
