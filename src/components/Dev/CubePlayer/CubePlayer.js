import {
  BarChartSharp,
  Headset,
  MusicNote,
  PlayCircleFilled,
  Redo,
  Repeat,
  Search,
  Shuffle,
  SkipNext,
  SkipPrevious,
  VolumeUp,
} from "@material-ui/icons";
import React from "react";
import "./CubePlayer.css";

const CubePlayer = () => {
  return (
    <div className="CubePlayer">
      Title
      <div class="player">
        <div class="player_inner">
          <div class="player_inner__top">
            <div class="t_left">
              <BarChartSharp />
            </div>
            <div class="t_mid">
              <h1>CUB3DPlayer</h1>
            </div>
            <div class="t_right">
              <Search />
            </div>
          </div>
          <div class="player_inner__middle">
            <input class="trigger--4" name="omni" type="radio"></input>
            <input class="trigger--3" name="omni" type="radio"></input>
            <input class="trigger--2" name="omni" type="radio"></input>
            <input class="trigger--1" name="omni" type="radio"></input>
            <input class="empty"></input>
            <div class="cube">
              <div class="cube_inner">
                <div class="cube_inner__front">
                  <div class="bars">equalizer</div>
                  <div class="details">
                    <div class="details_album"></div>
                    <h2>Koan Sound - Meanwhile in the future</h2>
                    <h3>Funkblaster</h3>
                  </div>
                </div>
                <div class="cube_inner__left">
                  <div class="options">
                    <Headset />
                    <Redo />
                    <Shuffle />
                    <SkipNext />
                    <MusicNote />
                  </div>
                </div>
                <div class="cube_inner__right">
                  <div class="volume">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4].map((d) => (
                      <div key={d} class="volume_pip"></div>
                    ))}

                    <VolumeUp />
                  </div>
                </div>
              </div>
            </div>
            <div class="shadow_right"></div>
            <div class="shadow_left"></div>
          </div>
          <div class="player_inner__bottom">
            <div class="options">
              <Repeat />
              <Shuffle />
            </div>
            <div class="playbar">
              <div class="playbar_inner"></div>
              <div class="playbar_left">
                <span>0:00</span>
              </div>
              <div class="playbar_right">
                <span>3:45</span>
              </div>
            </div>
            <div class="controls">
              <div class="controls_left">
                <SkipPrevious />
              </div>
              <div class="controls_middle">
                <PlayCircleFilled />
              </div>
              <div class="controls_right">
                <SkipNext />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CubePlayer.defaultProps = {};
export default CubePlayer;
