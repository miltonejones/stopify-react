import { CACHE_TABLE_DEF, DB_VERSION, INDEX_NAME } from "../app/Constants";
import { playerURL } from "../util/Functions";
import { LocalDb } from "./LocalDb";
import Observer from "./Observables";

export const setup = async (_) => {
  LocalDb.init([CACHE_TABLE_DEF], INDEX_NAME, DB_VERSION);
  const count = await LocalDb.tally(CACHE_TABLE_DEF.name);
  return count;
};

export const exists = async (FileKey) => {
  const fn = (row) => row.trackFk === FileKey;
  return LocalDb.select(CACHE_TABLE_DEF.name, fn);
};

export const cached = async (track) => {
  return exists(track.FileKey);
};

export const cache = async (track) => {
  const trackFk = track.FileKey;
  const url = playerURL(track.FileKey);
  const Blob = await download(url);
  return LocalDb.insert(CACHE_TABLE_DEF.name, [{ trackFk, Blob }]);
};

const download = (i) => {
  console.log({ i });
  return new Promise((f, t) => {
    var c = new XMLHttpRequest();
    addListeners(c);
    c.open("GET", i);
    c.responseType = "arraybuffer";
    //c.onprogress=function(e){var perc=Math.round((e.loaded/e.total)*100)+' of 100'};
    c.onload = function (e) {
      var u8 = new Uint8Array(this.response),
        ic = u8.length,
        bs = [];
      while (ic--) {
        bs[ic] = String.fromCharCode(u8[ic]);
      }
      f((t || "data:audio/mpeg;base64,") + btoa(bs.join("")));
    };
    c.send();
  });
};

function handleEvent(e) {
  const ok = e.lengthComputable;
  const msg = `${e.type}: ${e.loaded} of ${
    e.total
  } bytes transferred[${ok.toString()}]`;
  console.log(msg);
  blobDownloadProgress.next(msg);
}

function addListeners(xhr) {
  xhr.addEventListener("loadstart", handleEvent);
  xhr.addEventListener("loadend", handleEvent);
  xhr.addEventListener("progress", handleEvent);
  xhr.addEventListener("error", handleEvent);
  xhr.addEventListener("abort", handleEvent);
}

export default download;
export const blobDownloadProgress = new Observer();
export const blobDownloadComplete = new Observer();
