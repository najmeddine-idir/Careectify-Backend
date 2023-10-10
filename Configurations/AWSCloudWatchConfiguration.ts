import { injectable } from "inversify";
import "reflect-metadata";
import AWSConfiguration from "./Abstractions/AWSConfiguration";
import { getAWSParameterName } from "../Utilities/helpers";

@injectable()
class AWSCloudWatchConfiguration {
  public groupName: string;

  constructor(awsConfiguration: AWSConfiguration) {
    const awsCloudWatchConfiguration: AWSCloudWatchConfiguration = JSON.parse(
      awsConfiguration.awsConfigurationParameters
        .filter((x) => x.Name === getAWSParameterName("cloudWatch"))
        .pop()?.Value ?? ""
    ) as AWSCloudWatchConfiguration;

    this.groupName = awsCloudWatchConfiguration.groupName;
  }
}

export default AWSCloudWatchConfiguration;
