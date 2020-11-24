const lernaConfig = require("./lerna.json");
const versions = require("./versions.json");

const fs = require("fs");

if (!versions.some((ver) => ver === lernaConfig.version)) {
  versions.unshift(lernaConfig.version);
  try {
    fs.writeFileSync("./versions.json", JSON.stringify(versions));
  } catch (e) {
      console.error(e);
      process.exit(1);
  }
}
