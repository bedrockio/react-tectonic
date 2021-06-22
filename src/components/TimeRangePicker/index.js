import React from "react";

import { Overlay } from "./Overlay";

import { useTectonicContext } from "../TectonicProvider";

function getTimeRangeForLabel(timeRange = {}, timeOptions = []) {
  if (timeRange?.label) {
    return timeRange.label;
  }

  const found = timeOptions.find(
    (timeOption) =>
      timeOption.from === timeRange.from && timeOption.to === timeRange.to
  );

  if (found?.label) {
    return found.label;
  }

  if (timeRange.from && timeRange.to) {
    return `${timeRange.to.toLocaleDateString()}-${timeRange.from.toLocaleDateString()}`;
  }

  return "Select Time Range";
}

export const TimeRangePicker = ({
  renderButton,
  onChange,
  classNames = [],
  timeOptions = [],
}) => {
  const { stats, timeRange, setTimeRange } = useTectonicContext();
  const classes = ["tnic-timeRP", ...classNames].filter(Boolean);
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.join(" ")}>
      {renderButton(getTimeRangeForLabel(timeRange, timeOptions), () =>
        setOpen(!open)
      )}
      {open && (
        <Overlay
          stats={stats}
          timeOptions={timeOptions}
          timeRange={timeRange}
          onClose={() => setOpen(false)}
          onChange={(timeRange) => {
            setTimeRange(timeRange);
            onChange(timeRange);
          }}
        />
      )}
    </div>
  );
};

TimeRangePicker.propTypes = {};

TimeRangePicker.defaultProps = {
  onChange: () => {},
  timeOptions: [
    {
      type: "fixed",
      label: "Today",
      to: "now",
      from: "now-1h/d",
    },
    {
      type: "fixed",
      label: "Yesterday",
      to: "now-1d/d",
      from: "now-2d/d",
    },
    {
      type: "fixed",
      label: "This Week",
      to: "now",
      from: "now/w",
    },
    {
      type: "input",
      unit: "hours",
      default: 24,
    },
    {
      type: "input",
      unit: "days",
      default: 7,
    },
    {
      type: "input",
      unit: "months",
      default: 3,
    },
  ],
};
