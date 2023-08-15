/* eslint-disable */
import AppLoading from "expo-app-loading";

import OnBoardingNav from "./navigators/OnBoardingNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { loggedInState } from "./recoil/AuthAtom";

export default function AppBase() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  const onFinish = () => setLoading(false);

  // const toggleLogin = () => {
  //   if (loggedIn) {
  //     AsyncStorage.removeItem("userId");
  //     setLoggedIn(false);
  //   } else {
  //     setLoggedIn(true);
  //   }
  // };

  const preload = async () => {
    await AsyncStorage.getItem("userId").then((userId) => {
      if (userId) {
        setLoggedIn(true);
      }
    });
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

  return <>{loggedIn ? <LoggedInNav /> : <OnBoardingNav />}</>;
}
