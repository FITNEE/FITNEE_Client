import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterRoutine from "../screens/ExerciseCourseScreens/RegisterRoutine";
import CompleteExercise from "../screens/ExerciseCourseScreens/CompleteExercise";
import ExerciseResult from "../screens/ExerciseCourseScreens/ExerciseResult";
import ExerciseCourse_1 from "../screens/ExerciseCourseScreens/ExerciseCourse_1";
import ExerciseCourse_2 from "../screens/ExerciseCourseScreens/ExerciseCourse_2";
import ExerciseCourse from "../screens/ExerciseCourseScreens/ExerciseCourse";
import StartExercise from "../screens/ExerciseCourseScreens/StartExercise";

const Stack = createStackNavigator();

export default function ExerciseCourseNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="RegisterRoutine" component={RegisterRoutine} />
      <Stack.Screen name="StartExercise" component={StartExercise} />
      <Stack.Screen name="ExerciseCourse" component={ExerciseCourse} />
      <Stack.Screen name="CompleteExercise" component={CompleteExercise} />
      <Stack.Screen name="ExerciseResult" component={ExerciseResult} />
      <Stack.Screen
        name="ExerciseCourse_1"
        component={ExerciseCourse_1}
        options={{
          // 화면 전환 애니메이션 없음
          transitionSpec: {
            open: { animation: "timing", config: { duration: 0 } },
            close: { animation: "timing", config: { duration: 0 } },
          },
        }}
      />
      <Stack.Screen name="ExerciseCourse_2" component={ExerciseCourse_2} />
    </Stack.Navigator>
  );
}
