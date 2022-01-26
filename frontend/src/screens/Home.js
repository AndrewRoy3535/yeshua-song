import * as React from "react";
import { View, Text, LogBox, ScrollView } from "react-native";
import { Card, Colors, ActivityIndicator } from "react-native-paper";
import { color } from "react-native-reanimated";
import { AudioContext } from "../context/AudioProvider";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

function Home(props) {
  const context = React.useContext(AudioContext);

  const { loading, audio } = context;

  const { navigation } = props;
  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
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
              backgroundColor: "#688b69",
            }}>
            {audio.map((song, index, audioItself) => {
              return (
                <Card
                  key={song._id}
                  style={{
                    display: "flex",
                    marginHorizontal: 5,
                    marginBottom: 5,
                    backgroundColor: "#b5d3a3",
                  }}
                  onPress={() =>
                    navigation.navigate("Music", {
                      song: { ...song },
                      index,
                      audioItself,
                    })
                  }>
                  <Card.Title
                    title={`${index + 1}. ${song.title}`}
                    titleStyle={{ fontSize: 15 }}
                  />
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
