import React, { useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from "react-native";
import { AudioContext } from "../../context/AudioProvider";
import { Entypo } from "@expo/vector-icons";

const ModalView = () => {
  const context = useContext(AudioContext);

  const { modalVisible, updateState } = context;

  const setModalVisible = () => {
    updateState({ ...context, modalVisible: !modalVisible });
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
            <Text style={styles.aboutText}>Songs of Psalms</Text>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../assets/appInfo.jpg")}
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 5,
                }}
              />
              <Text style={{ fontSize: 11 }}>Version: 1.0</Text>
              <Text>Contact info & social media </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "45%",
                  justifyContent: "space-evenly",
                  padding: 5,
                }}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    Linking.openURL("https://www.isaechurchbd.org/contact-us/")
                  }>
                  <Image
                    source={require("../../../assets/ICB.jpg")}
                    style={{ height: 29, width: 29, borderRadius: 100 }}
                  />
                </TouchableWithoutFeedback>
                <Entypo
                  name='facebook-with-circle'
                  size={29}
                  color='white'
                  onPress={() =>
                    Linking.openURL("https://www.facebook.com/isaechurchbd.org")
                  }
                />
                <Entypo
                  name='youtube-with-circle'
                  size={29}
                  color='white'
                  onPress={() =>
                    Linking.openURL(
                      "https://www.youtube.com/channel/UC416b0EMJokuN3dxPG5WfDg"
                    )
                  }
                />
              </View>
            </View>
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
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    marginBottom: 7,
  },
  aboutContainer: {
    backgroundColor: "#688b69",
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
