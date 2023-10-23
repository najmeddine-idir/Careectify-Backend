import ErrorCode from "../../../Common/Enums/ErrorCode.js";

abstract class DomainError extends Error {
  public code: ErrorCode;
  public messageDetails: string[];

  constructor(code: ErrorCode, messageDetails: string[] = []) {
    super();

    this.code = code;
    this.messageDetails = messageDetails;
  }
}

export default DomainError;
