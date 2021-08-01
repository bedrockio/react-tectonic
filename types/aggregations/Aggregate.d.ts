import { ReactNode } from "react";
import PropTypes from "prop-types";
import { IntervalType } from "../utils/intervals";
import { ITimeRange } from "../types";
declare const defaultProps: {
    interval: string;
    onIntervalChange: () => void;
};
interface AggregatePropType {
    timeRange?: ITimeRange;
    baseUrl?: string;
    token?: string;
    requests: any[];
    type: string;
    children: ReactNode;
    interval?: IntervalType;
    onIntervalChange?: (interval: IntervalType) => void;
}
export declare const Aggregate: {
    ({ timeRange, baseUrl, token, requests, interval: propsInterval, onIntervalChange, type, children, }: AggregatePropType & typeof defaultProps): any;
    propTypes: {
        type: PropTypes.Validator<string>;
        requests: PropTypes.Requireable<(object | null | undefined)[]>;
        token: PropTypes.Requireable<string>;
        baseUrl: PropTypes.Requireable<string>;
        timeRange: PropTypes.Requireable<PropTypes.InferProps<{
            from: PropTypes.Validator<string | number | Date>;
            to: PropTypes.Validator<string | number | Date>;
            timeZone: PropTypes.Requireable<string>;
        }>>;
    };
    defaultProps: {
        interval: string;
        onIntervalChange: () => void;
    };
};
export {};
