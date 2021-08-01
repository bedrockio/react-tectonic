import { ReactNode } from "react";
import PropTypes from "prop-types";
import { IntervalType } from "../utils/intervals";
import { ITimeRange, IAggregateFilterType } from "../types";
declare const defaultProps: {
    onIntervalChange: () => void;
};
interface AggregateTimeSeriesProps {
    baseUrl?: string;
    token?: string;
    timeRange?: ITimeRange;
    children?: ReactNode;
    interval?: IntervalType;
    onIntervalChange?: (interval: IntervalType) => void;
    dateField?: string;
    collection?: string;
    operation: string;
    filter?: IAggregateFilterType;
}
export declare const AggregateTimeSeries: {
    ({ baseUrl, token, timeRange, children, interval: propsInterval, onIntervalChange, ...params }: AggregateTimeSeriesProps & typeof defaultProps): any;
    defaultProps: {
        onIntervalChange: () => void;
    };
    propTypes: {
        token: PropTypes.Requireable<string>;
        baseUrl: PropTypes.Requireable<string>;
        collection: PropTypes.Requireable<string>;
        operation: PropTypes.Validator<string>;
        field: PropTypes.Requireable<string>;
        interval: PropTypes.Requireable<string>;
        onIntervalChange: PropTypes.Requireable<(...args: any[]) => any>;
        dateField: PropTypes.Requireable<string>;
        filter: PropTypes.Requireable<PropTypes.InferProps<{
            from: PropTypes.Requireable<number>;
            size: PropTypes.Requireable<number>;
            terms: PropTypes.Requireable<(object | null | undefined)[]>;
            range: PropTypes.Requireable<object>;
            notExists: PropTypes.Requireable<string>;
            exists: PropTypes.Requireable<string>;
            minTimestamp: PropTypes.Requireable<number>;
            q: PropTypes.Requireable<string>;
        }>>;
        timeRange: PropTypes.Requireable<PropTypes.InferProps<{
            from: PropTypes.Validator<string | number | Date>;
            to: PropTypes.Validator<string | number | Date>;
            timeZone: PropTypes.Requireable<string>;
        }>>;
    };
};
export {};
