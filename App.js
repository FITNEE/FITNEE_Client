import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import MyPageNav from "./navigators/MyPageNav";
import { NavigationContainer } from "@react-navigation/native";
import { Appearance } from "react-native";
import { EventRegister } from "react-native-event-listeners";

export default function App() {

  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //  const listener = EventRegister.addEventListener('Change Theme', (data) => {
  //    setDarkMode(data)
  //    console.log(data)
  //  })
  //  return () => {
  //    EventRegister.removeAllListeners(listener)
  //  }
  // }, [darkMode])
  
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/icon.png"),
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <NavigationContainer>
      <MyPageNav />
    </NavigationContainer>
  );
}