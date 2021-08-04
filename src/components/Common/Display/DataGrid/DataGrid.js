import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { navigationComplete } from "../../../../app/State";
import { query } from "../../../../services/RemoteData";
import { sortBy, ThumbViewSorters } from "../../../../util/Sorters";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import ThumbGrid from "../ThumbGrid/ThumbGrid";
import "./DataGrid.css";

const DataGrid = ({
  dataType,
  direct,
  open,
  route,
  screenState,
  screenIsBiggerThanSmSize,
}) => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState(false);
  const [sorter, setSorter] = useState(null);
  useEffect(() => {
    !!dataType &&
      (!items?.length || type !== dataType) &&
      query(dataType).then((d) => {
        const s = ThumbViewSorters[dataType];
        setItems(sortBy(s, d.data));
        setType(dataType);
        setSorter(s);
        navigationComplete.next({ route });
      });
  }, [type, dataType, items, route]);
  const choose = (s) => {
    const updated = sorter?.map((m) => {
      m.isActive = s.Field === m.Field;
      m.isActive && (m.isASC = -m.isASC);
      return m;
    });
    setSorter(updated);
    setItems(sortBy(updated, items));
  };
  if (!sorter?.length) {
    return <LoadingAnimation />;
  }

  if (!dataType) {
    return <em>Please provide a data type</em>;
  }

  return (
    <div className="DataGrid">
      <ThumbGrid
        small={!screenIsBiggerThanSmSize}
        route={route}
        open={open}
        screenState={screenState}
        sorter={sorter}
        choose={choose}
        clicked={direct}
        items={items}
      />
    </div>
  );
};

DataGrid.defaultProps = {};
export default DataGrid;
