import ILogger from "../../Common/Utilities/Logger/Abstractions/ILogger";
import { inject } from "inversify";
import { Route, Response, BaseHttpController, Get, fromRoute } from "../Utilities/webApi";

// @Tags("User")
@Route("/users")
export class UserController extends BaseHttpController {
  private readonly _logger: ILogger;

  constructor(@inject("ILogger") logger: ILogger) {
    super();
    this._logger = logger;
  }

  /**
   * Gets user by id.
   * @param id User id
   * @returns User
   */
  @Response<User>(200)
  @Response<Error>(500)
  @Get("/:id")
  public async GetUser(@fromRoute("id") id: string): Promise<User | unknown> {
    try {
      return this.json(new User(id, "Najmeddine"), 200);
    } 
    catch (error: unknown) {
      this._logger.Error(error);

      return this.json({message: (error as Error).message}, 500);
    }
  }
}

class User {
  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
