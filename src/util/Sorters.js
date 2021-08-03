export const ThumbViewSorters = {
  album: [
    {
      Label: "Title",
      Field: "Name",
      isNaN: !0,
      isActive: !0,
      isASC: -1,
    },
    {
      Label: "Artist",
      Field: "artistName",
      isNaN: !0,
      isASC: -1,
    },
    {
      Label: "Track Count",
      Field: "trackCount",
      isActive: !1,
      isNaN: !1,
      isASC: -1,
    },
  ],
  artist: [
    {
      Label: "Artist Name",
      Field: "Name",
      isNaN: !0,
      isActive: !0,
      isASC: -1,
    },
    {
      Label: "Album Count",
      Field: "albumCount",
      isNaN: !1,
      isASC: -1,
    },
    {
      Label: "Track Count",
      Field: "trackCount",
      isActive: !1,
      isNaN: !1,
      isASC: -1,
    },
  ],
  genre: [
    {
      Label: "Title",
      Field: "Name",
      isNaN: !0,
      isActive: !0,
      isASC: -1,
    },
    {
      Label: "Track Count",
      Field: "Count",
      isActive: !1,
      isNaN: !1,
      isASC: -1,
    },
  ],

  playlist: [
    {
      Label: "Name",
      Field: "Title",
      isNaN: !0,
      isActive: !0,
      isASC: -1,
    },
    {
      Label: "Track Count",
      Field: "trackCount",
      isActive: !1,
      isNaN: !1,
      isASC: -1,
    },
  ],
};

export const sortBy = (sorters, collection) => {
  const sorter = sorters.filter((s) => s.isActive)[0];
  if (sorter) {
    const first = collection[0];
    if (first && sorter.Field in first) {
      const apply = (a, b) =>
        sorter.isASC * (is(sorter, a) > is(sorter, b) ? -1 : 1);
      const out = collection.sort(apply);
      return out;
    }
    alert(`${sorter.Field} not found! Check the console`);
  }
};

const is = (sorter, object) => {
  return sorter.isNaN
    ? object[sorter.Field]?.toString().toLowerCase()
    : object[sorter.Field];
};
