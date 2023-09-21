const { test, expect, describe } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

describe("normalizeURL", () => {
  test("non-string input", () => {
    expect(() => {
      normalizeURL(2);
    }).toThrowError();
  });

  test("https trailing slash", () => {
    expect(normalizeURL("https://domain.com/path/")).toStrictEqual(
      "domain.com/path"
    );
  });

  test("https no slash", () => {
    expect(normalizeURL("https://domain.com/path")).toStrictEqual(
      "domain.com/path"
    );
  });

  test("http trailing slash", () => {
    expect(normalizeURL("http://domain.com/path/")).toStrictEqual(
      "domain.com/path"
    );
  });

  test("http no slash", () => {
    expect(normalizeURL("http://domain.com/path")).toStrictEqual(
      "domain.com/path"
    );
  });

  test("http non standard port", () => {
    expect(normalizeURL("http://domain.com:400/path")).toStrictEqual(
      "domain.com:400/path"
    );
  });

  test("https non standard port", () => {
    expect(normalizeURL("https://domain.com:401/path")).toStrictEqual(
      "domain.com:401/path"
    );
  });
});

describe("getURLsfromHTML", () => {
  const baseUrl = "https://boot.dev";
  const htmlBody = `
<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/"><span>Go to Boot.dev</span></a>
        <a href="/blog"><span>Go to Boot.dev</span></a>
        <a href="http://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://api.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>
`;

  test("no relative URLs", () => {
    const result = getURLsFromHTML(htmlBody);

    result.forEach((a) => {
      expect(a.startsWith("/")).toStrictEqual(false);
    });
  });
});
