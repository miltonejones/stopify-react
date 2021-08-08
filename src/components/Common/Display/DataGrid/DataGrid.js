import React, { useCallback, useEffect, useState } from "react";
import { navigationComplete } from "../../../../app/State";
import Observer from "../../../../services/Observables";
import { query } from "../../../../services/RemoteData";
import { sortBy, ThumbViewSorters } from "../../../../util/Sorters";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import ThumbGrid from "../ThumbGrid/ThumbGrid";
import "./DataGrid.css";

const forceUpdateHack = new Observer("forceUpdateHack");

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
  const init = useCallback(() => {
    query(dataType).then((d) => {
      const s = ThumbViewSorters[dataType];
      setItems(sortBy(s, d.data));
      setType(dataType);
      setSorter(s);
      navigationComplete.next({ route });
      forceUpdateHack.next();
    });
  }, [dataType, route]);

  const refresh = () => {
    setItems([]);
    setTimeout(() => {
      init();
    }, 299);
  };
  useEffect(() => {
    !!dataType && (!items?.length || type !== dataType) && init();
  }, [type, dataType, items, init]);
  const choose = (s) => {
    const updated = sorter?.map((m) => {
      m.isActive = s.Field === m.Field;
      m.isActive && (m.isASC = -m.isASC);
      return m;
    });
    setSorter(updated);
    setItems(sortBy(updated, items));
    forceUpdateHack.next();
  };
  if (!sorter?.length) {
    return <LoadingAnimation />;
  }

  if (!dataType) {
    return <em>Please provide a data type</em>;
  }

  const ThumbGridArgs = {
    route,
    open,
    sorter,
    choose,
    items,
    refresh,
    screenState,
    clicked: direct,
    small: !screenIsBiggerThanSmSize,
    dataType: dataType,
    event: forceUpdateHack,
  };

  return (
    <div className="DataGrid">
      <ThumbGrid {...ThumbGridArgs} />
    </div>
  );
};

DataGrid.defaultProps = {};
export default DataGrid;
