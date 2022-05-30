import React from "react";

import { Calendar } from "./Calendar";
import { IconClose } from "../Icons";
import { Button } from "../Button";
import { TimeOptions } from "./TimeOptions";
import { labelsToUnit } from "../../utils/date";

export const Overlay = ({
  onChange,
  onClose,
  align,
  stats,
  timeRange,
  allowedTimeRange,
  ...props
}) => {
  const [optionValue, setOptionValue] = React.useState();
  const [option, setOption] = React.useState<any>(undefined);
  const [refreshKey, setRefreshKey] = React.useState<number>();

  const [validTimeOptions, setValidTimeOptions] = React.useState(
    props.timeOptions
  );

  const handleReset = () => {
    setOption(undefined);
    setValidTimeOptions([...props.timeOptions]);
    setRefreshKey(Date.now());
  };

  const handleOnApply = () => {
    onClose();
    if (option.type === "fixed") {
      onChange({ ...option });
    } else if (option.type === "input") {
      onChange({
        label: `Last ${optionValue} ${option.unit}`,
        to: "now",
        from: `now-${optionValue}${labelsToUnit[option.unit]}`,
      });
    } else if (option.type === "absoluteInput") {
      onChange({
        label: `${option.label}: ${optionValue}`,
        to: (optionValue || new Date().getFullYear()).toString(),
        from: ((optionValue || new Date().getFullYear()) - 1).toString(),
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
          <Button compact basic onClick={handleReset}>
            Reset
          </Button>
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
              key={refreshKey}
              align={align}
              timeOptions={validTimeOptions}
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
