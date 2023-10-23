import { inject } from "inversify";
import {
  Route,
  BaseHttpController,
  Get,
  FromRoute,
  Request,
  Tags,
  Response,
} from "../Utilities/webApi.js";
import express from "express";
import IUserService from "../../Domain/Services/Abstractions/IUserService.js";
import UserConverter from "../Converters/UserConverter.js";
import UserResponse from "../Dtos/Responses/UserResponse.js";
import {
  ErrorNotFoundResponse,
  ErrorUnexpectedErrorResponse,
} from "../Dtos/Responses/ErrorResponse.js";

@Tags("User")
@Route("/users")
export class UserController extends BaseHttpController {
  private readonly _userService: IUserService;

  constructor(@inject("IUserService") userService: IUserService) {
    super();

    this._userService = userService;
  }

  /**
   * Gets user by id.
   * @param id User id
   * @returns UserResponse
   */
  @Response<UserResponse>(200)
  @Response<ErrorNotFoundResponse>(404)
  @Response<ErrorUnexpectedErrorResponse>(500)
  @Get("/:id")
  public async GetUser(
    @FromRoute("id") id: string,
    @Request() { abortController }: express.Request
  ): Promise<UserResponse> {
    const user = await this._userService.getUserByIdAsync(
      id,
      abortController.signal
    );

    const userResponse = UserConverter.toUserResponse(user);

    return this.ok(userResponse) as UserResponse;
  }
}
