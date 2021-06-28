import React from "react";
import PropTypes from "prop-types";
import { validIntervals } from "../utils/intervals";
import { toDate } from "../utils/date";
import { TimeRangeType } from "../utils/propTypes";
import { Dropdown } from "../components/Dropdown";
import { BarChart, LineChart, IconMore } from "../components/Icons";
export const ChartContainer = ({
  children,
  height,
  title,
  interval,
  timeRange,
  onIntervalChange,
  classNames,
}) => {
  const classes = ["tnic-chartContainer", classNames].filter(Boolean);

  const intervals = validIntervals(
    toDate(timeRange?.from),
    toDate(timeRange?.to)
  );

  return (
    <div style={{ height: `${height}px` }} className={classes.join(" ")}>
      <div className="tnic-chartContainer--container">
        <div className="tnic-chartContainer--title tnic-title">{title}</div>
        <div
          className="tnic-chartContainer--actions"
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 0,
          }}
        >
          <Dropdown
            title="Display"
            options={[
              {
                label: "Line",
                icon: LineChart,
              },
              {
                label: "Bar",
                icon: BarChart,
              },
            ]}
          />
          <Dropdown
            title="Interval"
            options={intervals.map((interval) => {
              return {
                label: interval,
              };
            })}
          />
          <Dropdown
            icon={IconMore}
            alignMenu="right"
            options={[
              {
                label: "Export Chart Data",
              },
              {
                label: "Download Image",
              },
            ]}
          />
        </div>
      </div>

      {children}
    </div>
  );
};

ChartContainer.propTypes = {
  controls: PropTypes.bool,
  timeRange: TimeRangeType,
  interval: PropTypes.string,
  onIntervalChange: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ChartContainer.defaultProps = {
  interval: "auto",
  controls: true,
  onIntervalChange: () => {},
};
