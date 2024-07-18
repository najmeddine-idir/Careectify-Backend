import ILogger from "./Abstractions/ILogger.js";
import { createLogger, format, transports, Logger } from "winston";
import WinstonCloudWatch from "winston-cloudwatch";
import AWSCloudWatchConfiguration from "../../../../Configurations/AWSCloudWatchConfiguration.js";
import { injectable } from "inversify";

const { combine, timestamp, prettyPrint, errors } = format;

@injectable()
class WinstonLogger implements ILogger {
  private _logger: Logger;

  constructor(awsCloudWatchConfiguration: AWSCloudWatchConfiguration) {
    this._logger = createLogger({
      format: combine(
        errors({ stack: true }),
        timestamp({ format: "DD-MM-YYYYThh:mm:ss.sssZ" }),
        prettyPrint()
      ),
      transports: [new transports.Console()],
    });

    if (process.env.NODE_ENV !== "dev") {
      const cloudwatchConfig: WinstonCloudWatch.CloudwatchTransportOptions = {
        logGroupName: awsCloudWatchConfiguration.getGroupName(),
        logStreamName: `${awsCloudWatchConfiguration.getGroupName()}-${
          process.env.NODE_ENV
        }`,
        messageFormatter: (data) => {
          const { level, message, timestamp, ...meta } = data;
          const metatdata = `:\n${JSON.stringify(meta, null, 2)}`;
          return `${timestamp} [${level}] ${message}${metatdata}`;
        },
      };

      this._logger.add(new WinstonCloudWatch(cloudwatchConfig));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(message: any): void {
    this._logger.debug(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: any): void {
    this._logger.error(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  information(message: any): void {
    this._logger.info(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warning(message: any): void {
    this._logger.debug(message);
  }
}

export default WinstonLogger;
