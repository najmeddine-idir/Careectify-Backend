import Sort from "./Sort.js";

class Search<T> {
  public pageSize: number = 20;
  public pageIndex: number = 1;
  public filter?: T;
  public sort?: readonly Sort[];
}

export default Search;
