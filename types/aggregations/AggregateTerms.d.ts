import { ReactNode } from "react";
import PropTypes from "prop-types";
import { ITimeRange, IAggregateFilterType } from "../types";
interface AggregateTermsProps {
    baseUrl?: string;
    token?: string;
    children: ReactNode;
    collection?: string;
    filter?: IAggregateFilterType;
    aggField: string;
    aggFieldOrder?: "desc" | "asc";
    field?: string;
    operation?: string;
    includeTopHit?: boolean;
    termsSize?: number;
    timeRange?: ITimeRange;
}
export declare const AggregateTerms: {
    ({ baseUrl, token, timeRange, children, ...params }: AggregateTermsProps): any;
    propTypes: {
        token: PropTypes.Requireable<string>;
        baseUrl: PropTypes.Requireable<string>;
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
        collection: PropTypes.Requireable<string>;
        aggField: PropTypes.Validator<string>;
        aggFieldOrder: PropTypes.Requireable<string>;
        field: PropTypes.Requireable<string>;
        operation: PropTypes.Requireable<string>;
        includeTopHit: PropTypes.Requireable<boolean>;
        referenceFetch: PropTypes.Requireable<object>;
        termsSize: PropTypes.Requireable<number>;
        timeRange: PropTypes.Requireable<PropTypes.InferProps<{
            from: PropTypes.Validator<string | number | Date>;
            to: PropTypes.Validator<string | number | Date>;
            timeZone: PropTypes.Requireable<string>;
        }>>;
    };
};
export {};
