import React from "react";

export const TimeOption = ({ active, onSelect, ...props }) => {
  const [value, setValue] = React.useState(props.default);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { type, label, unit } = props;
  const isMonth = unit?.includes("month");

  React.useEffect(() => {
    if (props.default !== value) {
      onSelect(value);
    }
  }, [value]);

  return (
    <div
      className={["tnic-timeOption", active && "tnic-timeOption--active"]
        .filter(Boolean)
        .join(" ")}
      onClick={() => {
        inputRef.current?.focus();
        onSelect(value);
      }}
    >
      {type === "input" && (
        <>
          <span>
            Last
            <input
              className="tnic-input"
              ref={inputRef}
              type="text"
              value={value}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setValue(e.target.value)}
            />
            {unit}
          </span>
          <span className="tnic-hovertext">Click to select or edit</span>
        </>
      )}
      {type === "fixed" && (
        <>
          <span>{label}</span>
          <span className="tnic-hovertext">Click to select</span>
        </>
      )}
      {type === "select" && (
        <>
          <span>
            {label}:
            <input
              className="tnic-input tnic-input-large"
              ref={inputRef}
              type="number"
              value={value}
              max={isMonth ? 12 : undefined}
              min="1"
              onFocus={(e) => e.target.select()}
              onChange={(e) => setValue(e.target.value)}
            />
            {isMonth && (
              <>
                {new Date(0, value, 0).toLocaleString("default", {
                  month: "short",
                })}
              </>
            )}
          </span>

          <span className="tnic-hovertext">Click to select</span>
        </>
      )}
    </div>
  );
};
