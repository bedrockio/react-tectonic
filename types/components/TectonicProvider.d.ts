import React from "react";
import PropTypes from "prop-types";
import { ITimeRange } from "../types";
declare const defaultProps: {
    primaryColor: string;
    dateField: string;
    timeZone: string;
    getTimeRangeFromCollectionStats: (stats: any) => {
        to: string;
        from: any;
    } | {
        to: any;
        from: Date;
    };
};
interface IContextProps {
    primaryColor: string;
    token?: string;
    setToken: (token: string) => void;
    setBaseUrl: (url: string) => void;
    isReady: boolean;
    timeRange?: ITimeRange;
    setTimeRange: (timeRange: ITimeRange) => void;
    stats: any;
    baseUrl?: string;
    dateField: string;
}
interface ITectonicProviderProps {
    disableInitialization?: boolean;
    getTimeRangeFromCollectionStats?: (stats: any) => ITimeRange;
    children: React.ReactNode;
    token?: string;
    baseUrl?: string;
    timeZone?: string;
    timeRange?: ITimeRange;
    dateField?: string;
    collection?: string;
    primaryColor?: string;
}
declare const TectonicProvider: {
    ({ disableInitialization, getTimeRangeFromCollectionStats, children, ...props }: ITectonicProviderProps & typeof defaultProps): JSX.Element;
    propTypes: {
        primaryColor: PropTypes.Requireable<string>;
        token: PropTypes.Requireable<string>;
        collection: PropTypes.Requireable<string>;
        dateField: PropTypes.Requireable<string>;
        baseUrl: PropTypes.Requireable<string>;
        defaultTimeRange: PropTypes.Requireable<(...args: any[]) => any>;
        timeRange: PropTypes.Requireable<PropTypes.InferProps<{
            from: PropTypes.Validator<string | number | Date>;
            to: PropTypes.Validator<string | number | Date>;
            timeZone: PropTypes.Requireable<string>;
        }>>;
        getTimeRangeFromCollectionStats: PropTypes.Requireable<(...args: any[]) => any>;
        disableInitialization: PropTypes.Requireable<boolean>;
        timeZone: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    defaultProps: {
        primaryColor: string;
        dateField: string;
        timeZone: string;
        getTimeRangeFromCollectionStats: (stats: any) => {
            to: string;
            from: any;
        } | {
            to: any;
            from: Date;
        };
    };
};
declare const useTectonicContext: () => IContextProps;
export { TectonicProvider, useTectonicContext };
