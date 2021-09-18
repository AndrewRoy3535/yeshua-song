// import sanityClient from "@sanity/client";

const sanityClient = require("@sanity/client");
const sanity = sanityClient({
  projectId: "xlqk6u8j",
  dataset: "production",
  apiVersion: "2021-06-07",

  useCdn: false,
  ignoreBrowserTokenWarning: true,
});

export default sanity;
