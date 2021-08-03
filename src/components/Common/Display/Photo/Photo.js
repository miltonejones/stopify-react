import { IconButton } from "@material-ui/core";
import { Launch, PlayCircleFilled, Shuffle } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { rxcs } from "../../../../util/Functions";
import "./Photo.css";

const DEFAULT_IMAGE = "http://ullify.com/assets/cdrom-unmount.png";

const PhotoPromise = (src) =>
  new Promise((callback) => {
    const im = new Image();
    im.onload = () => {
      callback(im.src);
    };
    im.onerror = () => {
      callback(DEFAULT_IMAGE);
    };
    im.src = src;
  });

const Photo = ({
  src,
  alt,
  className,
  open,
  onLaunch,
  onPlay,
  cubed,
  rect,
}) => {
  const [turned, setTurned] = useState(false);
  const [source, setSource] = useState(null);
  const [original, setOriginal] = useState(src);
  useEffect(() => {
    (!source || src !== original) &&
      PhotoPromise(src).then((d) => {
        setSource(d);
        setOriginal(src);
      });
  }, [source, src, original]);
  if (!source) {
    return "Loading...";
  }

  const cubeClass = rxcs({ cube: !0, "show-right": turned });
  const componentClass = rxcs({ Photo: !0, open, cubed, rectangle: rect });

  if (!cubed) {
    return (
      <div className="Photo">
        <img src={source} className={className} alt={alt} />
      </div>
    );
  }

  const size = open ? "small" : "large";

  return (
    <div className={componentClass}>
      <div className={cubeClass}>
        <div
          className="cube__face cube__face--front"
          onClick={() => setTurned(!turned)}
        >
          <img src={source} className={className} alt={alt} />
        </div>
        <div className="cube__face cube__face--back">back</div>
        <div
          className="cube__face cube__face--right"
          onClick={() => setTurned(false)}
        >
          <IconButton
            size={size}
            onClick={() => {
              onPlay && onPlay();
              setTurned(false);
            }}
          >
            <PlayCircleFilled />
          </IconButton>
          <IconButton
            size={size}
            onClick={() => {
              onPlay && onPlay();
              setTurned(false);
            }}
          >
            <Shuffle />
          </IconButton>
          <IconButton
            size={size}
            onClick={() => {
              onLaunch && onLaunch();
              setTurned(false);
            }}
          >
            <Launch />
          </IconButton>
        </div>
        <div className="cube__face cube__face--left">left</div>
        <div className="cube__face cube__face--top">top</div>
        <div className="cube__face cube__face--bottom">bottom</div>
      </div>
    </div>
  );
};

Photo.defaultProps = {};
export default Photo;
