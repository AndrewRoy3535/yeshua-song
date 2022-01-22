import React, { useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { AudioContext } from "../../context/AudioProvider";

const ModalView = () => {
  const context = useContext(AudioContext);

  const { modalVisible, updateState } = context;

  const setModalVisible = () => {
    updateState(context, { modalVisible: !modalVisible });
  };

  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible;
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>App info</Text>
            <Text>lorem sdf sdfer derfdsf dsfefsd </Text>
            <Text>lorem sdf sdfer derfdsf dsfefsd </Text>
            <Text>lorem sdf sdfer derfdsf dsfefsd </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={setModalVisible}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 195,
    padding: 15,
    zIndex: 1,
  },
  aboutText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  aboutContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});

export default ModalView;
