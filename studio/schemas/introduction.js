export default {
  name: "introduction",
  title: "Intorduction",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "details",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
