import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import registerRoutine from "../ExerciseCourseScreens/registerRoutine";
import startExercise from "../ExerciseCourseScreens/startExercise";
import exerciseCourse from "../ExerciseCourseScreens/exerciseCourse";


const Stack = createStackNavigator();

export default function ExerciseCourseNav() {
    return (
        <Stack.Navigator
            screenOptions={{
            headerBackTitleVisible: false,
            headerShown: false,
            }}
        >
            <Stack.Screen name="registerRoutine" component={registerRoutine}/>
            <Stack.Screen name="startExercise" component={startExercise}/>
            <Stack.Screen name="exerciseCourse" component={exerciseCourse}/>

        </Stack.Navigator> 
    );
        }