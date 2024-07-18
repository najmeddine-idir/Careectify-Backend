import FilterObject from "../../Domain/Dtos/Filters/Common/FilterObject.js";
import Search from "../../Domain/Dtos/Filters/Common/Search.js";
import UsersFilter from "../../Domain/Dtos/Filters/UsersFilter.js";
import User from "../../Domain/Models/User.js";
import FilterObjectRequest from "../Dtos/Requests/Common/FilterObjectRequest.js";
import SearchRequest from "../Dtos/Requests/Common/SearchRequest.js";
import UsersFilterRequest from "../Dtos/Requests/UsersFilterRequest.js";
import UserResponse from "../Dtos/Responses/UserResponse.js";

abstract class UserConverter {
  static toUserResponses(users: User[]): UserResponse[] {
    return users.map((user) => this.toUserResponse(user));
  }

  static toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    } as UserResponse;
  }

  static toSearchUsersFilter(
    usersSearchRequest: SearchRequest<UsersFilterRequest>
  ): Search<UsersFilter> {
    if (!usersSearchRequest.filter) throw new Error("No filter was specified!");

    return {
      pageIndex: usersSearchRequest.pageIndex,
      pageSize: usersSearchRequest.pageSize,
      filter: this.toUsersFilter(usersSearchRequest.filter),
      sort: usersSearchRequest.sort,
    } as Search<UsersFilter>;
  }

  private static toUsersFilter(usersFilterRequest: UsersFilterRequest): UsersFilter {
    return {
      userName: this.toFilterObject(usersFilterRequest.userName),
      firstName: this.toFilterObject(usersFilterRequest.firstName),
      lastName: this.toFilterObject(usersFilterRequest.lastName),
      createdAt: this.toFilterObject(usersFilterRequest.createdAt),
      and: usersFilterRequest.and?.map((x) => this.toUsersFilter(x)),
      or: usersFilterRequest.or?.map((x) => this.toUsersFilter(x)),
    } as UsersFilter;
  }

  private static toFilterObject<T>(
    filterObjectRequest: FilterObjectRequest<T> | undefined
  ): FilterObject<T> | undefined {
    if (!filterObjectRequest) return undefined;

    return {
      filterOperator: filterObjectRequest!.filterOperator,
      value: filterObjectRequest!.value,
    } as FilterObject<T>;
  }
}

export default UserConverter;
