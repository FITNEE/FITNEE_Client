import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import CreateRoutineNav from "./CreateRoutineNav";
import ExerciseCourseNav from "./ExerciseCourseNav";

import { IsDarkAtom } from "../recoil/MyPageAtom";
import { useRecoilValue } from "recoil";
import { colors } from "../colors";
import Dictionary_2 from "../screens/Dictionary/Dictionary_2";

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
      <Stack.Screen name="Dictionary_2" component={Dictionary_2} />
    </Stack.Navigator>
  );
}
