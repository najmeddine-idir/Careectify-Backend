import DomainError from "./Abstractions/DomainError.js";
import ErrorCode from "../../Common/Enums/ErrorCode.js";

class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(ErrorCode.NotFound);

    this.message = `User with id "${userId}" was not found.`;
  }
}

export default UserNotFoundError;
