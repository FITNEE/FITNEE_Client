import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage from "../screens/MyPage";
import Setting from "../screens/Setting";
import UserInfo from "../screens/UserInfo";
import EditUserInfo from "../screens/EditUserInfo";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator screenOptions={{
      //headerShown: false
    }}>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen options={{animationEnabled: false}} name="EditUserInfo" component={EditUserInfo} />
    </Stack.Navigator>
  );
}