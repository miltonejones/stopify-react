import React, { useEffect, useState } from "react";
import { Analyser } from "../../../services/AudioAnalyzer";
import { rxcs } from "../../../util/Functions";
import { drawerOpen } from "../ResponsivePlayerDrawer/ResponsivePlayerDrawer";
import "./EqLabel.css";

const EqLabel = ({ width, color = "#EBEBEB", flat }) => {
  const [data, setData] = useState([]);
  const [size, setSize] = useState(0);
  useEffect(() => {
    const sub = Analyser.eqOutput.subscribe((data) => {
      !!data?.length && setData(data);
    });
    size !== width &&
      (function () {
        Analyser.eqResize.next(width);
      })();
    Analyser.start();
    console.log("SUBSCRIBED", Analyser.running);
    setSize(width);
    return () => sub.unsubscribe();
  }, [size, width]);
  const className = rxcs({
    EqLabel: true,
    flat,
  });
  return (
    <div
      className={className}
      style={{ width }}
      onClick={() => drawerOpen.next({ open: true })}
    > 
      <div
        style={{
          backgroundImage: fullGrid(flat ? "white" : color, width),
          backgroundSize: `${width}px 40px`,
          backgroundRepeat: "no-repeat",
          width:600,
        }}
        className="grid-mask"
      ></div>
      {data?.map((d, i) => (
        <EqLine key={i} {...d} />
      ))}
    </div>
  );
};

EqLabel.defaultProps = {};
export default EqLabel;

const EqLine = (coord) => (
  <div
    style={{
      height: coord.actualHeight + "px",
      width: coord.barWidth + "px",
      minWidth: coord.barWidth + "px",
      marginTop: "auto",
      backgroundColor: coord.fillStyle,
    }}
  ></div>
);

export const fullGrid = (color = "#ffffff", width = 400) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = 40;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (let y = 1; y < canvas.height; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.font = "9px Roboto";
    ctx.fillStyle = "#b0b0b0";
    ctx.fillText("Stopify!", canvas.width - 48, canvas.height - 4);
  }
  return `url(${canvas.toDataURL()})`;
};
