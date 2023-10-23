import { injectable } from "inversify";
import AWSConfiguration from "./Abstractions/AWSConfiguration.js";
import { GetParameter } from "../src/Common/Utilities/helpers.js";
import Constants from "../src/Common/Constants.js";

@injectable()
class AWSCloudWatchConfiguration {
  public groupName: string;

  constructor(awsConfiguration: AWSConfiguration) {
    const cloudWatchParameter = GetParameter(
      awsConfiguration.awsConfigurationParameters,
      Constants.CLOUD_WATCH_PARAMETER_NAME
    );
    const awsCloudWatchConfiguration: AWSCloudWatchConfiguration = JSON.parse(
      cloudWatchParameter
    ) as AWSCloudWatchConfiguration;

    this.groupName = awsCloudWatchConfiguration.groupName;
  }
}

export default AWSCloudWatchConfiguration;
