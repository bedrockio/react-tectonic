import React from "react";

import { Overlay } from "./Overlay";

export const TimeRangePicker = ({ onChange, className }) => {
  const classes = ["techonic", "dateRangePicker", className].filter(Boolean);
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.join(" ")}>
      <button
        className="tectonic-button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Last Hour
      </button>
      {open && <Overlay />}
    </div>
  );
};

TimeRangePicker.propTypes = {};

TimeRangePicker.defaultProps = {
  onChange: () => {},
};
