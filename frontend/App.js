import * as React from "react";
import { Platform, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./src/Routes/BottomTab";
import AudioProvider from "./src/context/AudioProvider";
import ModalView from "./src/components/Modal/ModalView";

const App = () => {
  return (
    <AudioProvider>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <NavigationContainer>
          <BottomTab />
          <ModalView />
        </NavigationContainer>
      </SafeAreaView>
    </AudioProvider>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default App;
