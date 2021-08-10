import {
  Grid,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import PaginationBar from "../../Control/PaginationBar/PaginationBar";
import CrumbList from "../CrumbList/CrumbList";
import Thumbnail from "../Thumbnail/Thumbnail";
import "./ThumbGrid.css";
import {
  ArrowDownward,
  ArrowUpward,
  CheckCircle,
  CheckCircleOutline,
  LinkOutlined,
  MoreVert,
} from "@material-ui/icons";
import { rxcs } from "../../../../util/Functions";
import { SCREEN_STATE } from "../../../../app/Constants";
import DesktopOnly from "../../../Layout/DashShell/DesktopOnly/DesktopOnly";
import { group } from "../../../../services/RemoteData";
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
  refresh,
  dataType,
  event,
}) => {
  const [page, setPage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [cache, setCache] = useState(items);
  const first = cache?.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const [collection, setCollection] = useState(first);

  const commitPage = useCallback(
    (nu, list) => {
      const all = list || cache;
      setPage(nu);
      const pages = all?.slice(nu * PAGE_SIZE, nu * PAGE_SIZE + PAGE_SIZE);
      console.log({ all, pages });
      !!list && setCache(list);
      setCollection(pages);
    },
    [cache]
  );

  useEffect(() => {
    const sub = event?.subscribe(() => commitPage(0, items));
    return () => sub.unsubscribe();
  }, [cache, items, commitPage, event]);

  const updatePage = (p) => {
    const nu = page + p;
    commitPage(nu);
  };

  const args = {
    startPage: page * PAGE_SIZE,
    pageSize: PAGE_SIZE,
    collection: cache,
    pagesOnly: true,
    click: (d) => updatePage(d),
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
  const crumbClass = rxcs({ crumb: 1 });
  const edit = (t) => {
    const nu = collection.map((x) => {
      x.ID === t.ID && (x.selected = !x.selected);
      return x;
    });
    setCollection(nu);
  };
  const editGroup = collection.filter((f) => f.selected);
  const merge = () => {
    const keys = editGroup.map((f) => f.ID);
    group(dataType, keys).then(refresh);
    updateEditMode();
  };
  const updateEditMode = () => {
    if (editMode) {
      const nu = collection.map((x) => {
        x.selected = !1;
        return x;
      });
      setCollection(nu);
    }
    setEditMode(!editMode);
  };
  const ThumbnailArgs = {
    small,
    editMode,
    edit,
    cubed: true,
    landscape,
    open,
    clicked,
  };
  return (
    <div className="ThumbGrid">
      <div className="flexed no-wrap">
        <div className={crumbClass}>
          {!!route && (
            <CrumbList
              small={small}
              icononly={landscape || small}
              dark
              route={route}
            />
          )}
        </div>
        <div className="pages-list">
          <PaginationBar {...args} />
        </div>
        <div className="sorter">
          <SortMenu
            small={small || landscape}
            choose={choose}
            sorter={sorter}
          />
          <DesktopOnly>
            <Badge badgeContent={editGroup.length}>
              <IconButton size="small" onClick={() => updateEditMode()}>
                {editMode ? <CheckCircle /> : <CheckCircleOutline />}
              </IconButton>
            </Badge>
            {!!editGroup.length && (
              <IconButton size="small" onClick={() => merge()}>
                <LinkOutlined />
              </IconButton>
            )}
          </DesktopOnly>
        </div>
      </div>
      <Grid container spacing={2}>
        {collection?.map((item, i) => (
          <Grid key={i} item xs={6} sm={3} md={3} xl={2} lg={2}>
            <Thumbnail track={item} {...ThumbnailArgs} />
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
      Sort by:{" "}
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
