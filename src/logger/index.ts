import ecsFormat from "@elastic/ecs-winston-format";
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import * as path from "path";

const { NODE_ENV, SERVICE_NAME, SERVICE_VERSION, CORE_VERSION, APP_NAME } =
  process.env;

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "gray",
  debug: "white",
});

const transport: DailyRotateFile = new DailyRotateFile({
  filename: path.join("log", `${APP_NAME}-%DATE%.log`),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

transport.on("error", (error) => {
  Logger.error(error.message);
  throw error;
});

const Logger = winston.createLogger({
  level: "debug",
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  format: ecsFormat(),
  transports: [transport, new winston.transports.Console()],
  defaultMeta: {
    application: "HF TRADING NODE API",
    environment: NODE_ENV,
    microservice: SERVICE_NAME,
    microservice_version: SERVICE_VERSION,
    core_version: CORE_VERSION,
    component: "APPLICATION",
  },
});

export default Logger;
