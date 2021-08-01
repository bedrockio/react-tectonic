import React from "react";
import PropTypes from "prop-types";
import { IntervalType } from "../utils/intervals";
import { IStatus, ITimeRange } from "../types";
declare const defaultProps: {
    exportFilename: string;
    valueField: string;
    valueFieldLabel: string;
    height: number;
    data: never[];
    status: {
        success: boolean;
    };
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
    labelFormatter: (unixTime: any) => string;
    valueFormatter: (value: any) => any;
    enabledControls: string[];
    axisColor: string;
};
declare type SeriesChartProps = {
    height?: number;
    interval?: IntervalType;
    title?: JSX.Element;
    labelFormatter?: (label: string) => string;
    valueFormatter?: (value: number) => string;
    valueField?: string;
    labelField?: string;
    valueFieldLabel?: string;
    chartType?: "line" | "bar" | "area";
    status: IStatus;
    onIntervalChange?: (interval: IntervalType) => void;
    timeRange?: ITimeRange;
    enabledControls?: ["intervals" | "chartTypes" | "actions"];
    data?: any[];
    axisColor?: string;
    color?: string;
    legend?: boolean;
    disableDot?: boolean;
    chartContainer?: React.ElementType;
    exportFilename?: string;
};
export declare const SeriesChart: {
    ({ status, data, valueField, valueFieldLabel, valueFormatter, labelFormatter, chartContainer: ChartContainer, title, chartType: propsChartType, disableDot, onIntervalChange, interval, timeRange, color, enabledControls, exportFilename, axisColor, height, }: SeriesChartProps & typeof defaultProps): JSX.Element;
    propTypes: {
        height: PropTypes.Requireable<number>;
        interval: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        valueFormatter: PropTypes.Requireable<(...args: any[]) => any>;
        labelFormatter: PropTypes.Requireable<(...args: any[]) => any>;
        valueField: PropTypes.Requireable<string>;
        valueFieldLabel: PropTypes.Requireable<string>;
        chartType: PropTypes.Requireable<string>;
        status: PropTypes.Requireable<object>;
        onIntervalChange: PropTypes.Requireable<(...args: any[]) => any>;
        timeRange: PropTypes.Requireable<PropTypes.InferProps<{
            from: PropTypes.Validator<string | number | Date>;
            to: PropTypes.Validator<string | number | Date>;
            timeZone: PropTypes.Requireable<string>;
        }>>;
        enabledControls: PropTypes.Requireable<(string | null | undefined)[]>;
        data: PropTypes.Requireable<any[]>;
        color: PropTypes.Requireable<string>;
        axisColor: PropTypes.Requireable<string>;
        legend: PropTypes.Requireable<boolean>;
        disableDot: PropTypes.Requireable<boolean>;
        chartContainer: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        exportFilename: PropTypes.Requireable<string>;
    };
    defaultProps: {
        exportFilename: string;
        valueField: string;
        valueFieldLabel: string;
        height: number;
        data: never[];
        status: {
            success: boolean;
        };
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
        labelFormatter: (unixTime: any) => string;
        valueFormatter: (value: any) => any;
        enabledControls: string[];
        axisColor: string;
    };
};
export {};
