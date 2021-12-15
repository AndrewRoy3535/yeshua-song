import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const Player = ({ isPlaying, palyAudio }) => {
  const { width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <Slider
        style={{ width: width, height: 30 }}
        minimumValue={0}
        maximumValue={1}
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
          size={27}
          color='#008577'
        />
        {/* ------------play pause button-----------   */}
        <AntDesign
          style={{
            alignSelf: "center",
          }}
          name={isPlaying ? "pause" : "play"}
          size={35}
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
          size={27}
          color='#008577'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerContainer: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Player;
