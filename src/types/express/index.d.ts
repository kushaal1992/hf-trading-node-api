import { API_URLS } from "../../global/constants";

declare global {
  namespace Express {
    export interface Request {
      requestId: string;
      requestEpoch: number;
      UTCOffset: string;
      accessToken?: string;
      decodedUser?: string;
      team?: string;
      organization?: string;
      is_root_organization?: boolean;
      route_guard_context_filter?: Record<any, any>;
      team_type?: any;
    }

    export interface Response {
      customResponse(
        httpStatusCode: number,
        data: any,
        success: boolean,
        requestId: string,
        requestEpoch: number
      ): Response;
    }
  }
}
