import CreateRoutineNav from './navigators/CreateRoutineNav';
import OnBoarding_1 from './OnBoarding_1';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import OnBoardingNav from './navigation/OnBoardingNav';
import LoggedInNav from './navigation/LoggedInNav';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f3f3f3',
  },
};

export default function App() {
  let [loggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer theme={MyTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {loggedIn ? <LoggedInNav /> : <OnBoardingNav />}
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
