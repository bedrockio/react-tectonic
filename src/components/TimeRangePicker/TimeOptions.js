import React from "react";
import { IconCalendar, IconChevronRight } from "../Icons";
import { TimeOption } from "./TimeOption";

export const TimeOptions = ({ active, timeOptions, onSelect }) => {
  const activeStyle = {
    background: "rgba(255, 165, 0, 0.73)",
  };

  return (
    <div style={{ flex: 1 }}>
      {timeOptions.map((timeOption, index) => (
        <TimeOption
          style={timeOption === active ? activeStyle : {}}
          key={index}
          onSelect={(value) => onSelect(timeOption, value)}
          {...timeOption}
        />
      ))}

      <div
        style={active === "custom" ? activeStyle : {}}
        className={["tnic-timeOption"].filter(Boolean)}
        onClick={() => onSelect("custom")}
      >
        <span>
          <span style={{ marginRight: "1em" }}>
            <IconCalendar />
          </span>
          Enter Custom Range
        </span>
        <IconChevronRight />
      </div>
    </div>
  );
};
