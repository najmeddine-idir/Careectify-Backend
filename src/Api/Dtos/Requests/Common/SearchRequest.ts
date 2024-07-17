import SortRequest from "./SortRequest.js";

class SearchRequest<T> {
  public pageSize: number = 20;
  public pageIndex: number = 1;
  public filter?: T;
  public sort?: readonly SortRequest[];
}

export default SearchRequest;
