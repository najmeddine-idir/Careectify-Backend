import dotenv from "dotenv";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import useDependencyInjenction from "./dependencyInjection";
import { InversifyExpressServer } from "inversify-express-utils";
import swaggerDocument from "./../dist/swagger.json";
import { serve, setup } from "swagger-ui-express";

/****************** Controllers *********************/
import "./Api/Controllers/UserController";

const port = process.env.PORT;

dotenv.config();

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
      app
        .use(connectLiveReload())
        .use("/swagger", serve, setup(swaggerDocument));
    })
    .build()
    .listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
