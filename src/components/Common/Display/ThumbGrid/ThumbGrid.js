import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import PaginationBar from "../../Control/PaginationBar/PaginationBar";
import CrumbList from "../CrumbList/CrumbList";
import Thumbnail from "../Thumbnail/Thumbnail";
import "./ThumbGrid.css";
const PAGE_SIZE = 96;

const ThumbGrid = ({ items, clicked, open, route }) => {
  const [page, setPage] = useState(0);
  const first = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const args = {
    startPage: page * PAGE_SIZE,
    pageSize: PAGE_SIZE,
    collection: items,
    click: (d) => setPage((x) => x + d),
  };
  return (
    <div className="ThumbGrid">
      <div className="flexed">
        <PaginationBar {...args} />
        <div className="crumb">{!!route && <CrumbList route={route} />}</div>
      </div>
      <Grid container spacing={2}>
        {first.map((item, i) => (
          <Grid key={i} item xs={6} sm={3} md={3} xl={2} lg={2}>
            <Thumbnail open={open} clicked={clicked} track={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

ThumbGrid.defaultProps = {};
export default ThumbGrid;
