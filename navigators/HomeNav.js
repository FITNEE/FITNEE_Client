import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Test from "../screens/MyRoutine/Test";

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Test" component={Test} /> */}
    </Stack.Navigator>
  );
}
