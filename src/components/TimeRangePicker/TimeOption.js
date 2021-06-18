import React from "react";

export const TimeOption = ({ style = {}, onSelect, ...props }) => {
  const [value, setValue] = React.useState(props.default);
  const { type, label, unit } = props;

  return (
    <div
      className="tnic-timeOption"
      style={style}
      onClick={() => {
        onSelect(value);
      }}
    >
      {type === "custom" && (
        <>
          <span>
            Last
            <input
              type="text"
              value={value}
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
