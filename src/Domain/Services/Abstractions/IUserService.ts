import Search from "../../Dtos/Filters/Common/Search.js";
import UsersFilter from "../../Dtos/Filters/UsersFilter.js";
import User from "../../Models/User.js";

interface IUserService {
  getUserByIdAsync(id: string, signal: AbortSignal): Promise<User>;
  getUsersAsync(usersSearch: Search<UsersFilter>, signal: AbortSignal): Promise<User[]>;
}

export default IUserService;
