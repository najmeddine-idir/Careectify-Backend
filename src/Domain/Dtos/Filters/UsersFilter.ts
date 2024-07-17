import FilterObject from "./Common/FilterObject.js";
import Filters from "./Common/Filters.js";
import { DateTime } from "luxon";

class UsersFilter extends Filters<UsersFilter> {
  public userName?: FilterObject<string>;
  public firstName?: FilterObject<string>;
  public lastName?: FilterObject<string>;
  public createdAt?: FilterObject<DateTime>;
}

export default UsersFilter;
