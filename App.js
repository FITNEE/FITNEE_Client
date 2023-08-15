/* eslint-disable */
import AppLoading from "expo-app-loading";

import OnBoardingNav from "./navigators/OnBoardingNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { loggedInState } from "./recoil/AuthAtom";
import AppBase from "./AppBase";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <AppBase />
      </NavigationContainer>
    </RecoilRoot>
  );
}
