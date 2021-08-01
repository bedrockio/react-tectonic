/// <reference types="react" />
import PropTypes from "prop-types";
export declare const ChartContainer: {
    ({ children, height, title, chartTypes, actions, intervals, activeChartType, activeInterval, onChartTypeChange, onIntervalChange, onActionChange, classNames, enabledControls, }: {
        children: any;
        height: any;
        title: any;
        chartTypes: any;
        actions: any;
        intervals: any;
        activeChartType: any;
        activeInterval: any;
        onChartTypeChange: any;
        onIntervalChange: any;
        onActionChange: any;
        classNames: any;
        enabledControls: any;
    }): JSX.Element;
    propTypes: {
        activeChartType: PropTypes.Requireable<string>;
        activeInterval: PropTypes.Requireable<string>;
        actions: PropTypes.Requireable<(PropTypes.InferProps<{
            label: PropTypes.Validator<string>;
            icon: PropTypes.Requireable<PropTypes.ReactComponentLike>;
            value: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
        chartTypes: PropTypes.Requireable<(PropTypes.InferProps<{
            label: PropTypes.Validator<string>;
            icon: PropTypes.Requireable<PropTypes.ReactComponentLike>;
            value: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
        intervals: PropTypes.Requireable<(PropTypes.InferProps<{
            label: PropTypes.Validator<string>;
            icon: PropTypes.Requireable<PropTypes.ReactComponentLike>;
            value: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        onIntervalChange: PropTypes.Requireable<(...args: any[]) => any>;
        onChartTypeChange: PropTypes.Requireable<(...args: any[]) => any>;
        onActionChange: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        height: PropTypes.Requireable<number>;
        classNames: PropTypes.Requireable<(string | null | undefined)[]>;
        enabledControls: PropTypes.Requireable<(string | null | undefined)[]>;
    };
    defaultProps: {
        chartTypes: never[];
        actions: never[];
        intervals: never[];
        onIntervalChange: () => void;
        onChartTypeChange: () => void;
        onActionChange: () => void;
        enabledControls: never[];
    };
};
