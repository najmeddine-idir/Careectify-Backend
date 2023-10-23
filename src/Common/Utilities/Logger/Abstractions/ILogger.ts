interface ILogger {
  debug(message: object | string | number): void;

  error(message: object | string | number): void;

  information(message: object | string | number): void;

  warning(message: object | string | number): void;
}

export default ILogger;
