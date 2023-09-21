const process = require("node:process");

function main() {
  if (process.argv.length != 3) {
    console.error("Invalid number of arguments. Provide one argument: baseUrl");
    process.exit(1);
  }

  console.log(`Starting crawler at URL: ${process.argv[2]}`);
}

main();
