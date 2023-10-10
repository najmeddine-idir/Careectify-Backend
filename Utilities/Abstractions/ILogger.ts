interface ILogger {
  Debug(message: unknown): void;

  Error(message: unknown): void;

  Information(message: unknown): void;

  Warning(message: unknown): void;
}

export default ILogger;
