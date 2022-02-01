import * as React from "react";
import { View, Text, LogBox, ScrollView, FlatList } from "react-native";
import { Card, Colors, ActivityIndicator } from "react-native-paper";
import { AudioContext } from "../context/AudioProvider";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

function Home(props) {
  const context = React.useContext(AudioContext);

  const { loading, audio, updateState } = context;

  const { navigation } = props;

  const renderItem = ({ item, index }) => (
    <Card
      style={{
        display: "flex",
        marginHorizontal: 5,
        marginBottom: 5,
        backgroundColor: "#b5d3a3",
      }}
      onPress={() => {
        navigation.navigate("Music", {
          song: { ...item },
          index,
        });
        updateState({ ...context, navigationIndex: index });
      }}>
      <Card.Title
        title={`${item.title}`}
        titleStyle={{ fontSize: 15, color: "#fff" }}
      />
    </Card>
  );

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
        <View style={{ padding: 5 }}>
          <FlatList
            data={audio}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </>
  );
}

export default Home;
