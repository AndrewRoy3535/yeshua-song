import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Modal } from "react-native";
import Home from "../screens/Home";
import Song from "../screens/Song";
import { AntDesign, Ionicons } from "@expo/vector-icons";

function BottomTab({ modalVisible, setModalVisible }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#008577",
        headerRight: () => (
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
