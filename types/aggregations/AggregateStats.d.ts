import { ReactNode } from "react";
import PropTypes from "prop-types";
import { ITimeRange, IAggregateFilterType } from "../types";
interface AggregateStateProps {
    timeRange?: ITimeRange;
    baseUrl?: string;
    token?: string;
    cardinality?: boolean;
    children: ReactNode;
    collection?: string;
    fields: string[];
    filter?: IAggregateFilterType;
}
export declare const AggregateStats: {
    ({ baseUrl, token, timeRange, cardinality, children, ...params }: AggregateStateProps): any;
    propTypes: {
        token: PropTypes.Requireable<string>;
        baseUrl: PropTypes.Requireable<string>;
        cardinality: PropTypes.Requireable<boolean>;
        collection: PropTypes.Requireable<string>;
        fields: PropTypes.Requireable<(string | null | undefined)[]>;
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
