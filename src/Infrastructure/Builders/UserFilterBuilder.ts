import { FilterQuery } from "mongoose";
import User from "../../Domain/Models/User.js";
import UsersFilter from "../../Domain/Dtos/Filters/UsersFilter.js";
import BaseFilterBuilder from "./Abstractions/BaseFilterBuilder.js";

class UserFilterBuilder extends BaseFilterBuilder {
  private _userFilterQuery: FilterQuery<User> = {};

  private constructor() {
    super();
  }

  static filterBy(): UserFilterBuilder {
    return new UserFilterBuilder();
  }

  withUserName(usersFilter: UsersFilter): UserFilterBuilder {
    const userNameFilter = usersFilter.userName;

    if (!userNameFilter) return this;

    this._userFilterQuery.userName = this.getStringFilter(userNameFilter);

    return this;
  }

  withAnd(usersFilter: UsersFilter): UserFilterBuilder {
    const andFilter = usersFilter.and;

    if ((andFilter?.length ?? 0) === 0) return this;

    andFilter!.forEach(this.buildAndFilterRecursively, this);

    return this;
  }

  withOr(usersFilter: UsersFilter): UserFilterBuilder {
    const orFilter = usersFilter.or;

    if ((orFilter?.length ?? 0) === 0) return this;

    this._userFilterQuery.$or = [];

    orFilter!.forEach(this.buildOrFilterRecursively, this);

    return this;
  }

  private buildAndFilterRecursively(usersFilter: UsersFilter) {
    this.setUserNameFilterInAndFilter(usersFilter);
    this.setAndFilterInAndFilter(usersFilter);
    this.setOrFilterInAndFilter(usersFilter);

    return this._userFilterQuery.$and;
  }

  private setOrFilterInAndFilter(usersFilter: UsersFilter) {
    if ((usersFilter.or?.length ?? 0) > 0) {
      this._userFilterQuery.$and!.push({
        $or: usersFilter
          .or!.map(this.buildOrFilterRecursively, this)
          .reduce((x, y) => [...x!, ...y!], []),
      });
    }
  }

  private setAndFilterInAndFilter(usersFilter: UsersFilter) {
    if ((usersFilter.and?.length ?? 0) > 0) {
      this._userFilterQuery.$and!.push({
        $and: usersFilter
          .and!.map(this.buildAndFilterRecursively, this)
          .reduce((x, y) => [...x!, ...y!], []),
      });
    }
  }

  private setUserNameFilterInAndFilter(usersFilter: UsersFilter) {
    if (usersFilter.userName) {
      this._userFilterQuery.$and!.push({
        userName: this.getStringFilter(usersFilter.userName),
      });
    }
  }

  private buildOrFilterRecursively(usersFilter: UsersFilter) {
    const filterQueryUser: FilterQuery<User> = {};

    // this.setUserNameFilterInOrFilter(usersFilter);
    this.setFirstNameFilterInOrFilter(usersFilter, filterQueryUser);
    this.setLastNameFilterInOrFilter(usersFilter, filterQueryUser);
    // this.setAndFilterInOrFilter(usersFilter);
    // this.setOrFilterInOrFilter(usersFilter);
    this._userFilterQuery.$or?.push(filterQueryUser);
    return this._userFilterQuery.$or;
  }

  private setOrFilterInOrFilter(usersFilter: UsersFilter) {
    if ((usersFilter.or?.length ?? 0) > 0) {
      this._userFilterQuery.$or!.push({
        $or: usersFilter
          .or!.map(this.buildOrFilterRecursively, this)
          .reduce((x, y) => [...x!, ...y!], []),
      });
    }
  }

  private setAndFilterInOrFilter(usersFilter: UsersFilter) {
    if ((usersFilter.and?.length ?? 0) > 0) {
      this._userFilterQuery.$or!.push({
        $and: usersFilter
          .and!.map(this.buildAndFilterRecursively, this)
          .reduce((x, y) => [...x!, ...y!], []),
      });
    }
  }

  private setUserNameFilterInOrFilter(usersFilter: UsersFilter) {
    if (usersFilter.userName) {
      this._userFilterQuery.$or!.push({
        userName: this.getStringFilter(usersFilter.userName),
      });
    }
  }

  private setFirstNameFilterInOrFilter(
    usersFilter: UsersFilter,
    filterQueryUser: FilterQuery<User>
  ): FilterQuery<User> | undefined {
    if (!usersFilter.firstName) return undefined;

    filterQueryUser.firstName = this.getStringFilter(usersFilter.firstName);

    return filterQueryUser;
  }

  private setLastNameFilterInOrFilter(
    usersFilter: UsersFilter,
    filterQueryUser: FilterQuery<User>
  ) {
    if (!usersFilter.lastName) return undefined;

    filterQueryUser.lastName = this.getStringFilter(usersFilter.lastName);

    return filterQueryUser;
  }

  build(): FilterQuery<User> {
    return this._userFilterQuery;
  }
}

export default UserFilterBuilder;
