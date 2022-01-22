// audio play for the first time

export const play = async (palybackObj, url) => {
  try {
    const status = await palybackObj.loadAsync(
      { uri: url },
      { shouldPlay: true }
    );
    return status;
  } catch (error) {
    console.log("error from play", error.message);
  }
};

// pause audio

export const pause = async (palybackObj) => {
  try {
    const status = await palybackObj.setStatusAsync({
      shouldPlay: false,
    });
    return status;
  } catch (error) {
    console.log("error from pause", error.message);
  }
};

// resure audio

export const resume = async (palybackObj) => {
  try {
    const status = await palybackObj.playAsync();
    return status;
  } catch (error) {
    console.log("error from resume audio", error.message);
  }
};

export const playNext = async (palybackObj, url) => {
  try {
    await palybackObj.stopAsync();
    await palybackObj.unloadAsync();
    const status = await play(palybackObj, url);
    return status;
  } catch (error) {
    console.log("error from play next audio", error.message);
  }
};
