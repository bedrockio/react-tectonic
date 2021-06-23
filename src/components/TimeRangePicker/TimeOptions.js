import React from "react";
import { IconCalendar, IconChevronRight } from "../Icons";
import { TimeOption } from "./TimeOption";

export const TimeOptions = ({ active, timeOptions, onSelect }) => {
  return (
    <div style={{ flex: 1 }}>
      {timeOptions.map((timeOption, index) => (
        <TimeOption
          active={timeOption === active}
          key={index}
          onSelect={(value) => onSelect(timeOption, value)}
          {...timeOption}
        />
      ))}

      <div
        className={[
          "tnic-timeOption",
          active?.type === "absolute" && "tnic-timeOption--active",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() =>
          onSelect({
            type: "absolute",
          })
        }
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
