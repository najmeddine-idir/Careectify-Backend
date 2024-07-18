import inversifyExpressUtils from "inversify-express-utils";
import tsoa from "tsoa";

export function Route(path: string): (target: unknown) => void {
  const controllerFuntion = inversifyExpressUtils.controller(path);
  const routeFuntion = tsoa.Route(path);

  return (target: unknown) => {
    controllerFuntion(target);
    routeFuntion(target);
  };
}

export function Get(path: string): (target: unknown, key: string, value: unknown) => void {
  const httpGetFuntion = inversifyExpressUtils.httpGet(path);
  const getFuntion = tsoa.Get(path);

  return (target: unknown, key: string, value: unknown) => {
    httpGetFuntion(target, key, value);
    getFuntion(target, key, value);
  };
}

export function Post(path: string): (target: unknown, key: string, value: unknown) => void {
  const httpPostFuntion = inversifyExpressUtils.httpPost(path);
  const postFuntion = tsoa.Post(path);

  return (target: unknown, key: string, value: unknown) => {
    httpPostFuntion(target, key, value);
    postFuntion(target, key, value);
  };
}

export function Query(name: string): (target: object, key: string, parameterIndex: number) => void {
  const queryParamFuntion = inversifyExpressUtils.queryParam(name);
  const queryFuntion = tsoa.Query(name);

  return (target: object, key: string, parameterIndex: number) => {
    queryParamFuntion(target, key, parameterIndex);
    queryFuntion(target, key, parameterIndex);
  };
}

export function Path(name: string): (target: object, key: string, parameterIndex: number) => void {
  const requestParamFuntion = inversifyExpressUtils.requestParam(name);
  const pathFuntion = tsoa.Path(name);

  return (target: object, key: string, parameterIndex: number) => {
    requestParamFuntion(target, key, parameterIndex);
    pathFuntion(target, key, parameterIndex);
  };
}

export function Body(): (target: object, key: string, parameterIndex: number) => void {
  const requestBodyFuntion = inversifyExpressUtils.requestBody();
  const bodyFuntion = tsoa.Body();

  return (target: object, key: string, parameterIndex: number) => {
    requestBodyFuntion(target, key, parameterIndex);
    bodyFuntion(target, key, parameterIndex);
  };
}

export const Response = tsoa.Response;
export const BaseHttpController = inversifyExpressUtils.BaseHttpController;
export const Request = tsoa.Request;
export const Tags = tsoa.Tags;
export const Security = tsoa.Security;
