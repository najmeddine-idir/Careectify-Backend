import aws from "aws-sdk";
import { inject, injectable } from "inversify";
import { GetParameter } from "../src/Common/Utilities/helpers.js";
import Constants from "../src/Common/Constants.js";

@injectable()
class AWSCloudWatchConfiguration {
  private _groupName?: string;

  constructor(
    @inject("SSM.ParameterList")
    awsConfigurationParameters: aws.SSM.ParameterList
  ) {
    const cloudWatchParameter = GetParameter(
      awsConfigurationParameters,
      Constants.CLOUD_WATCH_PARAMETER_NAME
    );

    this._groupName = JSON.parse(cloudWatchParameter)["groupName"];
  }

  getGroupName(): string {
    if (!this._groupName)
      throw new Error("Unable to retrieve Amazon CloudWatch group name.");

    return this._groupName;
  }
}

export default AWSCloudWatchConfiguration;
