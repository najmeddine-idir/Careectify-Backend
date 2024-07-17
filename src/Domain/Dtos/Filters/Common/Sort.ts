import SortDirection from "../Enums/SortDirection.js";

class Sort {
  public field: string = "id";
  public direction: SortDirection = SortDirection.Asc;

  constructor(field: string, direction: SortDirection) {
    this.field = field;
    this.direction = direction;
  }
}

export default Sort;
