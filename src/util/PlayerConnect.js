import { drawerOpen } from "../components/Audio/ResponsivePlayerDrawer/ResponsivePlayerDrawer";
import { Analyser } from "../services/AudioAnalyzer";
import { query } from "../services/RemoteData";
import { sortObjects } from "./Functions";

export const queueCollection = (type, id, small) => {
  query(type, id).then((res) => {
    const data = res.data || res;
    const items = sortObjects(data.related || data, type);
    const start = 0;
    const t = items[start];
    queueTracks(small, items, start, t);
  });
};

export const queueTrack = (small, t) => {
  queueTracks(small, [t], 0, t);
};

export const CONFIRM_MESSAGE = `The equalizer needs permission to access your system. 
                          Click here to grant permission.`;

export const queueTracks = (small, items, start, t) => {
  const cancel = () => {
    drawerOpen.next({ open: false });
  };
  const p = { open: !small, cancel, flat: true, items, start, t };

  if (Analyser.context.state !== "running") {
    const kool = window.confirm(CONFIRM_MESSAGE);
    if (kool) {
      Analyser.context.resume();
    }
  }
  console.log({ p });
  drawerOpen.next(p);
  setTimeout(() => Analyser.audioEvent.next({ goto: start }), 499);
  return p;
};

export const androidConnect = ({
  Title,
  artistName,
  albumName,
  albumImage,
}) => {
  if ("mediaSession" in navigator) {
    const code = ` navigator.mediaSession.metadata = new MediaMetadata({
      title: '${Title}',
      artist: '${artistName}',
      album: '${albumName}',
      artwork: [
        { src: '${albumImage}',   sizes: '96x96',   type: 'image/jpeg' },
        { src: '${albumImage}', sizes: '512x512', type: 'image/jpeg' },
      ]
    });`;
    try {
      // eslint-disable-next-line no-eval
      eval(code);
    } catch (e) {
      console.log(e);
    }
    // navigator.mediaSession.setActionHandler("play", function () {});
    // navigator.mediaSession.setActionHandler("pause", function () {});
    // navigator.mediaSession.setActionHandler("seekbackward", function () {});
    // navigator.mediaSession.setActionHandler("seekforward", function () {});
    navigator.mediaSession.setActionHandler("previoustrack", function () {
      Analyser.audioEvent.next({ advance: -1 });
    });
    navigator.mediaSession.setActionHandler("nexttrack", function () {
      Analyser.audioEvent.next({ advance: 1 });
    });
  }
};
