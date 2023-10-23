import aws from "aws-sdk";
import { GetParameter } from "../src/Common/Utilities/helpers.js";
import DatabaseConfiguration from "./Abstractions/DatabaseConfiguration.js";
import Constants from "../src/Common/Constants.js";

class MongoDBConfiguration extends DatabaseConfiguration {
  constructor(awsConfigurationParameters: aws.SSM.ParameterList) {
    super(awsConfigurationParameters);
  }

  getConnectionString(): string {
    if (this._connectionString) return this._connectionString;

    const mongoDBParameter = GetParameter(
      this._awsConfigurationParameters,
      Constants.MONGODB_PARAMETER_NAME
    );

    return JSON.parse(mongoDBParameter)["connectionString"];
  }

  getDatabaseName(): string {
    if (this._databaseName) return this._databaseName;

    const mongoDBParameter = GetParameter(
      this._awsConfigurationParameters,
      Constants.MONGODB_PARAMETER_NAME
    );

    return JSON.parse(mongoDBParameter)["databaseName"];
  }
}

export default MongoDBConfiguration;
