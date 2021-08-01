import React from "react";
import PropTypes from "prop-types";
import { IStatus } from "types";
declare const defaultProps: {
    exportFilename: string;
    status: {
        success: boolean;
    };
    data: never[];
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
    valueFieldName: string;
    labelFieldName: string;
    labelField: string;
    valueField: string;
    labelFormatter: (label: any) => string;
    valueFormatter: (value: any) => any;
    enabledControls: string[];
};
declare type TableProps = {
    status?: IStatus;
    title?: JSX.Element;
    labelFormatter?: (label: string) => string;
    valueFormatter?: (value: number) => string;
    valueField?: string;
    labelField?: string;
    valueFieldName?: string;
    labelFieldName?: string;
    data: any[];
    chartContainer?: React.ElementType;
    enabledControls?: ["actions"];
    exportFilename?: string;
};
export declare const Table: {
    ({ status, title, labelField, valueField, valueFieldName, labelFieldName, data, labelFormatter, valueFormatter, chartContainer: ChartContainer, enabledControls, exportFilename, }: TableProps & typeof defaultProps): JSX.Element;
    propTypes: {
        status: PropTypes.Requireable<object>;
        data: PropTypes.Requireable<any[]>;
        chartContainer: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        labelFormatter: PropTypes.Requireable<(...args: any[]) => any>;
        valueFormatter: PropTypes.Requireable<(...args: any[]) => any>;
        valueField: PropTypes.Requireable<string>;
        labelField: PropTypes.Requireable<string>;
        valueFieldName: PropTypes.Requireable<string>;
        labelFieldName: PropTypes.Requireable<string>;
        enabledControls: PropTypes.Requireable<(string | null | undefined)[]>;
        exportFilename: PropTypes.Requireable<string>;
    };
    defaultProps: {
        exportFilename: string;
        status: {
            success: boolean;
        };
        data: never[];
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
        valueFieldName: string;
        labelFieldName: string;
        labelField: string;
        valueField: string;
        labelFormatter: (label: any) => string;
        valueFormatter: (value: any) => any;
        enabledControls: string[];
    };
};
export {};
