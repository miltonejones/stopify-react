import Observer from "./Observables";

const AudioContext =
  window.AudioContext || // Default
  window.webkitAudioContext; // Safari a

class AudioAnalyser {
  eqOutput = new Observer("eqOutput");
  eqResize = new Observer("eqResize");
  audioEvent = new Observer("audioEvent");
  enabled = true;
  context = new AudioContext();
  running = true;
  started = false;

  enable() {
    this.enabled = !0;
  }

  disable() {
    this.enabled = !1;
  }

  configure(audio, hue, width) {
    audio.addEventListener("error", (e) => {
      console.warn("An error occured", { e });
    });
    audio.addEventListener("timeupdate", (e) => {
      this.audioEvent.next({
        currentTime: audio.currentTime,
        duration: audio.duration,
      });
    });
    audio.addEventListener("loadeddata", (e) => {
      this.audioEvent.next({
        begun: true,
      });
    });
    audio.addEventListener("ended", (e) => {
      this.audioEvent.next({
        ended: true,
      });
    });
    this.eqResize.subscribe((w) => {
      this.width = w;
      this.disable();
    });
    this.audio = audio;
    this.width = width;
    this.color = hue;
  }

  pause() {
    this.audioEvent.next({ pause: !0 });
  }

  isPlaying() {
    return this.audio?.readyState > 0 && !this.audio?.paused;
  }

  attach(audio, width) {
    try {
      const hue = "green";
      if (!this.enabled) return console.log("NOT ENABLED!!");
      this.configure(audio, hue, width);
      this.analyser = this.context.createAnalyser();
      this.source = this.context.createMediaElementSource(audio);
      this.source.connect(this.analyser);
      this.analyser.connect(this.context.destination);
      console.log("attached!", hue, width, this.context.state);
    } catch (e) {
      console.warn(e);
      console.table(this.analyser);
      console.table(this.source);
    }
  }

  restart() {
    this.started = false;
    this.start();
  }

  start() {
    if (this.started) return;
    const exec = () => {
      this.eqOutput.next(currentBarGraph(this.analyser, this.width));
      if (this.running) {
        window.requestAnimationFrame(exec);
        this.started = true;
        return;
      }
      console.log("animation stopped");
      this.started = false;
    };
    this.running = true;
    this.started = false;
    window.requestAnimationFrame(exec);
    console.log("animation started", this.width);
  }
}

const Analyser = new AudioAnalyser();

export { Analyser };

function currentBarGraph(analyser, width = 400, fftSize = 64, factor = 8) {
  if (!analyser?.fftSize) return;
  analyser.fftSize = fftSize;
  const bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);
  return frequencyCoords(
    dataArray,
    bufferLength,
    width / bufferLength,
    factor,
    width
  );
}

function frequencyCoords(dataArray, bufferLength, barWidth, factor, width) {
  const coords = [];
  let barHeight;
  let x = 0;
  for (var index = 0; index < bufferLength; index++) {
    barHeight = dataArray[index];
    const grow = 1; //index > bufferLength * 0.75 ? 4 : 1;
    const actualHeight = (barHeight / factor) * grow;
    const fillStyle =
      "rgb(" + (barHeight + 100) + ", " + (255 - barHeight) + ", 90)";
    coords.push({
      index,
      fillStyle,
      x,
      actualHeight,
      barWidth,
    });
    x += barWidth + 1;
  }
  return coords;
}
