import { ITimeRange } from "../types";
export declare const request: (options: any) => Promise<any>;
export declare function getAnalyticsRequestBody({ params, timeRange, ctx, type, }: {
    params: any;
    type?: string;
    timeRange?: ITimeRange;
    ctx: any;
}): any;
