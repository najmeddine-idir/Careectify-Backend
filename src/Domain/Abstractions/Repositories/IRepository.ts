import Search from "../../Dtos/Filters/Common/Search.js";
import UsersFilter from "../../Dtos/Filters/UsersFilter.js";
import BaseModel from "../../Models/Abstractions/BaseModel.js";

interface IRepository<T extends BaseModel> {
  findByIdAsync(id: string, signal: AbortSignal): Promise<T | null | undefined>;
  findAllAsync(usersSearch: Search<UsersFilter>, signal: AbortSignal): Promise<T[]>;
}

export default IRepository;
