import React from "react";
import PropTypes from "prop-types";
import { IntervalType } from "../utils/intervals";
import { IStatus, ITimeRange } from "../types";
declare const defaultProps: {
    exportFilename: string;
    data: never[];
    status: {
        success: boolean;
    };
    colors: string[];
    chartType: string;
    chartContainer: {
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
    valueField: string;
    valueFormatter: (value: any) => any;
    labelFormatter: (unixTime: any) => string;
    enabledControls: string[];
    stacked: boolean;
    labels: never[];
};
declare type MultiSeriesChartProps = {
    onIntervalChange?: (interval: IntervalType) => void;
    labels?: string[];
    status?: IStatus;
    title?: JSX.Element;
    legend?: boolean;
    stacked?: boolean;
    timeRange?: ITimeRange;
    data?: any[];
    chartType?: "line" | "bar" | "area";
    colors?: string[];
    chartContainer?: React.ElementType;
    valueField?: string;
    labelFormatter?: (label: string) => string;
    valueFormatter?: (value: number) => string;
    disableDot?: boolean;
    enabledControls?: ["intervals" | "chartTypes" | "actions"];
    exportFilename?: string;
    interval?: IntervalType;
};
export declare const MultiSeriesChart: {
    ({ data, timeRange, chartType: propsChartType, onIntervalChange, valueField, labelFormatter, valueFormatter, legend, stacked, colors, disableDot, enabledControls, status, title, chartContainer: ChartContainer, labels, exportFilename, interval, }: MultiSeriesChartProps & typeof defaultProps): JSX.Element;
    propTypes: {
        onIntervalChange: PropTypes.Requireable<(...args: any[]) => any>;
        labels: PropTypes.Requireable<(string | null | undefined)[]>;
        status: PropTypes.Requireable<object>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        legend: PropTypes.Requireable<boolean>;
        stacked: PropTypes.Requireable<boolean>;
        timeRange: PropTypes.Requireable<PropTypes.InferProps<{
            from: PropTypes.Validator<string | number | Date>;
            to: PropTypes.Validator<string | number | Date>;
            timeZone: PropTypes.Requireable<string>;
        }>>;
        data: PropTypes.Requireable<(any[] | null | undefined)[]>;
        chartType: PropTypes.Requireable<string>;
        colors: PropTypes.Requireable<(string | null | undefined)[]>;
        chartContainer: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        valueField: PropTypes.Requireable<string>;
        valueFormatter: PropTypes.Requireable<(...args: any[]) => any>;
        labelFormatter: PropTypes.Requireable<(...args: any[]) => any>;
        disableDot: PropTypes.Requireable<boolean>;
        enabledControls: PropTypes.Requireable<(string | null | undefined)[]>;
        exportFilename: PropTypes.Requireable<string>;
    };
    defaultProps: {
        exportFilename: string;
        data: never[];
        status: {
            success: boolean;
        };
        colors: string[];
        chartType: string;
        chartContainer: {
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
        valueField: string;
        valueFormatter: (value: any) => any;
        labelFormatter: (unixTime: any) => string;
        enabledControls: string[];
        stacked: boolean;
        labels: never[];
    };
};
export {};
