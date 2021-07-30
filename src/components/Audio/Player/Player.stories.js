import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Player, { PlayerAction } from "./Player";

import tracks from "../../../stories/assets/stories-track-list.json";
import EqLabel from "../EqLabel/EqLabel";
import ObjectReader from "../../Dev/ObjectReader/ObjectReader";
import { RoundedButton } from "../PlayerButton/PlayerButton";
import { Pause, PlayArrow } from "@material-ui/icons";
import { Analyser } from "../../../services/AudioAnalyzer";
import ProgressBar from "../ProgressBar/ProgressBar";

export default {
  title: "Audio/Player",
  component: Player,
};
const track = tracks[44];

const Template = (args) => {
  const [progress, setProgress] = useState(false);
  const [on, setOn] = useState(false);
  const { width } = args;
  useEffect(() => {
    PlayerAction.subscribe((d) => setOn(d));
    Analyser.audioEvent.subscribe(setProgress);
  }, []);
  const ProgressBarArgs = {
    width,
    value: (progress?.currentTime / progress?.duration) * 100,
  };
  return (
    <>
      <RoundedButton
        disabled={on}
        onClick={() => {
          PlayerAction.next(track);
        }}
      >
        <PlayArrow />
      </RoundedButton>

      <RoundedButton
        disabled={!on}
        size="small"
        onClick={() => {
          PlayerAction.next(false);
        }}
      >
        <Pause />
      </RoundedButton>
      {track.Title}
      <Player {...args} />
      <fieldset>
        <legend>EQ</legend>
        <EqLabel width={width} />
        <Divider />
        <ProgressBar {...ProgressBarArgs} />
      </fieldset>

      <ObjectReader captionText="Track" {...track} />
    </>
  );
};

export const DefaultView = Template.bind({});

DefaultView.args = {
  width: 500,
};
