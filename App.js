import CreateRoutineNav from "./navigation/CreateRoutineNav";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import MyPageNav from "./navigators/MyPageNav";
import OnBoardingNav from "./navigators/OnBoardingNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { AppContext } from "./components/ContextProvider";
import { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const onFinish = () => setLoading(false);

  const toggleLogin = () => {
    setLoggedIn(!loggedIn);
    console.log(loggedIn);
  };

  const preload = async () => {
    // const token = await AsyncStorage.getItem("token");
    // if (token) {
    // setLoggedIn(true);
    // }
  };

  // if (loading) {
  //   return (
  //     <AppLoading
  //       startAsync={preload}
  //       onError={console.warn}
  //       onFinish={onFinish}
  //     />
  //   );
  // }

  const [isDark, setIsDark] = useState(false);

  return (
    <AppContext.Provider
      value={{ isDark, setIsDark, toggleLogin, loggedIn, setToken, token }}
    >
      <NavigationContainer>
        {loggedIn ? <LoggedInNav /> : <OnBoardingNav />}
      </NavigationContainer>
    </AppContext.Provider>
  );
}
