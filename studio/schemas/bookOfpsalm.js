export default {
  name: "bookOfpsalm",
  title: "Book of Psalm",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title (Bangla)",
      type: "string",
    },
    {
      name: "bookNo",
      title: "Book No. (Bangla)",
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
