import {
  Album,
  Home,
  LocalOffer,
  MusicNote,
  People,
  PlaylistAddCheck,
} from "@material-ui/icons";

const appRoutes = [
  /**HOME PAGE */
  {
    path: "Home.html",
    data: {
      label: "Home",
      address: "/home",
      icon: <Home />,
      prefix: "/main/",
      cover: ["Home.html", "cover"],
    },
  },
  {
    path: "Home.html/:cover",
  },

  /**LIBRARY PAGE */
  {
    path: "Library.html",
    full: true,
    data: {
      label: "Library",
      address: "/library",
      icon: <MusicNote />,
      prefix: "/show/",
      home: true,
      cover: ["Library.html", "cover"],
    },
  },
  {
    path: "Library.html/:cover",
  },
  {
    path: "Songs.html/:searchParam",
  },
  {
    path: "Songs.html/:searchParam/:cover",
  },

  /**ARTIST PAGE */
  {
    path: "Artist.html",
    type: "artist",
    data: {
      label: "Artists",
      icon: <People />,
      prefix: "/list/",
      home: true,
      cover: ["Artist_cover.html", "cover"],
    },
  },
  {
    path: "Artist_cover.html/:cover",
  },
  {
    path: "Artist.html/:detailId",
  },
  {
    path: "Artists.html/:searchParam",
  },
  {
    path: "Artist.html/:detailId/:cover",
  },
  {
    path: "Artists.html/:searchParam/:cover",
  },

  /**ALBUM PAGE */
  {
    path: "Album.html",
    type: "album",
    data: {
      label: "Albums",
      icon: <Album />,
      prefix: "/list/",
      home: true,
      cover: ["Album_cover.html", "cover"],
    },
  },
  {
    path: "Album_cover.html/:cover",
  },
  {
    path: "Album.html/:detailId",
  },
  {
    path: "Albums.html/:searchParam",
  },
  {
    path: "Album.html/:detailId/:cover",
  },
  {
    path: "Albums.html/:searchParam/:cover",
  },

  /**GENRE PAGE */
  {
    path: "Genre.html",
    type: "genre",
    data: {
      label: "Genres",
      icon: <LocalOffer />,
      prefix: "/list/",
      cover: ["Genre_cover.html", "cover"],
    },
  },
  {
    path: "Genre_cover.html/:cover",
  },
  {
    path: "Genre.html/:detailId",
  },
  {
    path: "Genre.html/:detailId/:cover",
  },

  /**PLAYLIST PAGE */
  {
    path: "Playlist.html",
    type: "playlist",

    data: {
      label: "Playlists",
      icon: <PlaylistAddCheck />,
      prefix: "/list/",
      home: true,
      cover: ["Playlist_cover.html", "cover"],
    },
  },
];

export default appRoutes;
