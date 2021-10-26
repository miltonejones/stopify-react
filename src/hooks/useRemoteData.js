import React from "react";
import { query } from "../services/RemoteData";
import { sortObjects } from "../util/Functions";

export default function useRemoteData({ dataType, ID }) {
  const [state, setState] = React.useState({ dataType, ID });
  const [data, setData] = React.useState(false);

  const refreshData = React.useCallback(
    (type, id) => {
      !!type && setState((s) => ({ ...s, dataType: type, ID: id }));
      alert(state.dataType);
      query(type || state.dataType, id || state.ID).then((queryDatum) => {
        setData(flattenRows(queryDatum));
      });
    },
    [state]
  );

  const getData = (type, id) => {
    refreshData(type, id);
  };

  React.useEffect(() => {
    !!dataType && refreshData();
  }, [refreshData, dataType]);

  return { data, getData };
}

const fixRows = (rows, type) => {
  rows?.map && rows?.map((row) => (row.id = row.id || row.ID || Math.random()));
  return (!rows?.map ? [] : sortObjects(rows, type)).filter(
    (row) => !row.duplicate
  );
};

const flattenRows = (queryDatum, dataType, ID) => {
  const data = fixRows(
    queryDatum.data?.related ||
      queryDatum.data?.data ||
      queryDatum.data ||
      queryDatum,
    dataType
  );
  const title =
    queryDatum.data?.Name ||
    queryDatum?.data?.Title ||
    (ID ? `${dataType}: ${ID}` : "Library");
  const caption = `${data.length} tracks from your library`;
  return { data, title, caption };
};
