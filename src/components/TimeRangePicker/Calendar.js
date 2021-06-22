import React from "react";

import DayPicker, { DateUtils } from "react-day-picker";

function setTime(date, timestring) {
  const [hours, minutes, seconds] = timestring.split(":");
  date.setHours(hours || 0);
  date.setMinutes(minutes || 0);
  date.setSeconds(seconds || 0);
  return date;
}

function mergeRanges(range, timeRange) {
  return {
    from: setTime(new Date(range.from.valueOf()), timeRange.from),
    to: setTime(new Date(range.to.valueOf()), timeRange.to),
  };
}

export const Calendar = ({ numberOfMonths, onChange }) => {
  const [range, setRange] = React.useState({
    from: new Date(Date.now() - 1000000000),
    to: new Date(),
  });

  const [timeRange, setTimeRange] = React.useState({
    from: range.from.toLocaleTimeString(),
    to: range.to.toLocaleTimeString(),
  });

  const [isLocalTzChecked, setIsLocalTzChecked] = React.useState(true);

  React.useEffect(() => {
    if (range.to && range.from) {
      onChange(mergeRanges(range, timeRange));
    } else {
      onChange(undefined);
    }
  }, [range, timeRange]);

  function handleDayClick(day) {
    setRange(DateUtils.addDayToRange(day, range));
  }

  const { from, to } = range;
  const modifiers = { start: from, end: to };

  return (
    <div>
      <DayPicker
        className="tnic-dayPicker"
        numberOfMonths={numberOfMonths}
        selectedDays={[from, { from, to }]}
        modifiers={modifiers}
        onDayClick={handleDayClick}
      />

      <div
        style={{
          padding: "1em",
          borderTop: "1px solid #ccc",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            marginTop: "0.5em",
            alignItems: "baseline",
          }}
        >
          <div style={{ flex: 1 }}>
            From:
            <input
              value={timeRange.from}
              style={{ paddingLeft: "0.5em" }}
              className="tnic-input"
              type="time"
              onChange={(e) => {
                setTimeRange({ ...timeRange, from: e.target.value });
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            To:
            <input
              value={timeRange.to}
              style={{ paddingLeft: "0.5em" }}
              className="tnic-input"
              type="time"
              onChange={(e) => {
                setTimeRange({ ...timeRange, to: e.target.value });
              }}
            />
          </div>
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
                style={{
                  lineHeight: "25px",
                }}
                onChange={() => setIsLocalTzChecked(!isLocalTzChecked)}
                type="checkbox"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

Calendar.defaultProps = {
  numberOfMonths: 2,
};
