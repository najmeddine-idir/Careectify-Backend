import express from "express";
import dotenv from "dotenv";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

dotenv.config();

const port = process.env.PORT;
const liveReloadServer = livereload.createServer();

liveReloadServer.watch(__dirname);

liveReloadServer.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/bootstrap.ts");
  }, 100);
});

const app = express();

app.use(connectLiveReload());

app.get("/", (request, response) => {
  response.render("Express + TypeScript Server 456");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
