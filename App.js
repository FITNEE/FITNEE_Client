/* eslint-disable */
import AppLoading from "expo-app-loading";

import OnBoardingNav from "./navigators/OnBoardingNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { AppContext } from "./components/ContextProvider";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { RecoilRoot, useRecoilValue } from "recoil";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f3f3f3",
  },
};

export default function App() {
  /*
  const [DarkMode, setDarkMode] = useState(true);
  const theme = {
    dark: DarkMode,
    colors: {
      primary: DarkMode ? "white" : "black",
      background: DarkMode ? colors.grey_9 : colors.white,
      text: DarkMode ? colors.white : colors.black,
    },
  };
  */

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const onFinish = () => setLoading(false);

  const toggleLogin = () => {
    if (loggedIn) {
      AsyncStorage.removeItem("userId");
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  };

  const preload = async () => {
    await AsyncStorage.getItem("userId").then((userId) => {
      console.log(userId);
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

  return (
    <RecoilRoot>
      <AppContext.Provider
        value={{
          toggleLogin,
          loggedIn,
          setToken,
          token,
        }}
      >
        <NavigationContainer>
          {loggedIn ? <LoggedInNav /> : <OnBoardingNav />}
        </NavigationContainer>
      </AppContext.Provider>
    </RecoilRoot>
  );
}
