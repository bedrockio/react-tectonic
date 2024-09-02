import React from "react";

import { DayPicker, DateRange } from "react-day-picker";
import { toDate } from "../../utils/date";
import { format } from "date-fns";

function setTime(date, timestring) {
  const [hours, minutes, seconds] = timestring.split(":");
  date.setHours(hours || 0);
  date.setMinutes(minutes || 0);
  date.setSeconds(seconds || 0);
  return date;
}

function mergeRanges(range, time) {
  return {
    from: setTime(new Date(range.from.valueOf()), time.from),
    to: setTime(new Date(range.to.valueOf()), time.to),
  };
}

function convertTimeRange(timeRange) {
  return {
    from: toDate(timeRange.from),
    to: toDate(timeRange.to),
  };
}

export const Calendar = ({
  numberOfMonths = 2,
  onChange,
  minDate,
  maxDate,
  timeRange,
}) => {
  const convertedTimeRange = convertTimeRange(timeRange);
  const [range, setRange] = React.useState<DateRange | undefined>(
    convertedTimeRange
  );

  const [time, setTime] = React.useState({
    from: format(convertedTimeRange.from, "HH:mm:ss"),
    to: format(convertedTimeRange.to, "HH:mm:ss"),
  });

  React.useEffect(() => {
    if (
      range?.from &&
      range.to &&
      range.from.valueOf() === range.to.valueOf()
    ) {
      setTime({
        from: "00:00:00",
        to: "23:59:59",
      });
    }
  }, [range]);

  React.useEffect(() => {
    if (range?.to && range.from) {
      onChange(mergeRanges(range, time));
    } else {
      onChange(undefined);
    }
  }, [range, time]);

  return (
    <div>
      <div className="tnic-rdp" style={{ height: "270px" }}>
        <DayPicker
          mode="range"
          numberOfMonths={numberOfMonths}
          selected={range}
          onSelect={setRange}
          defaultMonth={range?.from}
          disabled={{
            after: maxDate,
            before: minDate,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          borderTop: "1px solid #ccc",
          paddingTop: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          From:
          <input
            value={time.from}
            style={{ paddingLeft: "0.5em" }}
            className="tnic-input"
            type="time"
            onChange={(e) => {
              setTime({ ...time, from: e.target.value });
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          To:
          <input
            value={time.to}
            style={{ paddingLeft: "0.5em" }}
            className="tnic-input"
            type="time"
            onChange={(e) => {
              setTime({ ...time, to: e.target.value });
            }}
          />
        </div>
        {/*
          <div
            style={{
              flex: 1,
              display: "flex",
              alignContent: "center",
              justifyContent: "flex-end",
              alignItems: "stretch",
            }}
            title="Uncheck if you want to use UTC/GMT"
          >
         
            <label>
              Use local timezone
              <input
                checked={isLocalTzChecked}
                onChange={() => setIsLocalTzChecked(!isLocalTzChecked)}
                type="checkbox"
              />
            </label>
          </div>
           */}
      </div>
    </div>
  );
};
