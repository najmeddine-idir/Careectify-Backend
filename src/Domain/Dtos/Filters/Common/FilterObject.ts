import FilterOperator from "../Enums/FilterOperator.js";

class FilterObject<T> {
  public filterOperator?: FilterOperator;
  public value?: T;
}

export default FilterObject;
