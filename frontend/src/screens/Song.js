import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
const BlockContent = require("@sanity/block-content-to-react");
import { Audio } from "expo-av";
import EmptyScreen from "../components/EmptyScreen/EmptyScreen";
import Player from "../components/Player/Player";
import { AudioContext } from "../context/AudioProvider";
import { play, pause, resume, playNext } from "../Utils/audioController";

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackPosition: null,
      playbackDuration: null,
    };
  }

  static contextType = AudioContext;

  onPlaybackstatusUpdate = async (playbackstatus) => {
    if (playbackstatus.isLoaded && playbackstatus.isPlaying) {
      // this.context.updateState(this.context, {
      //   playbackPosition: playbackstatus.positionMillis,
      //   playbackDuration: playbackstatus.durationMillis,
      // });

      this.setState({
        playbackPosition: playbackstatus.positionMillis,
        playbackDuration: playbackstatus.durationMillis,
      });
    }

    // -----------------------------
    if (playbackstatus.didJustFinish) {
      const nextAudioIndex = this.context.currentIndex + 1;
      // if there is no next audio
      if (nextAudioIndex >= this.context.audio.length) {
        this.context.palybackObj.unloadAsync();

        this.setState({
          playbackPosition: null,
          playbackDuration: null,
        });

        return this.context.updateState({
          ...this.context,
          soundObj: null,
          isPlaying: false,
          currentAudio: this.context.audio[0],
          currentIndex: 0,
        });
      }
      // otherwise do this
      const audioNew = this.context.audio[nextAudioIndex];
      const status = await playNext(this.context.palybackObj, audioNew.url);
      this.context.updateState({
        ...this.context,
        soundObj: status,
        isPlaying: true,
        currentAudio: audioNew,
        currentIndex: nextAudioIndex,
      });
    }
  };

  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    try {
      await Audio.setAudioModeAsync({
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.props.route.params === undefined) return <EmptyScreen />;
    const { song, index, audioItself } = this.props.route.params;
    const { url, title, songNo, _id } = song;

    const totalAudioCount = audioItself.length;

    const palyAudio = async () => {
      const { palybackObj, soundObj, currentAudio, updateState } = this.context;
      // Make audio paly for the first time

      if (soundObj === null) {
        const palybackObj = new Audio.Sound();

        const status = await play(palybackObj, url);

        updateState({
          ...this.context,
          palybackObj: palybackObj,
          soundObj: status,
          currentAudio: song,
          isPlaying: true,
          currentIndex: this.props.route.params.index,
          showLyrics: true,
        });

        if (this._isMounted) {
          return palybackObj.setOnPlaybackStatusUpdate(
            this.onPlaybackstatusUpdate
          );
        }
      }

      // Pause current audio
      if (soundObj.isLoaded === true && soundObj.isPlaying === true) {
        const status = await pause(palybackObj);
        return updateState({
          ...this.context,
          soundObj: status,
          isPlaying: false,
        });
      }

      // resume the current audio
      if (
        soundObj.isLoaded &&
        !soundObj.isPlaying &&
        currentAudio._id === song._id
      ) {
        const status = await resume(palybackObj);

        return updateState({
          ...this.context,
          soundObj: status,
          isPlaying: true,
        });
      }
      //paly next audio
      if (soundObj.isLoaded && currentAudio._id !== song._id) {
        const status = await playNext(palybackObj, url);

        return updateState({
          ...this.context,
          soundObj: status,
          currentAudio: song,
          isPlaying: true,
          currentIndex: index,
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
          {this.context.showLyrics ? (
            <ScrollView style={tw`px-2  pt-2 pb-32`}>
              <BlockContent blocks={this.context.currentAudio.lyrics} />
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text>Press play icon to play song no {index + 1}</Text>
            </View>
            // <ScrollView style={tw`px-2  pt-2 pb-32`}>
            //   <BlockContent blocks={song.lyrics} />
            // </ScrollView>
          )}
        </View>
        <Player
          palyAudio={palyAudio}
          playbackPosition={this.state.playbackPosition}
          playbackDuration={this.state.playbackDuration}
          totalAudioCount={totalAudioCount}
          songIndex={index}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
