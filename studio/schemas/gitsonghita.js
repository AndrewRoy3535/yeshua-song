export default {
  name: "gitsonghita",
  title: "GitSongHita",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title (Bangla)",
      type: "string",
    },
    {
      name: "bookNo",
      title: "Book No (Bangla)",
      type: "string",
    },
    {
      name: "orderNo",
      title: "Order No. (English)",
      type: "string",
    },
    {
      name: "bookDescription",
      title: "Book Description (Bangla)",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
