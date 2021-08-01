import React from "react";
import PropTypes from "prop-types";
import { IStatus } from '../types';
declare const defaultProps: {
    exportFilename: string;
    status: {
        success: boolean;
    };
    data: never[];
    colors: string[];
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
    enabledControls: string[];
    labelFormatter: (label: any) => string;
    valueFormatter: (value: any) => any;
    labelField: string;
    valueField: string;
};
declare type DonutChartProps = {
    status?: IStatus;
    title?: JSX.Element;
    limit?: number;
    labelFormatter?: (label: string) => string;
    valueFormatter?: (value: number) => string;
    valueField: string;
    labelField?: string;
    procent?: boolean;
    precision?: number;
    colorFn?: (entry: any, index: number) => string;
    data: any[];
    colors?: string[];
    chartContainer?: React.ElementType;
    enabledControls?: ["actions"];
    exportFilename?: string;
};
export declare const DonutChart: {
    ({ status, data, labelField, labelFormatter: propsLabelFormatter, valueFormatter, valueField, limit, procent, precision, title, enabledControls, chartContainer: ChartContainer, colors, colorFn, exportFilename, }: DonutChartProps & typeof defaultProps): JSX.Element;
    propTypes: {
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        status: PropTypes.Requireable<object>;
        limit: PropTypes.Requireable<number>;
        labelFormatter: PropTypes.Requireable<(...args: any[]) => any>;
        valueFormatter: PropTypes.Requireable<(...args: any[]) => any>;
        valueField: PropTypes.Requireable<string>;
        labelField: PropTypes.Requireable<string>;
        procent: PropTypes.Requireable<boolean>;
        precision: PropTypes.Requireable<number>;
        colorFn: PropTypes.Requireable<(...args: any[]) => any>;
        data: PropTypes.Requireable<any[]>;
        colors: PropTypes.Requireable<(string | null | undefined)[]>;
        chartContainer: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        enabledControls: PropTypes.Requireable<(string | null | undefined)[]>;
        exportFilename: PropTypes.Requireable<string>;
    };
    defaultProps: {
        exportFilename: string;
        status: {
            success: boolean;
        };
        data: never[];
        colors: string[];
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
        enabledControls: string[];
        labelFormatter: (label: any) => string;
        valueFormatter: (value: any) => any;
        labelField: string;
        valueField: string;
    };
};
export {};
