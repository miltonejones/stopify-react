import { Link } from "@material-ui/core";
import React from "react";
import appRoutes from "../../../../app/Routes";
import "./LinkList.css";

const LinkList = ({ direct }) => {
  const nodes = appRoutes.filter((f) => f.data?.home);

  // .map((route) => {
  //   return {
  //     path: route.data?.prefix + route.path,
  //     icon: route.data?.icon,
  //     label: route.data?.label,
  //     type: route.type,
  //   };
  // });
  return (
    <div className="LinkList">
      <div className="home-link-list">
        {nodes.map((node) => (
          <div
            key={node.path}
            onClick={() => direct && direct(node)}
            className="home-link-list-item"
          >
            <span className="material-icons">{node.data?.icon}</span>
            <MenuLink to={node} className="standard-link">
              {node.data?.label}
            </MenuLink>
          </div>
        ))}
      </div>
    </div>
  );
};

LinkList.defaultProps = {};
export default LinkList;

function MenuLink(props) {
  const d = props.to;
  const address = d?.data?.address || `/${d?.type}`;
  return <Link href={address}>{props.children}</Link>;
}
