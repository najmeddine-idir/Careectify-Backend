import { SSM } from "aws-sdk";
import { Container } from "inversify";
import AWSCloudWatchConfiguration from "./Configurations/AWSCloudWatchConfiguration";
import AWSConfiguration from "./Configurations/Abstractions/AWSConfiguration";
import ILogger from "./Utilities/Abstractions/ILogger";
import WinstonLogger from "./Utilities/WinstonLogger";
import "reflect-metadata";
import { getAWSParameterName } from "./Utilities/helpers";

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

    return container;
}

export default useDependencyInjenction;
