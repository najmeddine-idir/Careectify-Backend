import IUserRepository from "../../Domain/Abstractions/Repositories/IUserRepository.js";
import User from "../../Domain/Models/User.js";
import MongoDBRepository from "./MongoDBRepository.js";
import userMapper from "./../Mappers/UserMapper.js";
import mongoose from "mongoose";
import { injectable } from "inversify";

@injectable()
class UserRepository
  extends MongoDBRepository<User>
  implements IUserRepository
{
  constructor(connection: mongoose.Connection) {
    super(connection, userMapper.name, userMapper.schema);
  }
}

export default UserRepository;
