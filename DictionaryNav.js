import React from 'react'
import { createStackNavigator  } from '@react-navigation/stack'
import DictionarySearch from './DictionarySearch'
import DictionaryDetail from './DictionaryDetail'
import DictionaryList from './DictionaryList'

const Stack = createStackNavigator()

export default function DictionaryNav(){

    return(
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerShown: false}}>
            <Stack.Screen name='Detail' component={DictionaryDetail}/>
            <Stack.Screen name='List' component={DictionaryList}/>
            <Stack.Screen name='Search' component={DictionarySearch}/>
            
            

        </Stack.Navigator>
    )
}