import {
  controller,
  httpGet,
  requestParam,
  BaseHttpController,
} from "inversify-express-utils";
import ILogger from "../../../Utilities/Abstractions/ILogger";
import { inject } from "inversify";

@controller("/users")
export class UserController extends BaseHttpController {
  private readonly _logger: ILogger;

  constructor(@inject("ILogger") logger: ILogger) {
    super();
    this._logger = logger;
  }

  @httpGet("/:id")
  public async GetUser(@requestParam("id") id: string) {
    try {
      return this.ok({
        id,
        name: "Najmeddine",
      });
    } catch (error: unknown) {
      this._logger.Error(error);

      if (error instanceof Error) {
        return this.internalServerError(error);
      }
    }
  }
}
