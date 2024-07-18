import IUserRepository from "../Abstractions/Repositories/IUserRepository.js";
import IUserService from "./Abstractions/IUserService.js";
import User from "../Models/User.js";
import { inject, injectable } from "inversify";
import UserNotFoundError from "../Errors/UserNotFoundError.js";
import UsersFilter from "../Dtos/Filters/UsersFilter.js";
import Search from "../Dtos/Filters/Common/Search.js";

@injectable()
class UserService implements IUserService {
  private _userRepository: IUserRepository;

  constructor(@inject("IUserRepository") userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async getUserByIdAsync(id: string, signal: AbortSignal): Promise<User> {
    const user = await this._userRepository.findByIdAsync(id, signal);

    if (!user) throw new UserNotFoundError(id);

    return user;
  }

  async getUsersAsync(usersSearch: Search<UsersFilter>, signal: AbortSignal): Promise<User[]> {
    return await this._userRepository.findAllAsync(usersSearch, signal);
  }
}

export default UserService;
