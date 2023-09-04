import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CreateAccount_1 from '../screens/CreateAccount/CreateAccount_1'
import CreateAccount_2 from '../screens/CreateAccount/CreateAccount_2'
import CreateAccount_3 from '../screens/CreateAccount/CreateAccount_3'
import OnBoarding from '../screens/OnBoarding/OnBoarding'
import CreateAccount_4 from '../screens/CreateAccount/CreateAccount_4'
import Login from '../screens/OnBoarding/Login'
import Terms_1 from '../screens/Terms/Terms_1'
import Terms_2 from '../screens/Terms/Terms_2'

const Stack = createStackNavigator()

export default function OnBoardingNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="CreateAccount_1" component={CreateAccount_1} />
      <Stack.Screen name="CreateAccount_2" component={CreateAccount_2} />
      <Stack.Screen name="CreateAccount_3" component={CreateAccount_3} />
      <Stack.Screen name="CreateAccount_4" options={{ gestureEnabled: false }} component={CreateAccount_4} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Terms_1" component={Terms_1} />
      <Stack.Screen name="Terms_2" component={Terms_2} />
    </Stack.Navigator>
  )
}
