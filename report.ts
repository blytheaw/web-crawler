export function printReport(pages: { [url: string]: number }) {
  console.log("Generating report...");

  const sortedPages = sortPages(pages);

  for (const page of sortedPages) {
    console.log(`Found ${page.count} internal links to ${page.url}`);
  }
}

function sortPages(pages: { [url: string]: number }) {
  const pagesArr = Object.keys(pages)
    .map((p) => ({ url: p, count: pages[p] }))
    .sort((x, y) => {
      if (x.count > y.count) {
        return -1;
      } else if (x.count == y.count) {
        return 0;
      } else {
        return 1;
      }
    });

  return pagesArr;
}
