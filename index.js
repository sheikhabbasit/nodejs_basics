const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////////////////////////////////////////////////
// Files
//////////////////////////////////////////////////////////////////////

// Blocking Code as it uses the sync option
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is my output text with the input text as being follows: ${textIn}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// Non Blocking Code here...
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       fs.writeFile(
//         "./txt/final.txt",
//         `${data3} ${data2}`,
//         "utf-8",
//         (err) => {}
//       );
//     });
//   });
// });

// console.log("sync code end");

/////////////////////////////////////////////////////////////////////////////////
// Server // HTTPS network
//////////////////////////////////////////////////////////////////////////////////

const JSONData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const ProductData = JSON.parse(JSONData);

const server = http.createServer((req, res) => {
  console.log("url", req.url);
  const pathname = req.url;

  if (pathname === "/overview" || pathname === "/") {
    res.end("Hello from the other side of the web! /n The Overview Page");
  }
  if (pathname === "/product") {
    res.end("Hello from the other side of the web! This is the product page");
  }
  if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(JSONData);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end(`<h1 style="color:red;">Requested resource not found</h1>`);
  }
});

server.listen(8000, "127.0.0.1", (err, res) => {
  console.log("Listening to server on 8000 port");
});
