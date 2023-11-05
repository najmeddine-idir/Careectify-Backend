import aws from "aws-sdk";

export function getAWSParameterPath(parameterName: string): string {
  return `/${process.env.APP_NAME}/${process.env.NODE_ENV}/${parameterName}`;
}

export function GetParameter(
  awsConfigurationParameters: aws.SSM.ParameterList,
  parameterName: string
) {
  const awsParameterPath = getAWSParameterPath(parameterName);
  const parameter = awsConfigurationParameters
    .filter((x: aws.SSM.Parameter) => x.Name === awsParameterPath)
    .pop()?.Value;

  if (!parameter) {
    throw new Error(`No parameter with name "${awsParameterPath}" was found!`);
  }

  return parameter;
}
