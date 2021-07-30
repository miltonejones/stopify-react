import axios from "axios";
import { ARTIST_API_ADDRESS } from "../app/Constants";
import { AppleConvert } from "../util/AppleConvert";
import { randomize, generateKey } from "../util/Functions";
import Observer from "./Observables";

let PLAYLIST_COLLECTION = [];

const dataStateChange = new Observer("dataStateChange");

const group = (type, keys) => {
  return new Promise((callback) => {
    const files = Promise.all(keys.map((id) => query(type, id)));
    const id = keys[0];
    const out = [];
    files.then((res) => {
      res.map((datum) => {
        const { data } = datum;
        out.push(...data.related);
        return data;
      });
      out.map((track) => {
        track[`${type}Fk`] = id;
        track[`${type}Name`] = null;
        return track;
      });

      saveTracks(out).then(callback);
    });
  });
};

const commit = (track) => {
  return new Promise((callback) => {
    const up = Object.assign({}, track);
    up.albumName = up.artistName = up.artist = null;
    save(up).then(callback);
  });
};

const endpoint = (type, id) => {
  const address = [`${ARTIST_API_ADDRESS}${type}`];
  if (id) address.push(`id=${id.toString().replace("&", "%26")}`);
  return address.join("?");
};

const apple = (title, artist) => {
  const qs = ["Title=" + title.replace(/\.[^.]{3}/, ""), "info=yes"];
  if (artist?.length) {
    qs.push(`artist=${artist}`);
  }
  const address = `${ARTIST_API_ADDRESS}tune?${qs.join("&")}`;
  return eventPromise(reporter.get(address));
};

const search = (param, type) => {
  const address = [`${ARTIST_API_ADDRESS}search?param=${param}`];
  if (type) address.push(`type=${type}`);
  return eventPromise(reporter.get(address.join("&")));
};

const eventPromise = (promise) => {
  return new Promise((callback) => {
    // dataStateChange.next(false);
    promise.then((res) => {
      dataStateChange.next(true);
      callback(res);
    });
  });
};

class reporter {
  static get(dest) {
    dataStateChange.next(`Connecting to ${dest}...`);
    return axios.get(dest);
  }
  static post(dest, data) {
    dataStateChange.next(`Posting to ${dest}...`);
    return axios.post(dest, data);
  }
}

const query = (type, id) => {
  const promise =
    type === "playlist" && !!id
      ? getPlaylist(id)
      : reporter.get(endpoint(type, id));

  return eventPromise(promise);
};

const send = (type, data) => {
  return eventPromise(reporter.post(endpoint(type), data));
};

const save = (track) => {
  return eventPromise(reporter.post(endpoint("tune"), track));
};

const getGenreData = () => {
  return new Promise((callback) => {
    query("genre").then((res) => {
      const items = res.data;
      const genres = randomize(
        items.filter((genre) => {
          return genre.Count > 19 && !!genre.genreImage;
        })
      )
        .slice(0, 2)
        .map((genre) => genre.genreKey);

      Promise.all(
        genres.map((q) => query("genre", q.replace("&", "%26")))
      ).then((data) => {
        data.map((d) => {
          return (d.data = d.data?.slice(0, 6));
        });
        callback({ genres, data, items });
      });
    });
  });
};

function organize(list, tracks) {
  const output = [];
  list.related?.map((track, i) => {
    const found = tracks.filter(
      (f) => stripExt(f.FileKey) === stripExt(track)
    )[0];
    if (found) {
      const exist = output.filter((o) => o.FileKey === found.FileKey)[0];
      if (exist) {
        return null;
      }
      found.trackNumber = i + 1;
      output.push(found);
    }
    return found;
  });
  return output;
}

function stripExt(value) {
  if (!(value && value.replace)) {
    return "";
  }
  const stripped = value.replace(/(\.mp3|\.opus|\.ogg)/g, "");
  if (stripped) {
    return stripped;
  }
  return value;
}

function saveList(list) {
  return new Promise((o) => {
    eventPromise(reporter.post(ARTIST_API_ADDRESS + "playlist", list)).then(
      (data) => {
        updatePlaylistCollection().then(() => o(data));
      }
    );
  });
}
function getPlaylistByKey(title, track) {
  return PLAYLIST_COLLECTION.filter(
    (c) => c.Title === title || c.listKey === title
  )[0];
}
function addToPlaylistByKey(title, track) {
  return new Promise((callback) => {
    updatePlaylistCollection().then((c) => {
      const list = getPlaylistByKey(title, track);
      if (list) addToPlaylist(list, track).then((x) => callback(x));
    });
  });
}
function addToPlaylist(list, track) {
  const Key = track.Key;
  const existing = list.related.indexOf(Key) >= 0;
  if (!existing) {
    list.related.push(Key);
    list.related = list.related.filter((f) => f && f.split);
    return saveList(list);
  }
  return removeFromPlaylist(list, track);
}
function removeFromPlaylist(list, track) {
  const existing = list.related.indexOf(track.Key) >= 0;
  if (existing) {
    list.related = list.related.filter((f) => f !== track.Key);
  }
  return saveList(list);
}
function createList(Title, track) {
  return saveList({
    Title,
    related: [track.Key],
  });
}

