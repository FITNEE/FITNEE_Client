import AppLoading from 'expo-app-loading';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import OnBoardingNav from './navigation/OnBoardingNav';
import MyPageNav from './navigators/MyPageNav';
import LoggedInNav from './navigation/LoggedInNav';
import { Context, ContextProvider } from './components/ContextProvider';
import { useState } from 'react';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f3f3f3',
  },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const onFinish = () => setLoading(false);
  const preload = async () => {
    // const { loggedIn, setLoggedIn } = useContext(Context);
    // return loggedIn;
  };
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f3f3f3',
    },
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
    <ContextProvider>
      <NavigationContainer theme={MyTheme}>
        <MyPageNav />
      </NavigationContainer>
    </ContextProvider>
  );
}
