import * as React from "react";
import { View, Text, LogBox, ScrollView } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  Colors,
  ActivityIndicator,
} from "react-native-paper";
import sanity from "../lib/sanity";

function Home({ navigation }) {
  const [songs, setSongs] = React.useState([]);
  const [loading, setloading] = React.useState(true);

  const query = `*[_type == "song"] {title,songNo,filename,lyrics,_id,"url":song.asset->url}| order(songNo asc)`;

  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

  const params = {};
  const fetchMyAPI = React.useCallback(async () => {
    await sanity.fetch(query, params).then((data) => {
      setSongs(data);
      setloading(false);
    });
  }, []);
  React.useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <>
      {loading == true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator
            animating={true}
            color={Colors.green800}
            size='large'
          />
          <Text style={{ margin: 3 }}>
            Please wait while the songs are loading
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              width: "100%",
              paddingVertical: 10,
            }}>
            {songs.map((song) => {
              return (
                <Card
                  key={song._id}
                  style={{
                    display: "flex",
                    marginHorizontal: 5,
                    marginBottom: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("Music", { song: { ...song } })
                  }>
                  <Card.Title title={song.title} />
                </Card>
              );
            })}
          </View>
        </ScrollView>
      )}
    </>
  );
}

export default Home;
