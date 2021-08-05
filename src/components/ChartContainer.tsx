import React from "react";
import PropTypes from "prop-types";
import { OptionType } from "../utils/propTypes";
import { Dropdown } from "../components/Dropdown";
import { IconMore } from "../components/Icons";

export const ChartContainer = ({
  children,
  height,
  title,
  chartTypes,
  actions,
  intervals,
  activeChartType,
  activeInterval,
  onChartTypeChange,
  onIntervalChange,
  onActionChange,
  classNames,
  enabledControls,
}): JSX.Element => {
  const classes = [
    "tnic-chartContainer",
    !title?.length && "tnic-chartContainer__no-title",
    classNames,
  ].filter(Boolean);

  const hasActions = enabledControls.includes("actions") && actions.length > 0;

  return (
    <div style={{ height: `${height}px` }} className={classes.join(" ")}>
      <div className="tnic-chartContainer--container">
        <div className="tnic-chartContainer--title tnic-title">{title}</div>
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
              onChange={(option) => onIntervalChange(option.value)}
            />
          )}
          {hasActions && (
            <Dropdown
              icon={IconMore}
              alignMenu="right"
              options={actions}
              onChange={onActionChange}
            />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

ChartContainer.propTypes = {
  activeChartType: PropTypes.string,
  activeInterval: PropTypes.string,
  actions: PropTypes.arrayOf(OptionType),
  chartTypes: PropTypes.arrayOf(OptionType),
  intervals: PropTypes.arrayOf(OptionType),
  title: PropTypes.node,
  onIntervalChange: PropTypes.func,
  onChartTypeChange: PropTypes.func,
  onActionChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  height: PropTypes.number,
  classNames: PropTypes.arrayOf(PropTypes.string),
  enabledControls: PropTypes.arrayOf(
    PropTypes.oneOf(["intervals", "chartTypes", "actions"])
  ),
};

ChartContainer.defaultProps = {
  chartTypes: [],
  actions: [],
  intervals: [],
  onIntervalChange: () => {},
  onChartTypeChange: () => {},
  onActionChange: () => {},
  enabledControls: [],
};
