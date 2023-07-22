import AppLoading from 'expo-app-loading';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import OnBoardingNav from './navigation/OnBoardingNav';
import LoggedInNav from './navigation/LoggedInNav';
import { Context, ContextProvider } from './components/ContextProvider';
import { useState } from 'react';
import ExerciseCourseNav from './navigation/ExerciseCourseNav';

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
        {/* {loggedIn ? <LoggedInNav /> : <OnBoardingNav />} */}
        {loggedIn ? <LoggedInNav /> : <ExerciseCourseNav />}
      </NavigationContainer>
    </ContextProvider>
  );
}
