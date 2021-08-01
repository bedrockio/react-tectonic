/// <reference types="react" />
import PropTypes from "prop-types";
export declare const TimeRangePicker: {
    ({ renderButton, classNames, timeOptions, ...props }: {
        [x: string]: any;
        renderButton: any;
        classNames?: never[] | undefined;
        timeOptions?: never[] | undefined;
    }): JSX.Element;
    propTypes: {
        timeRange: PropTypes.Requireable<PropTypes.InferProps<{
            from: PropTypes.Validator<string | number | Date>;
            to: PropTypes.Validator<string | number | Date>;
            timeZone: PropTypes.Requireable<string>;
        }>>;
        renderButton: PropTypes.Requireable<(...args: any[]) => any>;
        classNames: PropTypes.Requireable<(string | null | undefined)[]>;
        timeOptions: PropTypes.Requireable<any[]>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        onChange: () => void;
        renderButton: () => void;
        timeOptions: ({
            type: string;
            label: string;
            to: string;
            from: string;
            unit?: undefined;
            default?: undefined;
        } | {
            type: string;
            unit: string;
            default: number;
            label?: undefined;
            to?: undefined;
            from?: undefined;
        })[];
    };
};
