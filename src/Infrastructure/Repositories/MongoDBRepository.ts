import { inject, injectable } from "inversify";
import IRepository from "../../Domain/Abstractions/Repositories/IRepository.js";
import BaseModel from "../../Domain/Models/Abstractions/BaseModel.js";
import mongoose from "mongoose";
import Search from "../../Domain/Dtos/Filters/Common/Search.js";
import UsersFilter from "../../Domain/Dtos/Filters/UsersFilter.js";
import UserFilterBuilder from "../Builders/UserFilterBuilder.js";

@injectable()
class MongoDBRepository<T extends BaseModel> implements IRepository<T> {
  private _context?: mongoose.Model<T>;

  constructor(
    @inject("Connection") connection: mongoose.Connection,
    name: string,
    schema: mongoose.Schema<T>
  ) {
    this._context = connection.model<T>(name, schema);
  }

  async findByIdAsync(id: string): Promise<T | null | undefined> {
    return await this._context?.findById<T>(id).exec();
  }

  async findAllAsync(usersSearch: Search<UsersFilter>, signal: AbortSignal): Promise<T[]> {
    const usersFilterQuery = UserFilterBuilder.filterBy()
      .withUserName(usersSearch.filter!)
      .withAnd(usersSearch.filter!)
      .withOr(usersSearch.filter!)
      .build();

    console.log(usersFilterQuery.$or);

    return (
      (await this._context
        ?.find<T>(usersFilterQuery)
        .limit(usersSearch.pageSize)
        .skip((usersSearch.pageIndex - 1) * usersSearch.pageSize)
        .exec()) ?? new Array<T>(0)
    );
  }
}

export default MongoDBRepository;
