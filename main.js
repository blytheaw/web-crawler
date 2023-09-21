const process = require("node:process");
const { crawlPage } = require("./crawl.js");

async function main() {
  if (process.argv.length != 3) {
    console.error("Invalid number of arguments. Provide one argument: baseUrl");
    process.exit(1);
  }

  const baseUrl = process.argv[2];
  console.log(`Starting crawler at URL: ${baseUrl}`);

  await crawlPage(baseUrl);
}

main();
