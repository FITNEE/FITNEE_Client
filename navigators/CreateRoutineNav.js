import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigationState } from '@react-navigation/native'
import CreateRoutine_1 from '../screens/CreateRoutine/CreateRoutine_1'
import CreateRoutine_2 from '../screens/CreateRoutine/CreateRoutine_2'
import CreateRoutine_3 from '../screens/CreateRoutine/CreateRoutine_3'
import CreateRoutine_4 from '../screens/CreateRoutine/CreateRoutine_4'
import CreateRoutine_5 from '../screens/CreateRoutine/CreateRoutine_5'
import CreateRoutineHeader from '../components/CreateRoutine/CreateRoutineHeader'
import styled from 'styled-components/native'
import HomeNav from './HomeNav'
import { colors } from '../colors'

const Stack = createStackNavigator()

export default function CreateRoutineNav() {
  // const index = useNavigationState((state) => state.index);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        // animation: fade,
        // headerStyle: {
        //   backgroundColor: "#f3f3f3", // 배경 색상을 원하는 색상 값으로 변경해주세요, 예를 들어: '#f4511e'
        // },
        animationEnabled: false,
        // presentation: "transparentModal",
        // headerMode: "screen",
        // title: "루틴 등록",
      }}
    >
      <Stack.Screen
        name="CreateRoutine_1"
        options={{
          headerShown: true,
        }}
        component={CreateRoutine_1}
      />
      <Stack.Screen name="CreateRoutine_2" component={CreateRoutine_2} />
      <Stack.Screen name="CreateRoutine_3" component={CreateRoutine_3} />
      <Stack.Screen name="CreateRoutine_4" component={CreateRoutine_4} />
      <Stack.Screen name="CreateRoutine_5" options={{ headerShown: false }} component={CreateRoutine_5} />
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeNav}
      />
    </Stack.Navigator>
  )
}

const StackBar = styled.View`
  width: 90%;
  height: 10px;
  background-color: #dddddd;

  border-radius: 10px;
`
const StackBarPin1 = styled.View`
  width: 25%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`
const StackBarPin2 = styled.View`
  width: 50%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`
const StackBarPin3 = styled.View`
  width: 75%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`
const StackBarPin4 = styled.View`
  width: 100%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`
