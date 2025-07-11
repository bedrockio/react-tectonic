import React from "react";
import PropTypes from "prop-types";
import { toDate } from "../../utils/date";
import { TimeRangeType } from "../../utils/propTypes";
import { Overlay } from "./Overlay";
import { ITimeRange } from "../../types";

import { useTectonicContext } from "../TectonicProvider";

const defaultTimeOptions: TimeOption[] = [
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
  /*
  {
    type: "fixed",
    label: "This Week",
    to: "now",
    from: "now/w",
  },
  */
  {
    type: "fixed",
    label: "This Month",
    to: "now",
    from: "now/M",
  },
  /*
  {
    type: "fixed",
    label: "This Year",
    to: "now",
    from: "now/y",
  },
  */

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
  /*
  {
    type: "input",
    unit: "months",
    default: 3,
  },

  {
    type: "select",
    unit: "years",
    label: "Year",
    default: new Date().getFullYear() - 1,
  },
    */
  {
    type: "select",
    unit: "months",
    label: "Month",
    default: new Date().getMonth(),
  },
];

type SelectTimeOption = {
  type: "select";
  unit: "years" | "months";
  label: string;
  default: number;
};

type InputTimeOption = {
  type: "input";
  unit: "minutes" | "hours" | "days" | "weeks" | "months" | "years";
  default: number;
};
type FixedTimeOption = {
  type: "fixed";
  label: string;
  to: string | Date;
  from: string | Date;
};

type TimeOption = InputTimeOption | FixedTimeOption | SelectTimeOption;

interface TimeRangePickerProps {
  renderButton: (label: string, onClick: () => void) => JSX.Element;
  classNames: string[];
  timeOptions: TimeOption[];
  align?: "left" | "right";
  timeRange?: ITimeRange;
  allowedTimeRange?: ITimeRange;
  defautTimeRange?: ITimeRange;
  onChange?: (timeRange: ITimeRange) => void;
}

function formatDate(date) {
  if (date === "now") return "Now";
  return toDate(date).toLocaleString();
}

function getTimeRangeForLabel(
  timeRange: ITimeRange,
  timeOptions: TimeOption[]
) {
  if (timeRange?.label) {
    return timeRange.label;
  }

  const found: any = timeOptions.find(
    (timeOption: any) =>
      timeOption.from === timeRange.from && timeOption.to === timeRange.to
  );

  if (found?.label) {
    return found.label;
  }

  if (timeRange.from && timeRange.to) {
    return `${formatDate(timeRange.from)} - ${formatDate(timeRange.to)}`;
  }

  return "Select Time Range";
}

export const TimeRangePicker = ({
  renderButton,
  classNames = [],
  timeOptions = defaultTimeOptions,
  align,
  onChange = () => {},
  ...props
}: TimeRangePickerProps) => {
  const ctx = useTectonicContext();

  const classes = ["tnic-timeRP", ...classNames].filter(Boolean);
  const [open, setOpen] = React.useState(false);

  const timeRange = props.timeRange || ctx.timeRange;

  const defaultTimeRange = props.defautTimeRange || ctx.defaultTimeRange;

  if (!timeRange || !timeRange.to) {
    return null;
  }

  return (
    <div className={classes.join(" ")}>
      {renderButton(
        getTimeRangeForLabel(timeRange as ITimeRange, timeOptions),
        () => setOpen(!open)
      )}
      {open && (
        <Overlay
          align={align}
          stats={ctx.stats || {}}
          timeOptions={timeOptions}
          timeRange={timeRange}
          defaultTimeRange={defaultTimeRange}
          allowedTimeRange={props.allowedTimeRange}
          onClose={() => setOpen(false)}
          onChange={(newTimeRange) => {
            if (onChange) {
              onChange(newTimeRange);
            } else {
              ctx.setTimeRange(newTimeRange);
            }
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
