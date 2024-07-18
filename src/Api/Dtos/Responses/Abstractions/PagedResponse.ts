import BaseResponse from "./BaseResponse.js";

class PagedResponse<T extends BaseResponse> {
  public readonly data: readonly T[];
  public readonly pageSize: number;
  public readonly pageIndex: number;
  public readonly dataCount: number;
  public readonly totalCount: number;

  constructor(
    data: readonly T[],
    pageIndex: number,
    pageSize: number,
    totalCount: number
  ) {
    this.data = data;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.dataCount = data.length;
    this.totalCount = totalCount;
  }
}

export default PagedResponse;
