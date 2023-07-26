import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateRoutine_1 from "../screens/CreateRoutine_1";
import CreateRoutine_2 from "../screens/CreateRoutine_2";
import CreateRoutine_3 from "../screens/CreateRoutine_3";
import CreateRoutine_4 from "../screens/CreateRoutine_4";
import CreateRoutine_5 from "../screens/CreateRoutine_5";

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
        headerStyle: {
          backgroundColor: "#f3f3f3", // 배경 색상을 원하는 색상 값으로 변경해주세요, 예를 들어: '#f4511e'
        },
        title: "루틴 등록",
      }}
    >
      <Stack.Screen name="CreateRoutine_1" component={CreateRoutine_1} />
      <Stack.Screen name="CreateRoutine_2" component={CreateRoutine_2} />
      <Stack.Screen name="CreateRoutine_3" component={CreateRoutine_3} />
      <Stack.Screen name="CreateRoutine_4" component={CreateRoutine_4} />
      <Stack.Screen
        name="CreateRoutine_5"
        options={{ headerShown: false }}
        component={CreateRoutine_5}
      />
    </Stack.Navigator>
  );
}
