import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Please select a song from Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmptyScreen;
