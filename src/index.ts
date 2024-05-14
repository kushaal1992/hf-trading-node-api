import "dotenv/config";

import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import connectionTimeout from "connect-timeout";
import cors from "cors";
import Logger from "./logger";

const { NODE_ENV, PORT } = process.env;
// const PORT = process.env.PORT || 8000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("HF Trading NODE API is Running!");
});

app.use(connectionTimeout("1800s"));
app.use(helmet.hidePoweredBy());
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));

// app.use(MIDDLEWARES.notFoundHandler);
// app.use(MIDDLEWARES.errorHandler);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("HF TRADING NODE API is Running!");
  next();
});

app.listen(PORT, () => {
  Logger.info(
    `STARTING SERVER ON PORT - ${PORT || 8001} ENVIRONMENT - ${NODE_ENV}`,
    {
      component: "EXPRESS",
    }
  );
});

process.on("unhandledRejection", (error) => {
  Logger.error(`UNHANDLED REJECTION`, { component: "EXPRESS", error });
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  Logger.error(`UNCAUGHT EXCEPTION`, { component: "EXPRESS", error });
  process.exit(1);
});
