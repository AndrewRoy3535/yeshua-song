import * as React from "react";
import { Platform, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./src/Routes/BottomTab";
import ModalView from "./src/components/Modal/ModalView";
import AudioProvider from "./src/context/AudioProvider";

const App = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <AudioProvider>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <NavigationContainer>
          <BottomTab
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <ModalView
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
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
