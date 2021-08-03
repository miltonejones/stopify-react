import { Grid, Chip, Menu, MenuItem, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import PaginationBar from "../../Control/PaginationBar/PaginationBar";
import CrumbList from "../CrumbList/CrumbList";
import Thumbnail from "../Thumbnail/Thumbnail";
import "./ThumbGrid.css";
import { ArrowDownward, ArrowUpward, MoreVert } from "@material-ui/icons";
import { rxcs } from "../../../../util/Functions";
import { SCREEN_STATE } from "../../../Layout/AppLayout/AppLayout";
const PAGE_SIZE = 96;
const ThumbGrid = ({
  items,
  clicked,
  open,
  route,
  small,
  sorter,
  screenState,
  choose,
}) => {
  const [page, setPage] = useState(0);
  const first = items?.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const args = {
    startPage: page * PAGE_SIZE,
    pageSize: PAGE_SIZE,
    collection: items,
    click: (d) => setPage((x) => x + d),
  };
  // const choose = (s) => {
  //   const current = sorter?.filter((m) => m.isActive)[0];
  //   const updated = sorter?.map((m) => {
  //     m.isActive = s.Field === m.Field;
  //     current?.Field === m.Field && m.isActive && (m.isASC = -m.isASC);
  //     return m;
  //   });
  // };
  const landscape = screenState === SCREEN_STATE.TABLET;
  const crumbClass = rxcs({ crumb: 1, landscape });
  return (
    <div className="ThumbGrid">
      {/* {JSON.stringify(sorter)}
      <br />
      --------------------------
      {JSON.stringify(sorter)}
      <br />
      --------------------------
      {(sorter === sorter).toString()} */}
      <div className="flexed">
        <PaginationBar {...args} />
        <div className={crumbClass}>
          {!!route && <CrumbList dark route={route} />}
        </div>
        <div className="sorter">
          <SortMenu small={small} choose={choose} sorter={sorter} />
        </div>
      </div>
      <Grid container spacing={2}>
        {first?.map((item, i) => (
          <Grid key={i} item xs={6} sm={3} md={3} xl={2} lg={2}>
            <Thumbnail
              small={small}
              cubed
              open={open}
              clicked={clicked}
              track={item}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

ThumbGrid.defaultProps = {};
export default ThumbGrid;

function SortMenu({ sorter, small, choose }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuId = "primary-search-account-menu";
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (small) {
    return (
      <>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {sorter?.map((s) => (
            <MenuItem
              dense
              onClick={() => {
                choose(s);
                handleMenuClose();
              }}
            >
              {s.isActive && <SortIcon sorter={s} />}
              {s.Label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  return (
    <>
      {sorter?.map((s) => (
        <Chip
          icon={s.isActive ? <SortIcon sorter={s} /> : ""}
          color="primary"
          size="small"
          onClick={() => choose && choose(s)}
          variant={s.isActive ? "default" : "outlined"}
          classes={{ root: "chip" }}
          label={s.Label}
        />
      ))}
    </>
  );
}

function SortIcon({ sorter }) {
  return sorter.isASC > 0 ? <ArrowDownward /> : <ArrowUpward />;
}
