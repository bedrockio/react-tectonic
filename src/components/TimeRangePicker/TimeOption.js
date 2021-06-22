import React from "react";

export const TimeOption = ({ style = {}, onSelect, ...props }) => {
  const [value, setValue] = React.useState(props.default);
  const inputRef = React.useRef(null);
  const { type, label, unit } = props;

  React.useEffect(() => {
    onSelect(value);
  }, [value]);

  return (
    <div
      className="tnic-timeOption"
      style={style}
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
    </div>
  );
};
