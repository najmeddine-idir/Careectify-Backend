export function getAWSParameterName(parameterLastPathElement: string): string {
  return `/${process.env.APP_NAME}/${process.env.NODE_ENV}/${parameterLastPathElement}`;
}
