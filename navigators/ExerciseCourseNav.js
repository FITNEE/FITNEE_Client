import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import registerRoutine from '../screens/ExerciseCourseScreens/registerRoutine';
import startExercise from '../screens/ExerciseCourseScreens/startExercise';
import exerciseCourse from '../screens/ExerciseCourseScreens/exerciseCourse';
import completeExercise from '../screens/ExerciseCourseScreens/completeExercise';
import exerciseResult from '../screens/ExerciseCourseScreens/exerciseResult';
import exerciseCourse_1 from '../screens/ExerciseCourseScreens/exerciseCourse_1';
import exerciseCourse_2 from '../screens/ExerciseCourseScreens/exerciseCourse_2';

const Stack = createStackNavigator();

export default function ExerciseCourseNav() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerBackTitleVisible: false,
				headerShown: false,
			}}
		>
			<Stack.Screen name='registerRoutine' component={registerRoutine} />
			<Stack.Screen name='startExercise' component={startExercise} />
			<Stack.Screen name='exerciseCourse' component={exerciseCourse} />
			<Stack.Screen name='completeExercise' component={completeExercise} />
			<Stack.Screen name='exerciseResult' component={exerciseResult} />
			<Stack.Screen name='exerciseCourse_1' component={exerciseCourse_1} />
			<Stack.Screen name='exerciseCourse_2' component={exerciseCourse_2} />
		</Stack.Navigator>
	);
}
