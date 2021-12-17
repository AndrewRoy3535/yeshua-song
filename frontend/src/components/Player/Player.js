import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const Player = ({
  isPlaying,
  palyAudio,
  currentAudio,
  playbackPosition,
  playbackDuration,
}) => {
  const { width } = Dimensions.get("window");

  const calculateSeekBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.nowPlaying}>
        <Text style={{ color: "#aaa" }}>Now playing: </Text>
        <Text style={styles.nowPlayingText}> {currentAudio.title}</Text>
      </View>
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
        />
        {/* ------------play pause button-----------   */}
        <AntDesign
          style={{
            alignSelf: "center",
          }}
          name={isPlaying ? "pause" : "play"}
          size={45}
          color='#008577'
          onPress={() => palyAudio()}
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
});

export default Player;
