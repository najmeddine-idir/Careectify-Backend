declare module "express-serve-static-core" {
  interface Request {
    abortController: AbortController;
  }
}
