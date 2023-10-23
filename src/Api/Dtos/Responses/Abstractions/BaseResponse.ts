abstract class BaseResponse {
  public id?: string;

  constructor(id: string) {
    this.id = id;
  }
}

export default BaseResponse;
