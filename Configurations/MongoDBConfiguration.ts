import aws from "aws-sdk";
import { GetParameter } from "../src/Common/Utilities/helpers.js";
import DatabaseConfiguration from "./Abstractions/DatabaseConfiguration.js";
import Constants from "../src/Common/Constants.js";

class MongoDBConfiguration extends DatabaseConfiguration {
  constructor(awsConfigurationParameters: aws.SSM.ParameterList) {
    super(awsConfigurationParameters);

    const mongoDBParameter = GetParameter(
      this._awsConfigurationParameters,
      Constants.MONGODB_PARAMETER_NAME
    );

    this._connectionString = JSON.parse(mongoDBParameter)["connectionString"];
    this._databaseName = JSON.parse(mongoDBParameter)["databaseName"];
  }
}

export default MongoDBConfiguration;
