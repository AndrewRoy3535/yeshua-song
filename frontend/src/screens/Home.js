import * as React from "react";
import { View, Text } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import sanity from "../lib/sanity";
function Home({ navigation }) {
  const [songs, setSongs] = React.useState([]);
  const query = `*[_type == "song"]{title,songNo,filename,lyrics,_id,"url":song.asset->url}`;

  const params = {};
  const fetchMyAPI = React.useCallback(async () => {
    await sanity.fetch(query, params).then((data) => {
      setSongs(data);
    });
  }, []);
  React.useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 10,
      }}
    >
      {songs.map((song) => {
        return (
          <Card
            key={song._id}
            style={{
              display: "flex",
              marginHorizontal: 5,
              marginBottom: 5,
            }}
            onPress={() => navigation.navigate("Song", { song: { ...song } })}
          >
            <Card.Title title={song.title} subtitle={song.songNo} />
          </Card>
        );
      })}
    </View>
  );
}

export default Home;
