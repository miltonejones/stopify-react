import React, { useEffect, useState } from "react";
import { navigationComplete } from "../../../../app/State";
import { query } from "../../../../services/RemoteData";
import ThumbGrid from "../ThumbGrid/ThumbGrid";
import "./DataGrid.css";

const DataGrid = ({ dataType, direct, open, route }) => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState(false);
  useEffect(() => {
    !!dataType &&
      (!items?.length || type !== dataType) &&
      query(dataType).then((d) => {
        setItems(d.data);
        setType(dataType);
        navigationComplete.next({ route });
      });
  }, [type, dataType, items, route]);

  if (!dataType) {
    return <em>Please provide a data type</em>;
  }

  return (
    <div className="DataGrid">
      <ThumbGrid route={route} open={open} clicked={direct} items={items} />
    </div>
  );
};

DataGrid.defaultProps = {};
export default DataGrid;
