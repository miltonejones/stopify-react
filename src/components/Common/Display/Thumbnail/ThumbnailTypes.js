import { generateKey } from "../../../../util/Functions";

export const ThumbnailTypes = [
  // track
  {
    when: (i) => i.hasOwnProperty("FileKey"),
    is: (i) => ({
      ID: i.ID,
      Title: i.Title,
      image: i.albumImage,
      type: "track",
      dataType: "track",
      footer: (obj) => obj.artistName,
      secondary: (obj) => obj.albumName,
    }),
  },
  // artist
  {
    when: (i) => i.hasOwnProperty("artistImage"),
    is: (i) => ({
      ID: i.ID,
      Title: i.Name,
      image: i.artistImage,
      count: i.trackCount,
      type: "artist",
      dataType: "artist",
      footer: (obj) => {
        const out = [];
        if (obj.albumCount) {
          out.push(`${obj.albumCount} albums`);
        }
        out.push(`${obj.trackCount} tracks`);
        return out.join(", ");
      },
    }),
  },
  // album
  {
    when: (i) =>
      i.hasOwnProperty("collectionId") || i.hasOwnProperty("albumImage"),
    is: (i) => ({
      ID: i.ID,
      Title: i.Name,
      image: i.image || i.albumImage,
      count: i.trackCount,
      type: "album",
      dataType: "album",
      footer: (obj) => {
        const out = [];
        if (obj.artistName) {
          out.push(`${obj.artistName}`);
        }
        // out.push(`${obj.trackCount} tracks`);
        return out.join(", ");
      },
      secondary: (obj) => `${obj.trackCount} tracks`,
    }),
  },
  // playlist
  {
    when: (i) => i.hasOwnProperty("listKey") || i.hasOwnProperty("related"),
    is: (i) => ({
      ID: i.listKey || generateKey(i.Title),
      Title: i.Title,
      image: i.image,
      count: i.trackCount,
      type: "playlist",
      dataType: "playlist",
      footer: (obj) => `${obj.trackCount} tracks`,
    }),
  },
  // genre
  {
    when: (i) => i.hasOwnProperty("genreKey"),
    is: (i) => ({
      ID: i.genreKey,
      Title: i.Name,
      image: i.genreImage,
      count: i.Count,
      type: "genre",
      dataType: "genre",
      footer: (obj) => `${obj.Count} tracks`,
    }),
  },
];

export const DefaultGridColumns = [
  "Title",
  "albumName",
  "artistName",
  "trackTime",
];

export const GridFieldType = {
  artist: ["Title", "albumName", "Genre", "trackTime"],
  genre: ["Title", "albumName", "artistName", "trackTime"],
  album: ["Title", "artistName", "Genre", "trackTime"],
  playlist: DefaultGridColumns,
};
