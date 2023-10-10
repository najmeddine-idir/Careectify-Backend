import dotenv from "dotenv";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import useDependencyInjenction from "./dependencyInjection";
import "./src/Api/Controllers/UserController";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";

dotenv.config();

const port = process.env.PORT;

useDependencyInjenction().then((container) => {
  const liveReloadServer = livereload.createServer().once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  liveReloadServer.watch(__dirname);

  const server = new InversifyExpressServer(container);
  server
    .setConfig((app) => {
      // add body parser
      app
        .use(
          bodyParser.urlencoded({
            extended: true,
          })
        )
        .use(bodyParser.json())
        .use(connectLiveReload());
    })
    .build()
    .listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
