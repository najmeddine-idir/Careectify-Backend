import ErrorCode from "../../../Common/Enums/ErrorCode.js";
import BaseResponse from "./Abstractions/BaseResponse.js";

export class ErrorResponse<T extends ErrorCode> extends BaseResponse {
  public status: T;
  public message: string;
  public details: string[];

  constructor(id: string, status: T, message: string, details: string[] = []) {
    super(id);

    this.status = status;
    this.message = message;
    this.details = details;
  }
}

export class ErrorNotFoundResponse extends ErrorResponse<ErrorCode.NotFound> {}

export class ErrorNotAuthorizedResponse extends ErrorResponse<ErrorCode.NotAuthorized> {}

export class ErrorUnexpectedErrorResponse extends ErrorResponse<ErrorCode.UnexpectedError> {}
