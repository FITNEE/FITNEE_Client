import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateRoutine_1 from "../screens/CreateRoutine_1";
import CreateRoutine_2 from "../screens/CreateRoutine_2";

const Stack = createStackNavigator();

export default function CreateRoutineNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 16,
        },
        title: "루틴 등록",
        statusBarAnimation: "slide",
      }}
    >
      <Stack.Screen name="CreateRoutine_1" component={CreateRoutine_1} />
      <Stack.Screen name="CreateRoutine_2" component={CreateRoutine_2} />
    </Stack.Navigator>
  );
}
