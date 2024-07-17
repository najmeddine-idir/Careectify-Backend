import { match } from "ts-pattern";
import FilterObject from "../../../Domain/Dtos/Filters/Common/FilterObject.js";
import FilterOperator from "../../../Domain/Dtos/Filters/Enums/FilterOperator.js";

abstract class BaseFilterBuilder {
  protected getStringFilter(filterObject: FilterObject<string>): unknown {
    return match(filterObject.filterOperator)
      .with(FilterOperator.EqualsTo, this.forStringEqualsTo(filterObject))
      .with(FilterOperator.NotEqualsTo, this.forStringNotEqualsTo(filterObject))
      .with(FilterOperator.StartsWith, this.forStringStartsWith(filterObject))
      .with(FilterOperator.NotStartsWith, this.forStringNotStartsWith(filterObject))
      .with(FilterOperator.Contains, this.forStringContains(filterObject))
      .with(FilterOperator.NotContains, this.forStringNotContains(filterObject))
      .with(FilterOperator.EndsWith, this.forStringEndsWith(filterObject))
      .with(FilterOperator.NotEndsWith, this.forStringNotEndsWith(filterObject))
      .otherwise(() => {
        throw new Error(
          `The filter operator ${filterObject.filterOperator} is not allowed for a filter field of type string.`
        );
      });
  }

  private throwExceptionIfNoValue(filterObject: FilterObject<string>) {
    if (!filterObject.value)
      throw new Error(
        `The filter operator ${filterObject.filterOperator} is not allowed to have ${
          filterObject.value === "" ? '""' : filterObject.value
        } as filter value.`
      );
  }

  private forStringEqualsTo(filterObject: FilterObject<string>) {
    return () => {
      return { $eq: filterObject.value };
    };
  }

  private forStringNotEqualsTo(filterObject: FilterObject<string>) {
    return () => {
      return { $ne: filterObject.value };
    };
  }

  private forStringStartsWith(filterObject: FilterObject<string>) {
    return () => {
      this.throwExceptionIfNoValue(filterObject);
      return { $regex: `^${filterObject.value}` };
    };
  }

  private forStringNotStartsWith(filterObject: FilterObject<string>) {
    return () => {
      this.throwExceptionIfNoValue(filterObject);
      return { $regex: `^(?!${filterObject.value})` };
    };
  }

  private forStringContains(filterObject: FilterObject<string>) {
    return () => {
      this.throwExceptionIfNoValue(filterObject);
      return { $regex: filterObject.value };
    };
  }

  private forStringNotContains(filterObject: FilterObject<string>) {
    return () => {
      this.throwExceptionIfNoValue(filterObject);
      return { $regex: `^((?!${filterObject.value}).)*$` };
    };
  }

  private forStringEndsWith(filterObject: FilterObject<string>) {
    return () => {
      this.throwExceptionIfNoValue(filterObject);
      return { $regex: `${filterObject.value}$` };
    };
  }

  private forStringNotEndsWith(filterObject: FilterObject<string>) {
    return () => {
      this.throwExceptionIfNoValue(filterObject);
      return { $regex: `${filterObject.value}(?!$)` };
    };
  }
}

export default BaseFilterBuilder;
