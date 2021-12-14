import React, { Component } from "react";
import { View, ScrollView, Button, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
const BlockContent = require("@sanity/block-content-to-react");
import { Audio } from "expo-av";
import EmptyScreen from "../components/EmptyScreen/EmptyScreen";
import Player from "../components/Player/Player";

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      palybackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
    };
  }

  render() {
    if (this.props.route.params === undefined) return <EmptyScreen />;
    const { song } = this.props.route.params;
    const { url, title, songNo, _id } = song;

    const palyAudio = async () => {
      // Make audio paly for the first time

      if (this.state.soundObj === null) {
        const palybackObj = new Audio.Sound();

        const status = await palybackObj.loadAsync(
          { uri: url },
          { shouldPlay: true }
        );
        // console.log(status);
        return this.setState({
          ...this.state,
          palybackObj: palybackObj,
          soundObj: status,
          currentAudio: song,
          isPlaying: true,
        });
      }

      // Pause current audio
      if (
        this.state.soundObj.isLoaded === true &&
        this.state.soundObj.isPlaying === true
      ) {
        const status = await this.state.palybackObj.setStatusAsync({
          shouldPlay: false,
        });
        return this.setState({
          ...this.state,
          soundObj: status,
          isPlaying: false,
        });
      }

      // resume the current audio
      if (
        this.state.soundObj.isLoaded &&
        !this.state.soundObj.isPlaying &&
        this.state.currentAudio._id === song._id
      ) {
        const status = await this.state.palybackObj.playAsync();

        return this.setState({
          ...this.state,
          soundObj: status,
          isPlaying: true,
        });
      }
      //paly next audio
      if (
        this.state.soundObj.isLoaded &&
        this.state.currentAudio._id !== song._id
      ) {
        await this.state.palybackObj.stopAsync();
        await this.state.palybackObj.unloadAsync();
        const status = await this.state.palybackObj.loadAsync(
          { uri: url },
          { shouldPlay: true }
        );
        // console.log(status);
        return this.setState({
          ...this.state,
          soundObj: status,
          currentAudio: song,
          isPlaying: true,
        });
      }
    };

    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: "column",
          },
        ]}>
        <View style={styles.lriyContainer}>
          <ScrollView style={tw`px-2  pt-2 pb-32`}>
            <BlockContent blocks={song.lyrics} />
          </ScrollView>
        </View>
        <Player isPlaying={this.state.isPlaying} palyAudio={palyAudio} />
      </View>
    );
  }
}

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lriyContainer: {
    flex: 5,
  },
  playerContainer: {
    backgroundColor: "#ddd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
