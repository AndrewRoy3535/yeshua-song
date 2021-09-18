export default {
  name: "song",
  title: "Song",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "songNo",
      title: "Song No.",
      type: "string",
    },
    {
      name: "lyrics",
      title: "Lyrics",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "song",
      title: "Song",
      type: "file",
    },
  ],
};
