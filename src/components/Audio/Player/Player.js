import React, { useEffect, useRef, useState } from "react";
import { Analyser } from "../../../services/AudioAnalyzer";
import { exists } from "../../../services/Blob";
import Observer from "../../../services/Observables";
import { playerURL } from "../../../util/Functions";
import { androidConnect } from "../../../util/PlayerConnect";
import "./Player.css";

const Player = ({ width }) => {
  const [source, setSource] = useState(false);
  const myAudio = useRef();
  const attached = useRef(false);
  const stop = () => {
    myAudio.current && myAudio.current.pause();
    setSource(false);
  };

  const play = (src) => {
    Analyser.enable();
    setSource(src);
  };

  const response = (event) => {
    !!event.progress &&
      (myAudio.current.currentTime = myAudio.current.duration * event.progress);
    !!event.pause && myAudio.current.pause();
  };

  useEffect(() => {
    const sub = [
      PlayerAction.subscribe((s) => {
        if (!s) return stop();
        exists(s.FileKey).then((rows) => {
          const url = rows.length ? rows[0].Blob : playerURL(s.FileKey);
          play(url);
          androidConnect(s);
        });
      }),
      Analyser.audioEvent.subscribe(response),
    ];

    myAudio.current &&
      source &&
      (function () {
        console.log("ATTACHING!!");
        attached.current = true;
        Analyser.attach(myAudio.current, width || 600);
      })();
    return () => sub.map((s) => s.unsubscribe());
  }, [source, width, attached]);

  return (
    <div className="Player">
      {!!source && (
        <audio ref={myAudio} autoPlay src={source} crossOrigin="anonymous">
          <source type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

Player.defaultProps = {};
export default Player;

export const PlayerAction = new Observer("PlayerAction");
