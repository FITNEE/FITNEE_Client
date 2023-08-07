import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage from "../screens/MyPage/MyPage";
import Setting from "../screens/MyPage/Setting";
import UserInfo from "../screens/MyPage/UserInfo";
import EditUserInfo from "../screens/MyPage/EditUserInfo";
import { Image, Text, TouchableOpacity } from "react-native";
import Back from "../assets/left_arrow.png";
import LoggedInNav from "./LoggedInNav";
import Login from "../screens/OnBoarding/Login";
import EditPW from "../screens/MyPage/EditPW";

const Stack = createStackNavigator();

export default function MyPageNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={({ navigation }) => ({
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 24,
                  backgroundColor: "pink",
                }}
              ></Image>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={({ navigation }) => ({
          headerTitle: "앱 설정",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Back}
                style={{ width: 24, height: 24, marginLeft: 24 }}
              ></Image>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={({ navigation }) => ({
          headerTitle: "계정 정보",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Back}
                style={{ width: 24, height: 24, marginLeft: 24 }}
              ></Image>
            </TouchableOpacity>
          ),
          headerRight: false,
        })}
      />
      <Stack.Screen
        name="EditUserInfo"
        component={EditUserInfo}
        options={({ navigation }) => ({
          animationEnabled: false,
          headerTitle: "닉네임 변경",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Back}
                style={{ width: 24, height: 24, marginLeft: 24 }}
              ></Image>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EditPW"
        component={EditPW}
        options={({ navigation }) => ({
          headerTitle: "비밀번호 수정",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Back}
                style={{ width: 24, height: 24, marginLeft: 24 }}
              ></Image>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
