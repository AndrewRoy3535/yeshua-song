import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { AudioContext } from "../../context/AudioProvider";
import { play, playNext, resume } from "../../Utils/audioController";
import { Entypo } from "@expo/vector-icons";
import useTimeBlockedCallback from "../../Utils/useTimeBlockedCallback";
import { State } from "react-native-gesture-handler";

const Player = ({
  palyAudio,
  totalAudioCount,
  playbackPosition,
  playbackDuration,
}) => {
  const { width } = Dimensions.get("window");
  const context = useContext(AudioContext);

  const { isPlaying, currentAudio, currentIndex } = context;

  const calculateSeekBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };

  const handleNext = async () => {
    const { isLoaded } = await context.palybackObj.getStatusAsync();
    const isLastAudio = context.currentIndex + 1 === context.audio.length;
    let audio = context.audio[context.currentIndex + 1];
    let index;
    let status;

    if (!isLoaded && !isLastAudio) {
      index = context.currentIndex + 1;
      status = await play(context.palybackObj, audio.url);
    }

    if (isLoaded && !isLastAudio) {
      index = context.currentIndex + 1;
      status = await playNext(context.palybackObj, audio.url);
    }

    if (isLastAudio) {
      index = 0;
      audio = context.audio[index];
      if (isLoaded) {
        status = await playNext(context.palybackObj, audio.url);
      } else {
        status = await play(context.palybackObj, audio.url);
      }
    }

    context.updateState({
      ...context,
      currentAudio: audio,
      palybackObj: context.palybackObj,
      soundObj: status,
      isPlaying: true,
      currentIndex: index,
    });
  };

  const handlePrevious = async () => {
    const { isLoaded } = await context.palybackObj.getStatusAsync();
    const isFirstAudio = context.currentIndex <= 0;
    let audio = context.audio[context.currentIndex - 1];
    let index;
    let status;

    if (!isLoaded && !isFirstAudio) {
      index = context.currentIndex - 1;
      status = await play(context.palybackObj, audio.url);
    }

    if (isLoaded && !isFirstAudio) {
      index = context.currentIndex - 1;
      status = await playNext(context.palybackObj, audio.url);
    }

    if (isFirstAudio) {
      index = context.audio.length - 1;
      audio = context.audio[index];
      if (isLoaded) {
        status = await playNext(context.palybackObj, audio.url);
      } else {
        status = await play(context.palybackObj, audio.url);
      }
    }

    context.updateState({
      ...context,
      currentAudio: audio,
      palybackObj: context.palybackObj,
      soundObj: status,
      isPlaying: true,
      currentIndex: index,
    });
  };

  const fullStop = async () => {
    if (context.soundObj.isLoaded) {
      await context.palybackObj.stopAsync();
      await context.palybackObj.unloadAsync();
      context.updateState({
        ...context,
        currentAudio: null,
        palybackObj: null,
        soundObj: null,
        isPlaying: false,
        currentIndex: context.currentIndex,
        showLyrics: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.audioCount}>{`${
        currentIndex + 1
      } / ${totalAudioCount}`}</Text>
      <View style={styles.nowPlaying}>
        <Text style={{ color: "#aaa" }}>Now Playing: </Text>
        {context.showLyrics ? (
          <Text style={styles.nowPlayingText}> {currentAudio.title}</Text>
        ) : (
          <Text></Text>
        )}
      </View>

      <Slider
        style={{ width: width, height: 30 }}
        minimumValue={0}
        maximumValue={1}
        value={calculateSeekBar()}
        minimumTrackTintColor='#b5d3a3'
        maximumTrackTintColor='#000000'
        thumbTintColor='#b5d3a3'
        onSlidingComplete={async (value) => {
          if (context.soundObj === null || !context.isPlaying) return;

          try {
            const status = await context.palybackObj.setPositionAsync(
              Math.floor(context.soundObj.durationMillis * value)
            );

            context.updateState({ ...context, soundObj: status });
            await resume(context.palybackObj);
          } catch (e) {
            console.log("error from slider", e.messege);
          }
        }}
      />
      <View style={styles.playerContainer}>
        {/* ----------------previous button---------------- */}
        <AntDesign
          style={{
            alignSelf: "center",
            marginHorizontal: 7,
          }}
          name='stepbackward'
          size={33}
          color='#b5d3a3'
          onPress={useTimeBlockedCallback(handlePrevious)}
        />
        {/* ------------play pause button-----------   */}
        <AntDesign
          style={{
            alignSelf: "center",
          }}
          name={isPlaying ? "pause" : "play"}
          size={45}
          color='#b5d3a3'
          onPress={useTimeBlockedCallback(palyAudio)}
        />
        {context.showLyrics ? (
          <Entypo
            name='controller-stop'
            size={45}
            color='#b5d3a3'
            onPress={fullStop}
          />
        ) : (
          <Text />
        )}

        {/* ------------------------play next------------------ */}
        <AntDesign
          style={{
            alignSelf: "center",
            marginHorizontal: 7,
          }}
          name='stepforward'
          size={33}
          color='#b5d3a3'
          onPress={useTimeBlockedCallback(handleNext)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#688b69",
  },
  playerContainer: {
    // position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 20,
  },
  nowPlaying: {
    flexDirection: "row",
    paddingHorizontal: 9,
    paddingVertical: 3,
    alignItems: "center",
  },
  nowPlayingText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#b5d3a3",
  },
  audioCount: { color: "#aaa", paddingHorizontal: 9, paddingVertical: 3 },
});

export default Player;
