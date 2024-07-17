/* eslint-disable @typescript-eslint/no-explicit-any */
interface ILogger {
  debug(message: any): void;

  error(message: any): void;

  information(message: any): void;

  warning(message: any): void;
}

export default ILogger;
