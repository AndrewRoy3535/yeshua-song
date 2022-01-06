import React, { Component } from "react";
import { View, ScrollView, Button, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
const BlockContent = require("@sanity/block-content-to-react");
import { Audio } from "expo-av";
import EmptyScreen from "../components/EmptyScreen/EmptyScreen";
import Player from "../components/Player/Player";
import { AudioContext } from "../context/AudioProvider";

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // palybackObj: null,
      // soundObj: null,
      // currentAudio: {},
      // isPlaying: false,
      playbackPosition: null,
      playbackDuration: null,
    };
  }

  static contextType = AudioContext;

  onPlaybackstatusUpdate = (playbackstatus) => {
    const { updateState } = this.context;
    if (playbackstatus.isLoaded && playbackstatus.isPlaying) {
      // updateState(this.context, {
      //   playbackPosition: playbackstatus.positionMillis,
      //   playbackDuration: playbackstatus.durationMillis,
      // });

      this.setState({
        ...this.state,
        playbackPosition: playbackstatus.positionMillis,
        playbackDuration: playbackstatus.durationMillis,
      });
    }
  };

  async componentWillUnmount() {
    const { palybackObj } = this.context;
    await palybackObj.stopAsync();
    await palybackObj.unloadAsync();
  }

  render() {
    if (this.props.route.params === undefined) return <EmptyScreen />;
    const { song } = this.props.route.params;
    const { url, title, songNo, _id } = song;

    // console.log(this.context);
    const palyAudio = async () => {
      const { palybackObj, soundObj, currentAudio, updateState } = this.context;
      // Make audio paly for the first time

      if (soundObj === null) {
        const palybackObj = new Audio.Sound();

        const status = await palybackObj.loadAsync(
          { uri: url },
          { shouldPlay: true }
        );

        updateState(this.context, {
          palybackObj: palybackObj,
          soundObj: status,
          currentAudio: song,
          isPlaying: true,
        });

        // this.setState({
        //   ...this.state,
        //   palybackObj: palybackObj,
        //   soundObj: status,
        //   currentAudio: song,
        //   isPlaying: true,
        // });
        return palybackObj.setOnPlaybackStatusUpdate(
          this.onPlaybackstatusUpdate
        );
      }

      // Pause current audio
      if (soundObj.isLoaded === true && soundObj.isPlaying === true) {
        const status = await palybackObj.setStatusAsync({
          shouldPlay: false,
        });
        return updateState(this.context, {
          soundObj: status,
          isPlaying: false,
        });
        // return this.setState({
        //   ...this.state,
        //   soundObj: status,
        //   isPlaying: false,
        // });
      }

      // resume the current audio
      if (
        soundObj.isLoaded &&
        !soundObj.isPlaying &&
        currentAudio._id === song._id
      ) {
        const status = await palybackObj.playAsync();

        return updateState(this.context, { soundObj: status, isPlaying: true });

        // return this.setState({
        //   ...this.state,
        //   soundObj: status,
        //   isPlaying: true,
        // });
      }
      //paly next audio
      if (soundObj.isLoaded && currentAudio._id !== song._id) {
        await palybackObj.stopAsync();
        await palybackObj.unloadAsync();
        const status = await palybackObj.loadAsync(
          { uri: url },
          { shouldPlay: true }
        );
        // console.log(status);

        return updateState(this.context, {
          soundObj: status,
          currentAudio: song,
          isPlaying: true,
        });

        // return this.setState({
        //   ...this.state,
        //   soundObj: status,
        //   currentAudio: song,
        //   isPlaying: true,
        // });
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
        <Player
          palyAudio={palyAudio}
          playbackPosition={this.state.playbackPosition}
          playbackDuration={this.state.playbackDuration}
        />
      </View>
    );
  }
}

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 5,
  },
  lriyContainer: {
    flex: 3,
  },
  playerContainer: {
    backgroundColor: "#ddd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
