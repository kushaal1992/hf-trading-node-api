import Logger from "../logger";
import { ApplicationLog } from "../types/customerrorresponse";

export const logApi = (logData: ApplicationLog): void => {
  try {
    Logger.log(logData);
  } catch (error) {
    Logger.error(error.message, {
      requestId: logData.requestId,
      reqUrl: logData.reqUrl,
      method: "logApi",
    });
    throw new Error(error.message);
  }
};
