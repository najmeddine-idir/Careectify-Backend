import "reflect-metadata";
import aws from "aws-sdk";
import { Container, decorate, injectable } from "inversify";
import AWSCloudWatchConfiguration from "../Configurations/AWSCloudWatchConfiguration.js";
import AWSConfiguration from "../Configurations/Abstractions/AWSConfiguration.js";
import ILogger from "./Common/Utilities/Logger/Abstractions/ILogger.js";
import WinstonLogger from "./Common/Utilities/Logger/WinstonLogger.js";
import { getAWSParameterName } from "./Common/Utilities/helpers.js";
import { Controller } from "tsoa";

async function useDependencyInjenction(): Promise<Container> {
  const container = new Container();
  const awsSsm = new aws.SSM();

  const query: aws.SSM.GetParametersRequest = {
    Names: [getAWSParameterName("cloudWatch")],
    WithDecryption: true,
  };

  const parametersResult = await awsSsm.getParameters(query).promise();

  if (!parametersResult.Parameters || parametersResult.Parameters.length === 0)
    throw Error(
      "Unable to get stored parameters from AWS! Check if your credentials are still valid or if the parameters name are still existing in AWS Parameter Store."
    );

  container
    .bind<aws.SSM.ParameterList>("SSM.ParameterList")
    .toConstantValue(parametersResult.Parameters);
  container
    .bind<AWSConfiguration>(AWSConfiguration)
    .toSelf()
    .inSingletonScope();
  container
    .bind<AWSCloudWatchConfiguration>(AWSCloudWatchConfiguration)
    .toSelf()
    .inSingletonScope();
  container.bind<ILogger>("ILogger").to(WinstonLogger).inSingletonScope();

  decorate(injectable(), Controller);

  return container;
}

export default useDependencyInjenction;
