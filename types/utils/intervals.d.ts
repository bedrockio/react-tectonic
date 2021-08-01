import { ITimeRange } from '../types';
export declare type IntervalType = "1s" | "10s" | "1m" | "5m" | "10m" | "15m" | "30m" | "1h" | "1d" | "1w" | "1M" | "1y";
export declare function validIntervals(from: any, to: any): IntervalType[];
export declare function intervalToLabel(interval: IntervalType): string;
export declare function determineInterval(timeRange: ITimeRange): IntervalType;
