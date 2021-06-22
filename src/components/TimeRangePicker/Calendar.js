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

export const Calendar = ({
  numberOfMonths,
  onChange,
  minDate,
  maxDate,
  timeRange,
}) => {
  const [range, setRange] = React.useState({
    from: timeRange.from,
    to: timeRange.to,
  });

  const [time, setTime] = React.useState({
    from: "00:00:00",
    to: "23:59:59",
  });

  const [isLocalTzChecked, setIsLocalTzChecked] = React.useState(true);

  React.useEffect(() => {
    if (range.to && range.from) {
      onChange(mergeRanges(range, time));
    } else {
      onChange(undefined);
    }
  }, [range, time]);

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
        initialMonth={timeRange.from}
        disabledDays={{
          after: maxDate,
          before: minDate,
        }}
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
              value={time.from}
              style={{ paddingLeft: "0.5em" }}
              className="tnic-input"
              type="time"
              onChange={(e) => {
                setTime({ ...time, from: e.target.value });
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
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
        </div>
      </div>
    </div>
  );
};

Calendar.defaultProps = {
  numberOfMonths: 2,
};
