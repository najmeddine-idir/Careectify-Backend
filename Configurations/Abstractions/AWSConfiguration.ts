import { inject, injectable } from "inversify";
import aws from "aws-sdk";

@injectable()
abstract class AWSConfiguration {
  public readonly awsConfigurationParameters: aws.SSM.ParameterList;

  constructor(
    @inject("SSM.ParameterList")
    awsConfigurationParameters: aws.SSM.ParameterList
  ) {
    this.awsConfigurationParameters = awsConfigurationParameters;
  }
}

export default AWSConfiguration;
