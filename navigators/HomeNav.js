import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import CreateRoutineNav from "../navigation/CreateRoutineNav";
import ExerciseCourseNav from "./ExerciseCourseNav";

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
      <Stack.Screen name="ExerciseCourse" component={ExerciseCourseNav} />
      <Stack.Screen name="createRoutine" component={CreateRoutineNav} />
    </Stack.Navigator>
  );
}
