import User from "../../Models/User.js";
import IRepository from "./IRepository.js";

interface IUserRepository extends IRepository<User> {}

export default IUserRepository;
