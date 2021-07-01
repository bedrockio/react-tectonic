import React from "react";
import PropTypes from "prop-types";
import { TimeRangeType } from "../../utils/propTypes";
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
  classNames = [],
  timeOptions = [],
  ...props
}) => {
  const ctx = useTectonicContext();

  const classes = ["tnic-timeRP", ...classNames].filter(Boolean);
  const [open, setOpen] = React.useState(false);

  const timeRange = props.timeRange ||
    ctx.timeRange || { to: new Date(), from: new Date() };

  return (
    <div className={classes.join(" ")}>
      {renderButton(getTimeRangeForLabel(timeRange, timeOptions), () =>
        setOpen(!open)
      )}
      {open && (
        <Overlay
          stats={ctx.stats || {}}
          timeOptions={timeOptions}
          timeRange={timeRange}
          onClose={() => setOpen(false)}
          onChange={(newTimeRange) => {
            if (ctx.setTimeRange) ctx.setTimeRange(newTimeRange);
            props.onChange(newTimeRange);
          }}
        />
      )}
    </div>
  );
};

TimeRangePicker.propTypes = {
  timeRange: TimeRangeType,
  renderButton: PropTypes.func,
  classNames: PropTypes.arrayOf(PropTypes.string),
  timeOptions: PropTypes.array,
  onChange: PropTypes.func,
};

TimeRangePicker.defaultProps = {
  onChange: () => {},
  renderButton: () => {},
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
      to: "now-1h/d",
      from: "now-1d/d",
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
