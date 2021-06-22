import React from "react";

import { Calendar } from "./Calendar";
import { IconClose } from "../Icons";
import { Button } from "../Button";
import { TimeOptions } from "./TimeOptions";
import { labelsToUnit } from "../../utils/dateMath";

export const Overlay = ({ onChange, onClose, ...props }) => {
  const [optionValue, setOptionValue] = React.useState();
  const [option, setOption] = React.useState();
  const [refreshKey, setRefreshKey] = React.useState();

  const [timeOptions, setTimeOptions] = React.useState(props.timeOptions);

  const handleReset = () => {
    setOption();
    setTimeOptions([...props.timeOptions]);
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
    } else if (option.type === "absolute") {
      onChange({
        ...option,
        label: `${option.from.toLocaleDateString()} - ${option.to.toLocaleDateString()}`,
      });
    }
  };

  return (
    <div className="tnic-overlay">
      <div className="tnic-header">
        <div className="tnic-title">Select time range</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={handleReset}>Reset</Button>
          <Button icon onClick={() => onClose()}>
            <IconClose />
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <div style={{ width: "300px", borderTop: "1px solid #ccc" }}>
          <TimeOptions
            key={refreshKey}
            timeOptions={timeOptions}
            onSelect={(option, value) => {
              setOptionValue(value);
              setOption(option);
            }}
            active={option}
          />
        </div>
        {option?.type === "absolute" && (
          <div
            style={{
              float: "right",
              flex: 1,
              borderLeft: "1px solid #ccc",
            }}
          >
            <Calendar
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
          <Button secondary>Cancel</Button>
          <Button onClick={handleOnApply} disabled={!option}>
            Apply
          </Button>
        </span>
      </div>
    </div>
  );
};
