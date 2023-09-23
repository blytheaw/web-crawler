import process from "node:process";
import { crawlPage } from "./crawl";
import { printReport } from "./report";

async function main() {
  if (process.argv.length != 3) {
    console.error("Invalid number of arguments. Provide one argument: baseUrl");
    process.exit(1);
  }

  const baseUrl = process.argv[2];
  console.log(`Starting crawler at URL: ${baseUrl}`);

  const pages = await crawlPage(baseUrl, baseUrl, {});

  printReport(pages);
}

main();
