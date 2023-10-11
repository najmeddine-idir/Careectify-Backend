import { inject, injectable } from "inversify";
import { SSM } from "aws-sdk";

@injectable()
abstract class AWSConfiguration {
  public readonly awsConfigurationParameters: SSM.ParameterList;

  constructor(
    @inject("SSM.ParameterList") awsConfigurationParameters: SSM.ParameterList
  ) {
    this.awsConfigurationParameters = awsConfigurationParameters;
  }
}

export default AWSConfiguration;
