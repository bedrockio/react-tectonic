import React from "react";

import { Calendar } from "./Calendar";
import { IconClose } from "../Icons";
import { Button } from "../Button";
import { TimeOptions } from "./TimeOptions";
import { labelsToUnit } from "../../utils/date";
import { startOfDay, endOfDay } from "date-fns";

export const Overlay = ({
  onChange,
  onClose,
  align,
  stats,
  timeRange,
  defaultTimeRange,
  allowedTimeRange,
  timeOptions,
  ...props
}) => {
  const [optionValue, setOptionValue] = React.useState();
  const [option, setOption] = React.useState<any>(undefined);

  const handleReset = () => {
    onChange(defaultTimeRange);
    onClose();
  };

  const handleOnApply = () => {
    onClose();
    if (option.type === "fixed") {
      onChange({ ...option });
    } else if (option.type === "input") {
      const unit = labelsToUnit[option.unit];
      onChange({
        label: `Last ${optionValue} ${option.unit}`,
        to: `now/${labelsToUnit[option.unit]}`,
        from: `now-${optionValue}${unit}/${unit}`,
      });
    } else if (option.type === "select") {
      const isYear = option.unit.includes("year");
      const currentYear = new Date().getFullYear();
      const currentValue = isYear ? currentYear : new Date().getMonth() + 1;
      const newValue = optionValue || currentValue;
      onChange({
        label: `${option.label}: ${
          isYear
            ? newValue
            : new Date(0, newValue, 0).toLocaleString("default", {
                month: "short",
              })
        }`,
        to: endOfDay(
          isYear
            ? new Date(newValue, 11, 31)
            : new Date(currentYear, newValue, 0)
        ),
        from: startOfDay(
          isYear
            ? new Date(newValue, 0, 1)
            : new Date(currentYear, newValue - 1, 0)
        ),
      });
    } else if (stats.isHistorical || option.type === "absolute") {
      const fromStr = option.from.toLocaleDateString();
      const toStr = option.to.toLocaleDateString();

      onChange({
        ...option,
        label: toStr === fromStr ? toStr : `${fromStr} - ${toStr}`,
      });
    }
  };

  return (
    <div className="tnic-overlay" style={align ? { [align]: 0 } : {}}>
      <div className="tnic-header">
        <div className="tnic-title">Select time range</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {defaultTimeRange && (
            <Button compact basic onClick={handleReset}>
              Reset
            </Button>
          )}
          <Button compact basic icon onClick={() => onClose()}>
            <IconClose />
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: align === "right" ? "row-reverse" : "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {!stats.isHistorical && (
          <div className="tnic-overlay--container">
            <TimeOptions
              align={align}
              timeOptions={timeOptions}
              onSelect={(option, value) => {
                setOptionValue(value);
                setOption(option);
              }}
              active={option}
            />
          </div>
        )}
        {(stats.isHistorical || option?.type === "absolute") && (
          <div
            style={{
              float: "right",
              flex: 1,
              width: "550px",
              height: "336px",
              ...(align === "right"
                ? {
                    borderRight: "1px solid #ccc",
                  }
                : {
                    borderLeft: "1px solid #ccc",
                  }),
            }}
          >
            <Calendar
              timeRange={timeRange}
              minDate={allowedTimeRange?.from || stats.from}
              maxDate={allowedTimeRange?.to || stats.to}
              numberOfMonths={2}
              onChange={(range) => {
                setOption({
                  ...option,
                  ...range,
                });
              }}
            />
          </div>
        )}
      </div>
      <div className="tnic-footer">
        <span>
          <Button compact basic onClick={onClose}>
            Cancel
          </Button>
          <Button compact onClick={handleOnApply} disabled={!option}>
            Apply
          </Button>
        </span>
      </div>
    </div>
  );
};
