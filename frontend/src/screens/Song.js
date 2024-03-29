import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
const BlockContent = require("@sanity/block-content-to-react");
// import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AudioSlider from "../components/AudioSlider";

// import * as Notifications from "expo-notifications";
import Player from "../components/Player";
import * as Sharing from "expo-sharing";
// import {
//   AndroidImportance,
//   AndroidNotificationVisibility,
// } from "expo-notifications";
// import * as MediaLibrary from "expo-media-library";

const Song = ({ navigation, route }) => {
  const { song } = route.params;
  const audio = {
    filename: song.filename,
    uri: song.url,
  };
  const url = audio.uri + "?dl=";

  const filename = song.filename.replace(/\s+/g, "_");
  const fileUri = `${FileSystem.documentDirectory}songs/${filename}.mp3`;

  const [downloadProgress, setDownloadProgress] = useState("0%");

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [duration, setDuration] = useState(null);

  // const init = useCallback(async () => {
  //   if (playbackObject === null) {
  //     const audio = new Audio.Sound();
  //     setPlaybackObject(audio);
  //   }
  // }, [playbackObject]);

  // const auto = useCallback(async () => {
  //   if (playbackObject !== null && playbackStatus === null) {
  //     const status = await playbackObject.loadAsync({ uri: audio.uri });

  //     playbackObject
  //       .getStatusAsync()
  //       .then(function (result) {
  //         setDuration(result.durationMillis);
  //       })
  //       .catch((err) => console.error(err));
  //     return setPlaybackStatus(status);
  //   }

  //   return () => {
  //     playbackObject.unloadAsync();
  //   };
  // }, [playbackObject, playbackStatus]);

  // useEffect(() => {
  //   init();
  // }, [init]);

  // useEffect(() => {
  //   auto();
  // }, [auto]);

  const handleAudioPlayPause = async () => {
    // if (playbackObject !== null && playbackStatus === null) {
    //   const status = await playbackObject.loadAsync(
    //     { uri: audio.uri },
    //     { shouldPlay: true }
    //   );
    //   setIsPlaying(true);
    //   return setPlaybackStatus(status);
    // }
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

  const handleAudioStop = async () => {
    const status = await playbackObject.stopAsync();

    setIsPlaying(false);
    return setPlaybackStatus(status);
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    //ES6 interpolated literals/template literals
    //If seconds is less than 10 put a zero in front.
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    // FileSystem.getInfoAsync(fileUri)
    //   .then((res) => {
    //     console.log("Exist!");
    //   })
    //   .catch((err) => console.error(err));
  }, []);
  const handleDownloadSong = async () => {
    // const downloadedFile = await FileSystem.downloadAsync(url, fileUri);

    // const imageFileExts = ["jpg", "png", "gif", "heic", "webp", "bmp"];

    // if (isIos && imageFileExts.every((x) => !downloadedFile.uri.endsWith(x))) {
    //   const UTI = "public.item";
    //   const shareResult = await Sharing.shareAsync(downloadedFile.uri, { UTI });
    //   console.log(shareResult);
    // }
    // if (downloadedFile.status != 200) {
    //   handleError();
    // }

    FileSystem.downloadAsync(url, fileUri)
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View>
      <ScrollView style={tw`px-2  pt-2 mb-32 pb-32`}>
        <Text style={tw`text-red-400`}>{song.songNo}</Text>
        <BlockContent blocks={song.lyrics} />
        {/* <Ionicons
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
        <Ionicons
          style={{
            alignSelf: "center",
            backgroundColor: "gray",
            padding: 10,
            borderRadius: 50,
          }}
          name="stop"
          color="white"
          onPress={handleAudioStop}
        /> */}
        {/* {playbackObject !== null && <AudioSlider audio={playbackObject} />} */}

        <Text>{millisToMinutesAndSeconds(duration)}</Text>

        <Text>{downloadProgress}</Text>
        <Button
          icon="arrow-down"
          mode="contained"
          onPress={() => handleDownloadSong()}
        >
          Download Song
        </Button>
        <Button
          style={tw`my-4`}
          icon="arrow-left-thick"
          mode="contained"
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        >
          Go back
        </Button>
      </ScrollView>

      <Player />
    </View>
  );
};

export default Song;
