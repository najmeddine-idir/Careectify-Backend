import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import ILogger from "../../Common/Utilities/Logger/Abstractions/ILogger.js";
import crypto from "crypto";
import "../../Common/Extensions/ErrorExtensions.js";
import ErrorCode from "../../Common/Enums/ErrorCode.js";
import { ErrorNotAuthorizedResponse } from "../Dtos/Responses/ErrorResponse.js";
import jwt from "jsonwebtoken";
import Constants from "../../Common/Constants.js";
import { GetParameter } from "../../Common/Utilities/helpers.js";
import aws from "aws-sdk";

@injectable()
class AuthorizationMiddleware {
  private _logger: ILogger;
  private _publicKey: string;

  constructor(
    @inject("ILogger") logger: ILogger,
    @inject("SSM.ParameterList")
    awsConfigurationParameters: aws.SSM.ParameterList
  ) {
    const jwtPublicKey = GetParameter(
      awsConfigurationParameters,
      Constants.JWT_PARAMETER_NAME
    );

    this._logger = logger;
    this._publicKey = jwtPublicKey.replace(/\\n/g, "\n");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async handle(req: Request, res: Response, next: NextFunction) {
    const splittedAuthorizationHeader =
      req.headers["authorization"]?.split(" ");
    const errorNotAuthorizedResponse = new ErrorNotAuthorizedResponse(
      crypto.randomUUID(),
      ErrorCode.NotAuthorized,
      "Not authorized."
    );

    if (
      !splittedAuthorizationHeader ||
      splittedAuthorizationHeader.length !== 2
    ) {
      res.status(401).send(errorNotAuthorizedResponse);

      this._logger.error(errorNotAuthorizedResponse);

      return;
    }

    const accessToken = splittedAuthorizationHeader[1];

    jwt.verify(accessToken, this._publicKey, (err: jwt.VerifyErrors | null) => {
      if (err) {
        res.status(401).send(errorNotAuthorizedResponse);

        this._logger.error(err);

        return;
      }

      next();
    });
  }
}

export default AuthorizationMiddleware;
