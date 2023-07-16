import AppLoading from 'expo-app-loading';
import React, {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {Asset} from "expo-asset";
import * as Font from "expo-font";
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import ExerciseCourseNav from './navigators/ExerciseCourseNav';

export default function App() {
  const [loading, setloading] = useState(true);
  const onFinish = () => setloading(false);
  const preload = () => {
    const fontToLoad = [Ionicons.font];
    const fontPromise = fontToLoad.map(font => FontFace.loadAsync(font));
    const imagesToLoad = [
      require("./assets/icon.png"),
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromise, ...imagePromises]);
  };
  if(loading) {
    return <
      AppLoading startAsync={preload} 
      onError={console.warn} 
      onFinish={onFinish} 
      />;
  } 
  
  return( 
        <NavigationContainer>
          <ExerciseCourseNav/>
        </NavigationContainer>
  );
}
