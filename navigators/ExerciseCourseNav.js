import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RegisterRoutine from '../screens/ExerciseCourse/RegisterRoutine'
import CompleteExercise from '../screens/ExerciseCourse/CompleteExercise'
import ExerciseResult from '../screens/ExerciseCourse/ExerciseResult'
import ExerciseCourse_1 from '../screens/ExerciseCourse/ExerciseCourse_1'
import ExerciseCourse_2 from '../screens/ExerciseCourse/ExerciseCourse_2'
import ExerciseCourse from '../screens/ExerciseCourse/ExerciseCourse'
import StartExercise from '../screens/ExerciseCourse/StartExercise'
import MyRoutineNav from './MyRoutineNav'
import CreateRoutineNav from './CreateRoutineNav'
import HomeNav from './HomeNav'
import NoRoutine from '../components/exerciseCourse/NoRoutine'

const Stack = createStackNavigator()

export default function ExerciseCourseNav() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="StartExercise"
                component={StartExercise}
                options={{
                    // 화면 전환 애니메이션 없음
                    transitionSpec: {
                        open: { animation: 'timing', config: { duration: 0 } },
                        close: { animation: 'timing', config: { duration: 0 } },
                    },
                }}
            />
            <Stack.Screen
                name="RegisterRoutine"
                component={RegisterRoutine}
                options={{
                    // 화면 전환 애니메이션 없음
                    transitionSpec: {
                        open: { animation: 'timing', config: { duration: 0 } },
                        close: { animation: 'timing', config: { duration: 0 } },
                    },
                }}
            />

            <Stack.Screen name="CreateRoutineNav" component={CreateRoutineNav} />
            <Stack.Screen name="ExerciseCourse" component={ExerciseCourse} />
            <Stack.Screen name="CompleteExercise" component={CompleteExercise} />
            <Stack.Screen name="ExerciseResult" component={ExerciseResult} />
            <Stack.Screen name="HomeNav" component={HomeNav} />
            <Stack.Screen
                name="ExerciseCourse_1"
                component={ExerciseCourse_1}
                options={{
                    // 화면 전환 애니메이션 없음
                    transitionSpec: {
                        open: { animation: 'timing', config: { duration: 0.5 } },
                        close: { animation: 'timing', config: { duration: 0 } },
                    },
                }}
            />
            <Stack.Screen name="ExerciseCourse_2" component={ExerciseCourse_2} />
        </Stack.Navigator>
    )
}
