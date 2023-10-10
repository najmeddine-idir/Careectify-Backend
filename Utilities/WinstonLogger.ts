import ILogger from "./Abstractions/ILogger";
import { createLogger, format, transports, Logger } from "winston";
import WinstonCloudWatch from "winston-cloudwatch";
import AWSCloudWatchConfiguration from "../Configurations/AWSCloudWatchConfiguration";
import { injectable } from "inversify";
import "reflect-metadata";

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

    console.log(process.env.NODE_ENV);

    // if (process.env.NODE_ENV === "production") {
    const cloudwatchConfig: WinstonCloudWatch.CloudwatchTransportOptions = {
      logGroupName: awsCloudWatchConfiguration.groupName,
      logStreamName: `${awsCloudWatchConfiguration.groupName}-${process.env.NODE_ENV}`,
      messageFormatter: (data) => {
        const { level, message, timestamp, ...meta } = data;
        const metatdata = `:\n${JSON.stringify(meta, null, 2)}`;
        return `${timestamp} [${level}] ${message}${metatdata}`;
      },
    };

    this._logger.add(new WinstonCloudWatch(cloudwatchConfig));
    // }
  }

  Debug(message: unknown): void {
    this._logger.debug(message);
  }

  Error(message: unknown): void {
    this._logger.error(message);
  }

  Information(message: unknown): void {
    this._logger.info(message);
  }

  Warning(message: unknown): void {
    this._logger.debug(message);
  }
}

export default WinstonLogger;
