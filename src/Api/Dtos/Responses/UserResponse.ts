import { DateTime } from "luxon";
import BaseResponse from "./Abstractions/BaseResponse.js";

class UserResponse extends BaseResponse {
  public userName?: string;
  public firstName?: string;
  public lastName?: string;
  public createdAt?: DateTime;
}

export default UserResponse;
