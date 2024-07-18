import { DateTime } from "luxon";
import BaseModel from "./Abstractions/BaseModel.js";

export class User extends BaseModel {
  public userName?: string;
  public firstName?: string;
  public lastName?: string;
  public createdAt?: DateTime;
}

export default User;
