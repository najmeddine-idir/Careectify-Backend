import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import ILogger from "../../Common/Utilities/Logger/Abstractions/ILogger.js";
import DomainError from "../../Domain/Errors/Abstractions/DomainError.js";
import crypto from "crypto";
import "../../Common/Extensions/ErrorExtensions.js";
import ErrorCode from "../../Common/Enums/ErrorCode.js";
import {
  ErrorNotFoundResponse,
  ErrorUnexpectedErrorResponse,
} from "../Dtos/Responses/ErrorResponse.js";

@injectable()
class ErrorHandlerMiddleware {
  constructor(@inject("ILogger") private logger: ILogger) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handle(err: Error, req: Request, res: Response, next: NextFunction) {
    const errorId = crypto.randomUUID();

    err.id = errorId;

    this.logger.error(err);

    if (err instanceof DomainError) {
      switch (err.code) {
        case ErrorCode.NotFound:
          res
            .status(404)
            .send(
              new ErrorNotFoundResponse(
                errorId,
                ErrorCode.NotFound,
                err.message,
                err.messageDetails
              )
            );
          break;
      }
    } else {
      res
        .status(500)
        .send(
          new ErrorUnexpectedErrorResponse(
            errorId,
            ErrorCode.UnexpectedError,
            "Error occured when processing the request."
          )
        );
    }
  }
}

export default ErrorHandlerMiddleware;
