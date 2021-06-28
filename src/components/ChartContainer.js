import React from "react";
import PropTypes from "prop-types";
import { validIntervals } from "../utils/intervals";
import { toDate } from "../utils/date";
import { TimeRangeType } from "../utils/propTypes";
import { Button } from "../components/Button";
import { BarChart, LineChart } from "../components/Icons";

export const ChartContainer = ({
  children,
  height,
  interval,
  timeRange,
  onIntervalChange,
  classNames,
}) => {
  const classes = ["tnic-chart", classNames].filter(Boolean);

  const intervals = validIntervals(
    toDate(timeRange?.from),
    toDate(timeRange?.to)
  );

  return (
    <div style={{ height: `${height}px` }} className={classes.join(" ")}>
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          top: "1.4em",
          right: "1em",
          width: "100%",
        }}
      >
        <div>
          Display:
          <Button compact basic icon>
            <BarChart />
          </Button>
          <Button compact basic icon>
            <LineChart />
          </Button>
        </div>
        <div>
          intervals:
          {intervals.map((interval) => (
            <Button basic compact key={interval}>
              {interval}
            </Button>
          ))}
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
