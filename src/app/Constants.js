const ARTIST_API_ADDRESS = "http://sandbox.miltonjones.nl:1932/";
const CLOUD_FRONT_URL = "https://s3.amazonaws.com/box.import/";
const DEFAULT_IMAGE = "http://ullify.com/assets/cdrom-unmount.png";
const APP_NAME = "Stopify!";
const SOCKET_HOST = "http://sandbox.miltonjones.nl:7575";
const DEFAULT_HREF = "#";
const OMITTED_COLUMNS = {
  artist: "artistName",
  album: "albumName",
  genre: "Genre",
};

const CACHE_TABLE_DEF = {
  name: "blobCache",
  key: "ID",
  fields: ["ID", "Blob", "trackFk"],
};

export const INDEX_NAME = "db_music_cache";
export const DB_VERSION = 1;

export {
  ARTIST_API_ADDRESS,
  CLOUD_FRONT_URL,
  DEFAULT_IMAGE,
  SOCKET_HOST,
  DEFAULT_HREF,
  APP_NAME,
  OMITTED_COLUMNS,
  CACHE_TABLE_DEF,
};

export const SCREEN_STATE = {
  SCREEN: "screen",
  MOBILE: "mobile",
  TABLET: "tablet",
};
