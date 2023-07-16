import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding_1 from '../OnBoarding_1';
import OnBoarding_2 from '../OnBoarding_2';
import OnBoarding_3 from '../OnBoarding_3';
import OnBoarding_4 from '../OnBoarding_4';

const Stack = createStackNavigator();

export default function OnBoardingNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name='OnBoarding_1' component={OnBoarding_1} />
      <Stack.Screen name='OnBoarding_2' component={OnBoarding_2} />
      <Stack.Screen name='OnBoarding_3' component={OnBoarding_3} />
      <Stack.Screen name='OnBoarding_4' component={OnBoarding_4} />
    </Stack.Navigator>
  );
}
