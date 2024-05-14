import * as crypto from "crypto";

const { BREEZE_CONNECT_SECRET } = process.env;

export const createChecksum = (reqBody: any): string => {
  try {
    console.log("BREEZE_CONNECT_SECRET", BREEZE_CONNECT_SECRET);
    var secret = "BREEZE_CONNECT_SECRET";
    var time_stamp = new Date().getTime().toString();
    var data = JSON.stringify(reqBody); // 'reqBody' is the body of the current request
    var rawChecksum = time_stamp + "\r\n" + data;
    var checksum = crypto.createHmac("sha256", secret).update(rawChecksum);
    // to base64
    return checksum.digest("base64");
  } catch (error) {
    throw new Error(error.message);
  }
};
