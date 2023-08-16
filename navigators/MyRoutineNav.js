import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyRoutine from "../screens/MyRoutine/MyRoutine";
import ExerciseSearch from "../screens/MyRoutine/ExerciseSearch";
import { Test } from "../screens/MyRoutine/Test";

const Stack = createStackNavigator();

export default function MyRoutineNav() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerBackTitleVisible: false }}
    >
      {/* <Stack.Screen name="Test" component={Test} /> */}

      <Stack.Screen name="MyRoutine" component={MyRoutine} />
      <Stack.Screen name="ExerciseSearch" component={ExerciseSearch} />
    </Stack.Navigator>
  );
}
