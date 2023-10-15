import { injectable } from "inversify";
import AWSConfiguration from "./Abstractions/AWSConfiguration.js";
import { getAWSParameterName } from "../src/Common/Utilities/helpers.js";
import { SSM } from "aws-sdk";

@injectable()
class AWSCloudWatchConfiguration {
  public groupName: string;

  constructor(awsConfiguration: AWSConfiguration) {
    const awsCloudWatchConfiguration: AWSCloudWatchConfiguration = JSON.parse(
      awsConfiguration.awsConfigurationParameters
        .filter(
          (x: SSM.Parameter) => x.Name === getAWSParameterName("cloudWatch")
        )
        .pop()?.Value ?? ""
    ) as AWSCloudWatchConfiguration;

    this.groupName = awsCloudWatchConfiguration.groupName;
  }
}

export default AWSCloudWatchConfiguration;
