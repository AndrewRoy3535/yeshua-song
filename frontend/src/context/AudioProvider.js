import React, { Component, createContext, useState, useEffect } from "react";
import sanity from "../lib/sanity";
import { LogBox } from "react-native";
import { playNext } from "../Utils/audioController";

export const AudioContext = createContext();
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export function AudioProvider(props) {
  const [state, updateState] = useState({
    palybackObj: null,
    soundObj: null,
    currentAudio: {},
    isPlaying: false,
    playbackPosition: null,
    playbackDuration: null,
    modalVisible: false,
    audio: [],
    loading: true,
    currentIndex: 0,
    showLyrics: false,
    navigationIndex: 0,
  });

  const fetchAudio = async () => {
    const query = `*[_type == "song"] {title,songNo,filename,lyrics,_id,"url":song.asset->url}| order(songNo asc)`;
    const params = {};
    await sanity.fetch(query, params).then((data) => {
      updateState({ ...state, audio: data, loading: false });
    });
  };

  useEffect(() => {
    fetchAudio();

    return () => {
      updateState({ ...state, loading: true });
    };
  }, []);

  // const onPlaybackstatusUpdate = async (playbackstatus) => {
  //   if (playbackstatus.isLoaded && playbackstatus.isPlaying) {
  //     updateState({
  //       ...state,
  //       playbackPosition: playbackstatus.positionMillis,
  //       playbackDuration: playbackstatus.durationMillis,
  //     });
  //   }

  //   console.log(playbackstatus);

  //   // -----------------------------
  //   if (playbackstatus.didJustFinish) {
  //     const nextAudioIndex = state.currentIndex + 1;
  //     // if there is no next audio
  //     if (nextAudioIndex >= state.audio.length) {
  //       state.palybackObj.unloadAsync();

  //       return updateState({
  //         ...state,
  //         soundObj: null,
  //         isPlaying: false,
  //         currentAudio: this.context.audio[0],
  //         currentIndex: 0,
  //         playbackPosition: null,
  //         playbackDuration: null,
  //       });
  //     }
  //     // otherwise do this
  //     const audioNew = state.audio[nextAudioIndex];
  //     const status = await playNext(state.palybackObj, audioNew.url);
  //     updateState({
  //       ...state,
  //       soundObj: status,
  //       isPlaying: true,
  //       currentAudio: audioNew,
  //       currentIndex: nextAudioIndex,
  //     });
  //   }
  // };

  const {
    audio,
    loading,
    palybackObj,
    soundObj,
    currentAudio,
    isPlaying,
    playbackPosition,
    playbackDuration,
    modalVisible,
    currentIndex,
    showLyrics,
    navigationIndex,
  } = state;

  return (
    <AudioContext.Provider
      value={{
        audio,
        loading,
        updateState,
        palybackObj,
        soundObj,
        currentAudio,
        isPlaying,
        playbackPosition,
        playbackDuration,
        modalVisible,
        currentIndex,
        showLyrics,
        navigationIndex,
        // onPlaybackstatusUpdate,
      }}>
      {props.children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;
