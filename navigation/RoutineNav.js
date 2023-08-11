import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateRoutine_5 from "../screens/CreateRoutine_5";

const Stack = createStackNavigator();

export default function RoutineNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="CreateRoutine_5" component={CreateRoutine_5} />
    </Stack.Navigator>
  );
}
