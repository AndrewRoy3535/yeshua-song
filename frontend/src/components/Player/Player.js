import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { AudioContext } from "../../context/AudioProvider";
import { play, playNext } from "../../Utils/audioController";

const Player = ({
  palyAudio,
  playbackPosition,
  playbackDuration,
  totalAudioCount,
  songIndex,
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

    context.updateState(context, {
      currentAudio: audio,
      palybackObj: context.palybackObj,
      soundObj: status,
      isPlaying: true,
      currentIndex: index,
      //  playbackPosition: null,
      //  playbackDuration: null,
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

    context.updateState(context, {
      currentAudio: audio,
      palybackObj: context.palybackObj,
      soundObj: status,
      isPlaying: true,
      currentIndex: index,
      //  playbackPosition: null,
      //  playbackDuration: null,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.nowPlaying}>
        <Text style={{ color: "#aaa" }}>Now playing: </Text>
        <Text style={styles.nowPlayingText}> {currentAudio.title}</Text>
      </View>
      <Text style={styles.audioCount}>{`${
        currentIndex + 1
      } / ${totalAudioCount}`}</Text>
      <Slider
        style={{ width: width, height: 30 }}
        minimumValue={0}
        maximumValue={1}
        value={calculateSeekBar()}
        minimumTrackTintColor='#008577'
        maximumTrackTintColor='#000000'
      />
      <View style={styles.playerContainer}>
        {/* ----------------previous button---------------- */}
        <AntDesign
          style={{
            alignSelf: "center",
            marginHorizontal: 7,
          }}
          name='stepbackward'
          size={37}
          color='#008577'
          onPress={handlePrevious}
        />
        {/* ------------play pause button-----------   */}
        <AntDesign
          style={{
            alignSelf: "center",
          }}
          name={isPlaying ? "pause" : "play"}
          size={45}
          color='#008577'
          onPress={palyAudio}
        />
        {/* ------------------------play next------------------ */}
        <AntDesign
          style={{
            alignSelf: "center",
            marginHorizontal: 7,
          }}
          name='stepforward'
          size={37}
          color='#008577'
          onPress={handleNext}
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
  },
  playerContainer: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
    color: "#008577",
  },
  audioCount: { color: "#aaa", paddingHorizontal: 9, paddingVertical: 3 },
});

export default Player;
