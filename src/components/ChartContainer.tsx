import React, { ReactNode, FunctionComponent } from "react";
import { IOption } from "../types";
import { Dropdown } from "../components/Dropdown";
import { IconMore } from "../components/Icons";

import { IntervalType } from "../utils/intervals";

export type TitleAlignType = "center" | "left";

type ChartContainerProps = {
  children: ReactNode;
  height: Number;
  title?: ReactNode;
  chartTypes?: IOption[];
  actions?: IOption[];
  intervals?: IOption[];
  activeChartType?: string;
  activeInterval?: IntervalType;
  onChartTypeChange?: (chartType: string) => void;
  onIntervalChange?: (interval: IntervalType) => void;
  onActionChange?: (action: string) => void;
  classNames?: string[];
  enabledControls?: string[];
  titleAlign?: TitleAlignType;
};

export const ChartContainer: FunctionComponent<ChartContainerProps> = ({
  children,
  height,
  title,
  chartTypes = [],
  actions = [],
  intervals = [],
  activeChartType,
  activeInterval,
  onChartTypeChange = () => {},
  onIntervalChange = () => {},
  onActionChange = () => {},
  titleAlign = "left",
  classNames = [],
  enabledControls = [] as string[],
}): JSX.Element => {
  const classes = [
    "tnic-chartContainer",
    !title && "tnic-chartContainer__no-title",
    classNames,
  ].filter(Boolean);

  const hasActions = enabledControls.includes("actions") && actions.length > 0;

  return (
    <div style={{ height: `${height}px` }} className={classes.join(" ")}>
      <div className="tnic-chartContainer--container">
        <div
          style={{ textAlign: titleAlign }}
          className="tnic-chartContainer--title tnic-title"
        >
          {title}
        </div>
        <div className="tnic-chartContainer--actions">
          {enabledControls.includes("chartTypes") && chartTypes.length > 0 && (
            <Dropdown
              value={activeChartType}
              title="Chart"
              options={chartTypes}
              onChange={(option) => onChartTypeChange(option.value)}
            />
          )}
          {enabledControls.includes("intervals") && intervals.length > 0 && (
            <Dropdown
              value={activeInterval}
              title="Interval"
              alignMenu={!hasActions ? "right" : undefined}
              options={intervals}
              onChange={(option) =>
                onIntervalChange(option.value as IntervalType)
              }
            />
          )}
          {hasActions && (
            <Dropdown
              icon={IconMore}
              alignMenu="right"
              options={actions}
              onChange={(option) => onActionChange(option.value)}
            />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
