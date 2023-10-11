import "reflect-metadata";
import { SSM } from "aws-sdk";
import { Container, decorate, injectable } from "inversify";
import AWSCloudWatchConfiguration from "../Configurations/AWSCloudWatchConfiguration";
import AWSConfiguration from "../Configurations/Abstractions/AWSConfiguration";
import ILogger from "./Common/Utilities/Logger/Abstractions/ILogger";
import WinstonLogger from "./Common/Utilities/Logger/WinstonLogger";
import { getAWSParameterName } from "./Common/Utilities/helpers";
import { Controller } from "tsoa";

async function useDependencyInjenction(): Promise<Container> {
  const container = new Container();
  const awsSsm = new SSM();

    const query: SSM.GetParametersRequest = {
      Names: [
        getAWSParameterName("credentials"),
        getAWSParameterName("cloudWatch")
      ],
      WithDecryption: true,
    };

    const parametersResult = await awsSsm.getParameters(query).promise();

    container.bind<SSM.ParameterList>("SSM.ParameterList").toConstantValue(parametersResult.Parameters ?? []); 
    container.bind<AWSConfiguration>(AWSConfiguration).toSelf().inSingletonScope();
    container.bind<AWSCloudWatchConfiguration>(AWSCloudWatchConfiguration).toSelf().inSingletonScope();
    container.bind<ILogger>("ILogger").to(WinstonLogger).inSingletonScope();

    decorate(injectable(), Controller);

    return container;
}

export default useDependencyInjenction;
