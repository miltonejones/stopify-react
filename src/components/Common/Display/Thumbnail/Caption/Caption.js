import React from "react";
import "./Caption.css";

export function parseLine(words, limit) {
  let count = 0;
  const tmp = [];
  while (count < limit && !!words.length) {
    tmp.push(words.shift());
    count = tmp.join(" ").length;
  }
  return tmp.join(" ");
}
export function parseLines(value) {
  const words = value.split(" ");
  return [parseLine(words, 20), parseLine(words, 20)];
}
const Caption = (props) => {
  const css = {
    Caption: true,
    small: props.small,
  };
  const className = Object.keys(css)
    .filter((key) => !!css[key])
    .join(" ");

  if (props.small) {
    return (
      <div className={className}>
        <div className="caption-title-line">{props.text}</div>
      </div>
    );
  }

  const lines = parseLines(props.text);
  return (
    <div className={className}>
      {" "}
      {lines.map((line, k) => (
        <div key={k} className="caption-title-line">
          {line}
        </div>
      ))}
    </div>
  );
};

Caption.defaultProps = {};
export default Caption;
