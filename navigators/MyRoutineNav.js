import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyRoutine from "../screens/MyRoutine/MyRoutine";
import ExerciseSearch from "../screens/MyRoutine/ExerciseSearch";
// import Test from "../screens/MyRoutine/Test";
import RoutineCustom from "../screens/MyRoutine/RoutineCustom";
import { Text, TouchableOpacity } from "react-native";
import { goToCustomMode } from "../components/myRoutine/Functions";
import MyRoutine_Temp from "../screens/MyRoutine/MyRoutine_Temp";

const Stack = createStackNavigator();

export default function MyRoutineNav() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerBackTitleVisible: false }}
    >
      {/* <Stack.Screen name="MyRoutine_Temp" component={MyRoutine_Temp} />
      <Stack.Screen name="RoutineCustom" component={RoutineCustom} /> */}
      <Stack.Screen name="MyRoutine" component={MyRoutine} />
      <Stack.Screen name="ExerciseSearch" component={ExerciseSearch} />
    </Stack.Navigator>
  );
}
