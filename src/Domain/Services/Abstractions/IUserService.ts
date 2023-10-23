import User from "../../Models/User.js";

interface IUserService {
  getUserByIdAsync(id: string, signal: AbortSignal): Promise<User>;
}

export default IUserService;
