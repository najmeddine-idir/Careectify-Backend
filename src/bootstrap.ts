import dotenv from "dotenv";
import useDependencyInjenction from "./dependencyInjection.js";
import { InversifyExpressServer } from "inversify-express-utils";
import swaggerDocument from "./../dist/swagger.json" assert { type: "json" };
import { serve, setup } from "swagger-ui-express";

/****************** Controllers *********************/
import "./Api/Controllers/UserController.js";

const port = process.env.PORT;

dotenv.config();

useDependencyInjenction().then((container) => {
  const server = new InversifyExpressServer(container);

  server
    .setConfig((app) => {
      app.use("/swagger", serve, setup(swaggerDocument));
    })
    .build()
    .listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${port}/swagger`
      );
    });
});
