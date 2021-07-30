import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { Button, Collapse, Tooltip } from "@material-ui/core";
import "./ObjectReader.css";

const ObjectReader = (object) => (
  <TemporaryDrawer title={object.captionText} anchor="bottom">
    <ObjectContent {...object} />
  </TemporaryDrawer>
);

const ObjectContent = (object) => {
  const [open, setOpen] = useState(false);
  const keyList = Object.keys(object).filter((f) => f !== "captionText");
  const first = keyList.slice(0, 5);
  const more = keyList.slice(5);
  return (
    <div className="ObjectReader">
      <ul>
        {first.map((key) => (
          <ObjectNode object={object} name={key} key={key} />
        ))}
        {!!more.length && (
          <li className="list ">
            <Button onClick={() => setOpen(!open)}>
              Show {more.length} {open ? "fewer" : "more"} properties
            </Button>
          </li>
        )}

        <Collapse in={open}>
          {more?.map((key) => (
            <ObjectNode object={object} name={key} key={key} />
          ))}
        </Collapse>
      </ul>
    </div>
  );
};

const ObjectNode = ({ object, name }) => (
  <li>
    <ObjectType value={object[name]} />
    <label>{name}</label>
    <div className="value">
      <ObjectValue value={object[name]} />
    </div>
  </li>
);

const ObjectType = ({ value }) => {
  const type = typeof value;
  const array = value instanceof Array;
  if (array) return <span className="em">Array</span>;
  return <span className="em">{type}</span>;
};

const ObjectValue = ({ value }) => {
  const [open, setOpen] = useState(false);
  const type = typeof value;
  const array = value instanceof Array;
  if (array) {
    return (
      <>
        <Button onClick={() => setOpen(!open)}>{open ? "hide" : "show"}</Button>
        <Collapse in={open}>
          <ul>
            {value.map((item, i) => (
              <li className="list" key={i}>
                {item}
              </li>
            ))}
          </ul>
        </Collapse>
      </>
    );
  }
  if (type === "function") {
    return (
      <>
        <xmp>{value?.toString()} </xmp>
      </>
    );
  }
  var imageReg = /[.](gif|jpg|jpeg|tiff|png)$/i;
  const isPhoto = imageReg.exec(value);
  if (isPhoto) {
    return <TooltipImage src={value} />;
  }
  return <>{value?.toString()}</>;
};

function TooltipImage({ src }) {
  return (
    <Tooltip
      title={
        <>
          <img src={src} alt={src} />
        </>
      }
    >
      <i>{src}</i>
    </Tooltip>
  );
}

function TemporaryDrawer(props) {
  const { anchor, title } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer}>{title}</Button>
      <Drawer anchor={anchor} open={open} onClose={toggleDrawer}>
        {props.children}
      </Drawer>
    </div>
  );
}

ObjectReader.defaultProps = {};
export default ObjectReader;
