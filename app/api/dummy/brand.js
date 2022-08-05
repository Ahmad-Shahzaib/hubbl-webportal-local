const { platformConfig } = require("../platformConfig");

module.exports = {
  name: platformConfig.name || "Hubbl",
  desc: platformConfig.desc || "Hubbl",
  prefix: platformConfig.prefix || "hubbl",
  footerText:
    platformConfig.footerText || "Hubbl - All Rights Reserved 2022",
  logoText: platformConfig.logoText || "Hubbl",
};
