import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import startExercise from '../screens/ExerciseCourseScreens/startExercise';
import CreateRoutine_1 from '../screens/CreateRoutine_1';
import ExerciseCourseNav from './ExerciseCourseNav';
import CreateRoutineNav from '../navigation/CreateRoutineNav';

const Stack = createStackNavigator();

export default function HomeNav() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				headerBackTitleVisible: false,
			}}
		>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='ExerciseCourse' component={ExerciseCourseNav} />
			<Stack.Screen name='createRoutine' component={CreateRoutineNav} />
		</Stack.Navigator>
	);
}
