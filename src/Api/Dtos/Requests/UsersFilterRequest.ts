import { Example } from "tsoa";
import FilterObjectRequest from "./Common/FilterObjectRequest.js";
import FiltersRequest from "./Common/FiltersRequest.js";
import FilterOperator from "./Enums/FilterOperator.js";
import { DateTime } from "luxon";

@Example<UsersFilterRequest>({
  userName: {
    filterOperator: FilterOperator.EqualsTo,
    value: "Najmeddine",
  },
  and: [
    {
      createdAt: {
        filterOperator: FilterOperator.GreaterThan,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value: "15/06/1988 12:03:23 +01:00",
      },
    },
    {
      createdAt: {
        filterOperator: FilterOperator.LessThan,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value: "31/05/1990 12:03:23 +01:00",
      },
    },
  ],
  or: [
    {
      firstName: {
        filterOperator: FilterOperator.StartsWith,
        value: "Najm",
      },
      lastName: {
        filterOperator: FilterOperator.EndsWith,
        value: "ir",
      },
    },
    {
      firstName: {
        filterOperator: FilterOperator.StartsWith,
        value: "Sam",
      },
      lastName: {
        filterOperator: FilterOperator.EndsWith,
        value: "ir",
      },
    },
  ],
})
class UsersFilterRequest extends FiltersRequest<UsersFilterRequest> {
  public userName?: FilterObjectRequest<string>;
  public firstName?: FilterObjectRequest<string>;
  public lastName?: FilterObjectRequest<string>;
  public createdAt?: FilterObjectRequest<DateTime>;
}

export default UsersFilterRequest;
