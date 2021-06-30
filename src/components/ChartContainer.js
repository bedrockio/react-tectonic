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
  onChartTypeChange,
  onIntervalChange,
  onActionChange,
  classNames,
}) => {
  const classes = [
    "tnic-chartContainer",
    !title?.length && "tnic-chartContainer__no-title",
    classNames,
  ].filter(Boolean);

  return (
    <div style={{ height: `${height}px` }} className={classes.join(" ")}>
      <div className="tnic-chartContainer--container">
        <div className="tnic-chartContainer--title tnic-title">{title}</div>
        <div className="tnic-chartContainer--actions">
          {chartTypes.length > 0 && (
            <Dropdown
              title="Chart type"
              options={chartTypes}
              onChange={onChartTypeChange}
            />
          )}
          {intervals.length > 0 && (
            <Dropdown
              title="Interval"
              options={intervals}
              onChange={onIntervalChange}
            />
          )}
          <Dropdown
            icon={IconMore}
            alignMenu="right"
            options={actions}
            onChange={onActionChange}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

ChartContainer.propTypes = {
  actions: PropTypes.arrayOf(OptionType),
  chartTypes: PropTypes.arrayOf(OptionType),
  intervals: PropTypes.arrayOf(OptionType),
  title: PropTypes.string,
  onIntervalChange: PropTypes.func,
  onChartTypeChange: PropTypes.func,
  onActionChange: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ChartContainer.defaultProps = {
  chartTypes: [],
  actions: [],
  intervals: [],
  onIntervalChange: () => {},
  onChartTypeChange: () => {},
  onActionChange: () => {},
};
