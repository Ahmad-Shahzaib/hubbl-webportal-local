/* eslint consistent-return:0 import/order:0 */

const express = require("express");
const logger = require("./logger");
const favicon = require("serve-favicon");
const path = require("path");
const rawicons = require("./rawicons");
const rawdocs = require("./rawdocs");
const argv = require("./argv");
const port = require("./port");
const setup = require("./middlewares/frontendMiddleware");
const isDev = process.env.NODE_ENV !== "production";
const ngrok =
  // (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
  //   ? require("ngrok")
  //   : false;
  require("ngrok");
const { resolve } = require("path");
const cors = require("cors");
const corsOptions = {
  // origin: "https://hgvdriverhub.app/API/api/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  origin: "*",
  // allowedHeaders: "*",
  // allowedHeaders: [
  //   "Access-Control-Allow-Headers",
  //   "Access-Control-Allow-Origin",
  //   "Content-Type",
  //   "access-control-allow-origin",
  // ],
};
const app = express();
app.use(
  cors({
    preflightContinue: true,
    credentials: true,
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
// Load material icons
app.use("/api/icons", (req, res) => {
  res.json({
    records: [{ source: rawicons(req.query) }],
  });
});

// Load code preview
app.use("/api/docs", (req, res) => {
  res.json({
    records: [{ source: rawdocs(req.query) }],
  });
});

app.use("/", express.static("public", { etag: false }));
app.use(favicon(path.join("public", "favicons", "favicon.ico")));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), "build"),
  publicPath: "/",
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || "localhost";

// use the gzipped bundle
app.get("*.js", (req, res, next) => {
  req.url = req.url + ".gz"; // eslint-disable-line
  res.set("Content-Encoding", "gzip");
  next();
});

// Start your app.
app.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    console.log(url);
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
