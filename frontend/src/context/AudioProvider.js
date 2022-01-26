import React, { Component, createContext, useState, useEffect } from "react";
import sanity from "../lib/sanity";
import { LogBox } from "react-native";

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
      fetchAudio();
      updateState({ ...state, loading: true });
    };
  }, []);

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
      }}>
      {props.children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;
