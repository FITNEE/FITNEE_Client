/* eslint-disable */
import AppLoading from "expo-app-loading";
import OnBoardingNav from "./navigators/OnBoardingNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";
import { loggedInState } from "./recoil/AuthAtom";

export default function AppBase() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  const onFinish = () => setLoading(false);

  const preload = async () => {
    await AsyncStorage.getItem("accessToken").then((accessToken) => {
      if (accessToken) {
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
