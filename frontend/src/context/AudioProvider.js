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
      playbackPosition: null,
      playbackDuration: null,
      modalVisible: false,
      audio: [],
      loading: true,
      currentIndex: 0,
    };
  }

  async fetchAudio() {
    const query = `*[_type == "song"] {title,songNo,filename,lyrics,_id,"url":song.asset->url}| order(songNo asc)`;
    const params = {};
    await sanity.fetch(query, params).then((data) => {
      this.setState({ audio: data, loading: false });
    });
  }

  componentDidMount() {
    this.fetchAudio();
  }

  componentWillUnmount() {
    this.setState({ loading: true });
    this.fetchAudio();
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState });
  };

  render() {
    // console.log(this.state.currentIndex);
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
          modalVisible,
          currentIndex,
        }}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
