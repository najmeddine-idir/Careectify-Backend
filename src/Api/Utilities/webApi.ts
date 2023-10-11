import * as inversifyExpressUtils from "inversify-express-utils";
import * as tsoa from "tsoa";

export function Route(path: string): (target: unknown) => void {
  const controllerFuntion = inversifyExpressUtils.controller(path);
  const routeFuntion = tsoa.Route(path);

  return (target: unknown) => {
    controllerFuntion(target);
    routeFuntion(target);
  };
}

export function Get(
  path: string
): (target: unknown, key: string, value: unknown) => void {
  const httpGetFuntion = inversifyExpressUtils.httpGet(path);
  const getFuntion = tsoa.Get(path);

  return (target: unknown, key: string, value: unknown) => {
    httpGetFuntion(target, key, value);
    getFuntion(target, key, value);
  };
}

export const Response = tsoa.Response;
export const BaseHttpController = inversifyExpressUtils.BaseHttpController;
export const fromRoute = inversifyExpressUtils.requestParam;
