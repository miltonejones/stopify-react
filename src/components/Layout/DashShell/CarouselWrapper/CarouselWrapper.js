import React, { useEffect, useState } from "react";
import Coverflow from "react-coverflow";
import { PlayerAction } from "../../../Audio/Player/Player";
import "./CarouselWrapper.css";

// const fn = function () {
//   /* do you want */
// };

const CarouselWrapper = ({ tracks, choose }) => {
  const [index, setIndex] = useState({ open: false });
  useEffect(() => {
    const sub = [
      PlayerAction.subscribe((t) => {
        t?.hasOwnProperty("FileKey") && setIndex(tracks?.indexOf(t));
      }),
    ];
    return () => sub.map((s) => s.unsubscribe());
  }, [tracks]);

  return (
    <>
      {" "}
      <Coverflow
        width={"100vw"}
        height={240}
        displayQuantityOfSide={2}
        navigation={false}
        infiniteScroll
        enableHeading
        active={index}
      >
        {/* <div
          onClick={() => fn()}
          onKeyDown={() => fn()}
          role="menuitem"
          tabIndex="0"
        >
          title goes here
        </div> */}
        {tracks.map((r) => (
          <img
            onClick={() => choose && choose(r)}
            key={r.ID}
            src={r.albumImage}
            alt={r.Title}
          />
        ))}
      </Coverflow>
    </>
  );
};

CarouselWrapper.defaultProps = {};
export default CarouselWrapper;
