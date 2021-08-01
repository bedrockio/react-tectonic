const { version } = require("../package.json");
const { writeFileSync } = require("fs");
const path = require("path");

writeFileSync(
  path.resolve(__dirname, "../lib/metadata.json"),
  JSON.stringify({
    version,
  })
);
