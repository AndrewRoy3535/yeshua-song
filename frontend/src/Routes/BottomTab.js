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
    updateState({ ...context, modalVisible: !modalVisible });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarActiveBackgroundColor: "#688b69",
        tabBarActiveTintColor: "#688b69",
        tabBarActiveBackgroundColor: "#b5d3a3",
        tabBarStyle: { backgroundColor: "#688b69" },
        headerRight: () => (
          <TouchableOpacity onPress={setModalVisible}>
            <AntDesign
              name='infocirlceo'
              size={21}
              style={{ marginRight: 20 }}
              color='#000'
            />
          </TouchableOpacity>
        ),
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          // headerTintColor: "#b5d3a3",
          headerStyle: {
            backgroundColor: "#b5d3a3",
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name='home' color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name='Music'
        component={Song}
        options={{
          headerStyle: {
            backgroundColor: "#b5d3a3",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name='md-musical-notes-outline' color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
