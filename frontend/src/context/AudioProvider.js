import React, { Component, createContext } from "react";
import sanity from "../lib/sanity";
import { LogBox } from "react-native";

export const AudioContext = createContext();
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palybackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      audio: [],
      loading: true,
      playbackPosition: null,
      playbackDuration: null,
    };
  }

  async fetchAudio() {
    const query = `*[_type == "song"] {title,songNo,filename,lyrics,_id,"url":song.asset->url}| order(songNo asc)`;
    const params = {};
    await sanity.fetch(query, params).then((data) => {
      this.setState({ ...this.state, audio: data, loading: false });
    });
  }

  componentDidMount() {
    this.fetchAudio();
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState });
  };

  render() {
    const {
      audio,
      loading,
      palybackObj,
      soundObj,
      currentAudio,
      isPlaying,
      playbackPosition,
      playbackDuration,
    } = this.state;

    return (
      <AudioContext.Provider
        value={{
          audio,
          loading,
          updateState: this.updateState,
          palybackObj,
          soundObj,
          currentAudio,
          isPlaying,
          playbackPosition,
          playbackDuration,
        }}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
