import * as React from "react";
import { Platform, StyleSheet, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Song from "./src/screens/Song";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const App = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Title" subtitle={"Subtitle"} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen name="Home" component={Home} />
          <HomeStack.Screen name="Song" component={Song} />
        </HomeStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
