import React, { useEffect, useState } from "react";
import Player, { PlayerAction } from "./Player";

import tracks from "../../../stories/assets/stories-play-list.json";
import EqLabel from "../EqLabel/EqLabel";
import ObjectReader from "../../Dev/ObjectReader/ObjectReader";
import { RoundedButton } from "../PlayerButton/PlayerButton";
import { Pause, PlayArrow } from "@material-ui/icons";
import { Analyser } from "../../../services/AudioAnalyzer";
import ProgressBar from "../ProgressBar/ProgressBar";
import { ComponentDescription } from "../../Layout/AppLayout/AppLayout";
import { CONFIRM_MESSAGE } from "../../../util/PlayerConnect";

export default {
  title: "Audio/Player",
  component: Player,
};
const track = tracks[97];

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
      <Player {...args} />

      <ComponentDescription title="Rounded Button">
        The RoundedButton is an extension of the Material-UI &lt;Button /&gt;
        component with custom styling. Click the Play button to play the
        selected track. (The currently loaded track is {track.Title} by{" "}
        {track.artistName}).
      </ComponentDescription>

      <ObjectReader captionText="Track properties" {...track} />

      <RoundedButton
        disabled={on}
        onClick={() => {
          if (Analyser.context.state !== "running") {
            const kool = window.confirm(CONFIRM_MESSAGE);
            if (kool) {
              Analyser.context.resume();
            }
          }
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

      <ComponentDescription title="EqLabel">
        The EqLabel subscribes to audio stream of the Player Component to create
        an HTML equalizer when music is played.
      </ComponentDescription>

      <fieldset>
        <legend>EQ</legend>
        <EqLabel flat width={width} />
      </fieldset>

      <ComponentDescription title="ProgressBar">
        The ProgressBar subscribes to audio object to show the position and
        duration of the currently playing track.
      </ComponentDescription>

      <fieldset>
        <legend>ProgressBar</legend>
        <ProgressBar {...ProgressBarArgs} />
      </fieldset>

      <ComponentDescription title="Player Object">
        The Player object renders a hidden &lt;audio /&gt; tag to the browser
        and exposes its properties and events to the rest of the application.
      </ComponentDescription>
    </>
  );
};

export const DefaultView = Template.bind({});

DefaultView.args = {
  width: 300,
  describe: true,
};
