import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import AudioSlider from "./AudioSlider";
const Player = () => {
  return (
    <View
      style={tw`absolute bottom-0   w-full h-32 bg-red-500 justify-center items-center text-center`}
    >
      <Text style={tw`text-white`}>Jabur Sharif</Text>
      <AudioSlider audio="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      <View style={tw` flex-row  justify-center   items-center text-center`}>
        <Ionicons
          style={{
            alignSelf: "center",
            backgroundColor: "gray",
            padding: 10,
            borderRadius: 50,
            display: "flex",
            marginRight: 10,
          }}
          name={"pause"}
          size={12}
          color="white"
          // onPress={handleAudioPlayPause}
        />
        <Ionicons
          style={{
            alignSelf: "center",
            backgroundColor: "gray",
            padding: 10,
            borderRadius: 50,
            display: "flex",
          }}
          name="stop"
          size={12}
          color="white"
          // onPress={handleAudioStop}
        />
      </View>
    </View>
  );
};

export default Player;
