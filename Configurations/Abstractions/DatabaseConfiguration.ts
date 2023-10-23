import aws from "aws-sdk";

abstract class DatabaseConfiguration {
  protected _awsConfigurationParameters: aws.SSM.ParameterList;
  protected _connectionString?: string;
  protected _databaseName?: string;

  constructor(awsConfigurationParameters: aws.SSM.ParameterList) {
    this._awsConfigurationParameters = awsConfigurationParameters;
  }

  abstract getConnectionString(): string;

  abstract getDatabaseName(): string;
}

export default DatabaseConfiguration;
