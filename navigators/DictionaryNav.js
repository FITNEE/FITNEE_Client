import React from 'react'
import { createStackNavigator  } from '@react-navigation/stack'
import Dictionary_1 from '../screens/Dictionary/Dictionary_1'
import Dictionary_2 from '../screens/Dictionary/Dictionary_2'
import Dictionary_3 from '../screens/Dictionary/Dictionary_3'
import MyRoutineNav from './MyRoutineNav'

const Stack = createStackNavigator()

export default function DictionaryNav(){

    return(
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerShown: false}}>
            <Stack.Screen name='Dictionary_1' component={Dictionary_1}/>
            {/* <Stack.Screen name='Dictionary_2' component={Dictionary_2}/> */}
            <Stack.Screen name='Dictionary_3' component={Dictionary_3}/>
            <Stack.Screen name='MyRoutineNav' component={MyRoutineNav}/>
        </Stack.Navigator>
    )
}
