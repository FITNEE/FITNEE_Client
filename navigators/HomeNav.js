import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import CreateRoutineNav from "../navigation/CreateRoutineNav";
import ExerciseCourseNav from "./ExerciseCourseNav";
import Dictionary_3 from "../screens/Dictionary/Dictionary_3";
import { IsDarkAtom } from "../recoil/MyPageAtom";
import { useRecoilValue } from "recoil";
import { colors } from "../colors";
const Stack = createStackNavigator();

export default function HomeNav() {
  const isDark = useRecoilValue(IsDarkAtom);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        backgroundColor: isDark ? colors.grey_9 : colors.white,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ExerciseCourse" component={ExerciseCourseNav} />
      <Stack.Screen name="createRoutine" component={CreateRoutineNav} />
      <Stack.Screen name="Dictionary_3" component={Dictionary_3} />
    </Stack.Navigator>
  );
}
