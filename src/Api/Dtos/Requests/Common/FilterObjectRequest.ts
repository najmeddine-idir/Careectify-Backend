import FilterOperator from "../Enums/FilterOperator.js";

class FilterObjectRequest<T> {
  public filterOperator?: FilterOperator;
  public value?: T;
}

export default FilterObjectRequest;
