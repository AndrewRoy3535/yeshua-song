import * as React from "react";
import { Platform, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Appbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Song from "./src/screens/Song";
import BottomTab from "./src/Routes/BottomTab";
import ModalView from "./src/components/Modal/ModalView";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const App = () => {
  const HomeStack = createNativeStackNavigator();
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavigationContainer>
        <ModalView
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <BottomTab
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </NavigationContainer>
    </SafeAreaView>
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//  import 'react-native-gesture-handler';
//  import React from 'react';
// //  import AppNavContainer from './src/navigations';
// //  import GlobalProvider from './src/context/Provider';

//  const App = () => {
//    return (
//      <GlobalProvider>
//        <AppNavContainer />
//      </GlobalProvider>
//    );
//  };

//  export default App;