function getTrackListByKeys(playlist, Keys) {
  return new Promise((callback) => {
    send("tune", { Keys }).then((res) => {
      const related = organize(playlist, res.data);

      callback(related);
    });
  });
}

function getPlaylist(id) {
  return new Promise((callback) => {
    query("playlist").then((res) => {
      const playlist = res.data?.filter((d) => generateKey(d.Title) === id)[0];
      if (playlist) {
        const Keys = [...new Set(playlist.related.filter((f) => !!f))];
        getTrackListByKeys(playlist, Keys).then(callback);
      }
    });
  });
}

const playlistCount = async (track) => {
  !PLAYLIST_COLLECTION.length && (await updatePlaylistCollection());
  return compareTrackToLists(track);
};

function compareTrackToLists(track) {
  if (PLAYLIST_COLLECTION && !!track) {
    const playlists = PLAYLIST_COLLECTION.filter((list) =>
      playListContainsTrack(track, list)
    );
    return playlists.length;
  }

  return 0;
}

function playListContainsTrack(audioTrack, list) {
  if (audioTrack?.Key) {
    const count = list.related.filter(
      (f) => stripExt(f) === stripExt(audioTrack.Key)
    ).length;
    return count > 0;
  }
  return false;
}

const ParsedInfo = (str) => {
  const regex = /([^/]+)\/([^/]+)\/Disc (\d+)[^0-9]+(\d+)\s-\s([^/]+)\.[^.]{3}/.exec(
    str
  );
  const field = [
    "value",
    "artistName",
    "albumName",
    "discNumber",
    "trackNumber",
    "Title",
  ];
  const obj = {};
  if (regex) {
    field.map((name, i) => (obj[name] = regex[i].replace(/\.[^.]{3}/, "")));
  }
  return obj;
};
const saveTracks = (tracks) => {
  return new Promise((callback) => {
    const next = () => {
      if (!tracks.length) return callback();
      commit(tracks.pop()).then(next);
    };
    next();
  });
};

const attachData = (suggested, field, type, key) => {
  return new Promise((callback) => {
    const value = suggested?.[field];
    console.log({ field, value });
    if (value) {
      search(value, type).then(({ data }) => {
        const { items } = data;
        if (items?.length) {
          const found = items.filter(
            (f) => f.Title?.toLowerCase() === value?.toLowerCase()
          )[0];
          if (found) {
            console.log({ found });
            suggested[key] = found.Key;
          } else {
            console.log('could not find "%s" in', value, items);
          }
        }
        callback(suggested);
      });
      return;
    }
    callback(suggested);
  });
};

export const iTuneLookup = (track) => {
  return new Promise((callback) => {
    apple(track.Title, track.artistFk ? track.artistName : null).then((res) => {
      const { results } = res.data;
      const itunes = results.map((result) => AppleConvert(result));
      console.log({ itunes });
      callback(itunes);
    });
  });
};

export const createPlus = (track, type, Name, image, id, name) => {
  const payloads = {
    artist: { Name, image },
    album: { Name, image, artistFk: track.artistFk },
  };
  return new Promise((callback) => {
    send(type, payloads[type]).then((res) => {
      console.log(res);
      const answer = res.data;
      let ID = answer.success?.insertId || answer?.ID;
      callback(
        Object.assign(track, {
          [id]: ID,
          [name]: Name,
        })
      );
    });
  });
};

export {
  endpoint,
  query,
  search,
  commit,
  saveTracks,
  group,
  send,
  save,
  apple,
  attachData,
  ParsedInfo,
  getGenreData,
  getPlaylist,
  addToPlaylist,
  addToPlaylistByKey,
  compareTrackToLists,
  playListContainsTrack,
  createList,
  removeFromPlaylist,
  playlistCount,
  dataStateChange,
  PLAYLIST_COLLECTION,
};

const updatePlaylistCollection = () => {
  return new Promise((cb) => {
    query("playlist").then((res) => cb((PLAYLIST_COLLECTION = res.data)));
  });
};
