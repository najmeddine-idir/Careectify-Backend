import aws from "aws-sdk";

abstract class DatabaseConfiguration {
  protected _awsConfigurationParameters: aws.SSM.ParameterList;
  protected _connectionString?: string;
  protected _databaseName?: string;

  constructor(awsConfigurationParameters: aws.SSM.ParameterList) {
    this._awsConfigurationParameters = awsConfigurationParameters;
  }

  getConnectionString(): string {
    if (!this._connectionString)
      throw new Error("Unable to retrieve database connection string.");

    return this._connectionString;
  }

  getDatabaseName(): string {
    if (!this._databaseName)
      throw new Error("Unable to retrieve database name.");

    return this._databaseName;
  }
}

export default DatabaseConfiguration;
