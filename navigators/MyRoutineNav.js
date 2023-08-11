import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyRoutine from "../screens/MyRoutine/MyRoutine";

const Stack = createStackNavigator();

export default function MyRoutineNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="MyRoutine" component={MyRoutine} />
    </Stack.Navigator>
  );
}
