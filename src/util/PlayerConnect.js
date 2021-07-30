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

const CONFIRM_MESSAGE = `The equalizer needs permission to access your system. 
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
