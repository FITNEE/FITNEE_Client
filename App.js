/* eslint-disable */
import AppLoading from "expo-app-loading";

import OnBoardingNav from "./navigators/OnBoardingNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { AppContext } from "./components/ContextProvider";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { RecoilRoot, useRecoilValue } from "recoil";

// 운동사전 Toast Message에 사용
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import styled from 'styled-components/native'
import { colors } from "./colors"
import CheckIcon from './assets/SVGs/Check.svg'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f3f3f3",
  },
};

export default function App() {
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
        <Toast config={toastConfig}/>
      </AppContext.Provider>
    </RecoilRoot>
  );
}

const ToastBG = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    width: 327px;
    border-radius: 12px;
    padding: 12px 16px; 
`
const ToastText = styled.Text`
    color: ${colors.white};
    font-size: 13px;
    font-weight: 600;
`
const toastConfig = {
    customToast: ({ text1, props }) => (
        <ToastBG style={{backgroundColor: props.isDark? `${colors.grey_7}`: `${colors.grey_9}`}}>
            <ToastText>{text1}</ToastText>
            <CheckIcon
                width={24}
                height={24}
                color={props.isDark? `${colors.grey_7}`: `${colors.white}`}
            />
        </ToastBG>
    )
}