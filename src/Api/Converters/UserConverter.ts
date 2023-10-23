import User from "../../Domain/Models/User.js";
import UserResponse from "../Dtos/Responses/UserResponse.js";

abstract class UserConverter {
  static toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      userName: user.userName,
    } as UserResponse;
  }
}

export default UserConverter;
