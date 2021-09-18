import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

const BlockContent = require("@sanity/block-content-to-react");
import { Audio } from "expo-av";

const Song = ({ navigation, route }) => {
  const { song } = route.params;
  const audio = {
    filename: song.title,
    uri: song.url,
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);

  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
  }, []);

  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      const status = await playbackObject.loadAsync(
        { uri: audio.uri },
        { shouldPlay: true }
      );
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
    if (playbackStatus.isPlaying) {
      const status = await playbackObject.pauseAsync();
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }
    if (!playbackStatus.isPlaying) {
      const status = await playbackObject.playAsync();
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
  };

  return (
    <ScrollView>
      <Text> {song.title}</Text>
      <Text> {song.songNo}</Text>

      <BlockContent blocks={song.lyrics} />
      <Ionicons
        style={{
          alignSelf: "center",
          backgroundColor: "gray",
          padding: 10,
          borderRadius: 50,
        }}
        name={isPlaying ? "pause" : "play"}
        size={24}
        color="white"
        onPress={handleAudioPlayPause}
      />
      <Button
        icon="arrow-left-thick"
        mode="contained"
        onPress={() => navigation.dispatch(CommonActions.goBack())}
      >
        Go back
      </Button>
    </ScrollView>
  );
};

export default Song;
