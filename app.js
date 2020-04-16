const http = require("http");
const urlMeta = require("url-metadata");
const PORT = 3000;

const sendError = (res, msg) => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ status: false, msg }));
  res.end();
};

const sendData = (res, msg, data) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ status: true, msg, data }));
  res.end();
};

const validUrl = (url) => {
  try {
    const x = new URL(url);
  } catch (error) {
    throw "Invalid Url";
  }
};

const getData = async (url) => {
  try {
    return await urlMeta(url);
  } catch (error) {
    throw error.Error;
  }
};

const server = http.createServer(async (req, res) => {
  const { pathname, searchParams } = new URL("http://localhost:3000" + req.url);
  const urlName = searchParams.get("url");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (pathname !== "/") {
    return sendError(res, "Wrong Route");
  }
  if (!urlName) {
    return sendError(res, "no url found add ?url=<your-url> at end");
  }
  try {
    validUrl(urlName);
    const data = await getData(urlName);
    const d = {
      title: data.title,
      url: data.url,
      source: data.source,
      type: data["og:type"],
      siteName: data["og:site_name"],
      img: data.image,
      desc: data.description,
      keywords: data.keywords,
      author: data.author,
    };
    return sendData(res, "Url Data", d);
  } catch (error) {
    return sendError(res, error);
  }
});
server.listen(PORT);
server.on("listening", () => {
  console.log(`Server running at port ${PORT}`);
});
