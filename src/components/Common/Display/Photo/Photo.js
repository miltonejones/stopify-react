import React, { useEffect, useState } from "react";
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

const Photo = ({ src, alt, className }) => {
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

  return (
    <div className="Photo">
      <img src={source} className={className} alt={alt} />
    </div>
  );
};

Photo.defaultProps = {};
export default Photo;
