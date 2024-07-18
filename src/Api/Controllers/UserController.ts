import { inject } from "inversify";
import {
  Route,
  BaseHttpController,
  Get,
  Request,
  Tags,
  Response,
  Security,
  Body,
  Post,
  Path,
} from "../Utilities/webApi.js";
import express from "express";
import IUserService from "../../Domain/Services/Abstractions/IUserService.js";
import UserConverter from "../Converters/UserConverter.js";
import UserResponse from "../Dtos/Responses/UserResponse.js";
import {
  ErrorNotAuthorizedResponse,
  ErrorNotFoundResponse,
  ErrorUnexpectedErrorResponse,
} from "../Dtos/Responses/ErrorResponse.js";
import UsersFilterRequest from "../Dtos/Requests/UsersFilterRequest.js";
import PagedResponse from "../Dtos/Responses/Abstractions/PagedResponse.js";
import SearchRequest from "../Dtos/Requests/Common/SearchRequest.js";

@Security("bearer")
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
  @Response<ErrorNotAuthorizedResponse>(401)
  @Response<ErrorNotFoundResponse>(404)
  @Response<ErrorUnexpectedErrorResponse>(500)
  @Get("/:id")
  public async GetUser(
    @Path("id") id: string,
    @Request() { abortController }: express.Request
  ): Promise<UserResponse> {
    const user = await this._userService.getUserByIdAsync(id, abortController.signal);

    const userResponse = UserConverter.toUserResponse(user);

    return this.json(userResponse, 200) as UserResponse;
  }

  /**
   *
   * @param usersSearchRequest Users search request
   * @returns Paged list of users
   */
  @Response<PagedResponse<UserResponse>>(200)
  @Response<ErrorNotAuthorizedResponse>(401)
  @Response<ErrorUnexpectedErrorResponse>(500)
  @Post("/search")
  public async GetUsers(
    @Body() usersSearchRequest: SearchRequest<UsersFilterRequest>,
    @Request() { abortController }: express.Request
  ): Promise<UserResponse[]> {
    const usersSearch = UserConverter.toSearchUsersFilter(usersSearchRequest);
    const users = await this._userService.getUsersAsync(usersSearch, abortController.signal);
    const userResponses = UserConverter.toUserResponses(users);

    return this.json(userResponses, 200) as unknown as UserResponse[];
  }
}
