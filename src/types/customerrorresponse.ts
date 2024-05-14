export type CustomErrorResponseType =
  | "TOASTER"
  | "FIELD"
  | "MODAL"
  | "ACTION_REQUIRED";

export type CustomErrorResponseData = {
  detail: string;
  type: CustomErrorResponseType;
  reason?: any;
  stack?: string;
};

export type CustomErrorResponse = {
  requestId: string;
  success: boolean;
  requestEpoch: number;
  responseEpoch: number;
  data: CustomErrorResponseData;
  UTCOffset: string;
};

export type ApplicationLog = {
  requestId: string;
  level: string;
  reqUrl: string;
  thirdPartyUrl: string;
  message: string;
  statusCode: number;
  requestEpoch: number;
  responseEpoch: number;
  encRequest?: string;
  request?: any;
  encResponse?: string;
  response?: any;
};
