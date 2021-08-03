import {
  FilterCenterFocus,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";
import React from "react";
import ToolTipButton from "../ToolTipButton/ToolTipButton";
import "./PaginationBar.css";

function PaginationBar({ startPage, pageSize, collection, selection, click }) {
  const descText = `${startPage + 1} to ${Math.min(
    startPage + pageSize,
    collection.length
  )} of  ${collection.length}`;
  const last = startPage + pageSize >= collection.length;
  const ids = collection?.map((f) => f.ID);
  const target = !selection?.length ? -1 : ids?.indexOf(selection[0]);
  const diff = Math.floor((target - startPage) / pageSize);

  if (collection.length <= pageSize) return "";
  return (
    <div className="PaginationBar flex-centered right">
      {descText}
      <ToolTipButton
        icon={<NavigateBefore />}
        title="Previous"
        disabled={startPage < 1}
        click={() => click(-1)}
      />
      <ToolTipButton
        icon={<NavigateNext />}
        title="Next"
        disabled={last}
        click={() => click(1)}
      />
      <ToolTipButton
        icon={<FilterCenterFocus />}
        title="center"
        disabled={diff === 0 || !selection}
        click={() => click(diff)}
      />
    </div>
  );
}

PaginationBar.defaultProps = {};

export default PaginationBar;
