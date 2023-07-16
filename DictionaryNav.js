import React from 'react'
import { createStackNavigator  } from '@react-navigation/stack'
import Dictionary from './Dictionary'
import DictionaryDetail from './DictionaryDetail'

const Stack = createStackNavigator()

export default function DictionaryNav(){

    return(
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerShown: false}}>
            <Stack.Screen name='Detail' component={DictionaryDetail}/>
            <Stack.Screen name='Dictionary' component={Dictionary}/>
            {/* <Stack.Screen name='Detail' component={DictionaryDetail}/> */}
        </Stack.Navigator>
    )
}