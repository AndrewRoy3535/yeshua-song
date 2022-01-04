import React, { Component, createContext } from "react";
import sanity from "../lib/sanity";
import { LogBox } from "react-native";

export const AudioContext = createContext();
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: [],
      loading: true,
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

  componentWillUnmount() {
    this.fetchAudio();
  }

  render() {
    const { audio, loading } = this.state;

    return (
      <AudioContext.Provider value={{ audio, loading }}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
