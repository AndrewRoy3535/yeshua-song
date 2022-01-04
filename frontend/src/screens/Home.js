import * as React from "react";
import { View, Text, LogBox, ScrollView } from "react-native";
import { Card, Colors, ActivityIndicator } from "react-native-paper";
import { AudioContext } from "../context/AudioProvider";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = AudioContext;

  render() {
    const { audio, loading } = this.context;
    const { navigation } = this.props;

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
              }}>
              {audio.map((song) => {
                return (
                  <Card
                    key={song._id}
                    style={{
                      display: "flex",
                      marginHorizontal: 5,
                      marginBottom: 5,
                    }}
                    onPress={() =>
                      navigation.navigate("Music", {
                        song: { ...song },
                      })
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
}

export default Home;
