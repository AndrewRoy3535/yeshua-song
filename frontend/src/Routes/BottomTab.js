import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Modal } from "react-native";
import Home from "../screens/Home";
import Song from "../screens/Song";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AudioContext } from "../context/AudioProvider";

function BottomTab() {
  const Tab = createBottomTabNavigator();

  const context = useContext(AudioContext);

  const { modalVisible, updateState } = context;

  const setModalVisible = () => {
    updateState(context, { modalVisible: !modalVisible });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#008577",
        headerRight: () => (
          <TouchableOpacity onPress={setModalVisible}>
            <AntDesign
              name='infocirlceo'
              size={21}
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name='home' color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name='Music'
        component={Song}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='md-musical-notes-outline' color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
