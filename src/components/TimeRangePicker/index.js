import React from "react";

import { Overlay } from "./Overlay";

import { useTectonicContext } from "../TectonicProvider";

export const TimeRangePicker = ({
  renderButton,
  onChange,
  classNames = [],
  timeOptions = [],
}) => {
  const { setTimeRange, timeRange } = useTectonicContext();
  const classes = ["tnic-timeRP", ...classNames].filter(Boolean);
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.join(" ")}>
      {renderButton(timeRange?.label || "Select Time Range", () =>
        setOpen(!open)
      )}
      {open && (
        <Overlay
          timeOptions={timeOptions}
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
      from: "now-1d/d",
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
