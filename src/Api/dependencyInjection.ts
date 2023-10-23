import "reflect-metadata";
import aws from "aws-sdk";
import { Container, decorate, injectable } from "inversify";
import AWSCloudWatchConfiguration from "../../Configurations/AWSCloudWatchConfiguration.js";
import AWSConfiguration from "../../Configurations/Abstractions/AWSConfiguration.js";
import ILogger from "../Common/Utilities/Logger/Abstractions/ILogger.js";
import WinstonLogger from "../Common/Utilities/Logger/WinstonLogger.js";
import { getAWSParameterPath } from "../Common/Utilities/helpers.js";
import { Controller } from "tsoa";
import { Connection, connect } from "mongoose";
import MongoDBConfiguration from "../../Configurations/MongoDBConfiguration.js";
import IUserService from "../Domain/Services/Abstractions/IUserService.js";
import UserService from "../Domain/Services/UserService.js";
import IUserRepository from "../Domain/Abstractions/Repositories/IUserRepository.js";
import UserRepository from "../Infrastructure/Repositories/UserRepository.js";
import IRepository from "../Domain/Abstractions/Repositories/IRepository.js";
import MongoDBRepository from "../Infrastructure/Repositories/MongoDBRepository.js";
import User from "../Domain/Models/User.js";
import Constants from "../Common/Constants.js";
import ErrorHandlerMiddleware from "./Middlewares/ErrorHandlerMiddleware.js";

async function useDependencyInjenction(): Promise<Container> {
  const container = new Container({ skipBaseClassChecks: true });
  const awsSsm = new aws.SSM();

  const query: aws.SSM.GetParametersRequest = {
    Names: [
      getAWSParameterPath(Constants.CLOUD_WATCH_PARAMETER_NAME),
      getAWSParameterPath(Constants.MONGODB_PARAMETER_NAME),
    ],
    WithDecryption: true,
  };

  const parametersResult = await awsSsm.getParameters(query).promise();

  if (!parametersResult.Parameters || parametersResult.Parameters.length === 0)
    throw Error(
      "Unable to get stored parameters from AWS! Check if your credentials are still valid or if all the parameters name are still existing in AWS Parameter Store."
    );

  const mongoDBConfiguration = new MongoDBConfiguration(
    parametersResult.Parameters
  );

  const mongoose = await connect(mongoDBConfiguration.getConnectionString(), {
    dbName: mongoDBConfiguration.getDatabaseName(),
  });

  container
    .bind<ErrorHandlerMiddleware>("ErrorHandlerMiddleware")
    .to(ErrorHandlerMiddleware)
    .inSingletonScope();
  container
    .bind<aws.SSM.ParameterList>("SSM.ParameterList")
    .toConstantValue(parametersResult.Parameters);
  container.bind<Connection>("Connection").toConstantValue(mongoose.connection);
  container
    .bind<AWSConfiguration>(AWSConfiguration)
    .toSelf()
    .inSingletonScope();
  container
    .bind<AWSCloudWatchConfiguration>(AWSCloudWatchConfiguration)
    .toSelf()
    .inSingletonScope();
  container.bind<ILogger>("ILogger").to(WinstonLogger).inSingletonScope();
  container
    .bind<IUserService>("IUserService")
    .to(UserService)
    .inSingletonScope();
  container
    .bind<IUserRepository>("IUserRepository")
    .to(UserRepository)
    .inSingletonScope();
  container
    .bind<IRepository<User>>("IRepository<User>")
    .to(MongoDBRepository<User>)
    .inSingletonScope();

  decorate(injectable(), Controller);

  return container;
}

export default useDependencyInjenction;
