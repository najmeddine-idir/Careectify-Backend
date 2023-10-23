import dotenv from "dotenv";
import useDependencyInjenction from "./dependencyInjection.js";
import { InversifyExpressServer } from "inversify-express-utils";
import swaggerDocument from "../../dist/swagger.json" assert { type: "json" };
import { serve, setup } from "swagger-ui-express";
import "../Common/Extensions/RequestExtensions.js";

/****************** Controllers *********************/
import "./Controllers/UserController.js";
import ErrorHandlerMiddleware from "./Middlewares/ErrorHandlerMiddleware.js";

const port = process.env.PORT;

dotenv.config();

useDependencyInjenction().then((container) => {
  const server = new InversifyExpressServer(container);

  server
    .setConfig((app) => {
      app
        .use("/swagger", serve, setup(swaggerDocument))
        .use((req, res, next) => {
          req.abortController = new AbortController();
          req.on("close", () => {
            req.abortController.abort();
          });
          next();
        });
    })
    .setErrorConfig((app) => {
      app.use(
        container
          .get<ErrorHandlerMiddleware>("ErrorHandlerMiddleware")
          .handle.bind(
            container.get<ErrorHandlerMiddleware>("ErrorHandlerMiddleware")
          )
      );
    })
    .build()
    .listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${port}/swagger`
      );
    });
});
