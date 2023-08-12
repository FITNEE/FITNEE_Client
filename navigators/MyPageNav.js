import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage from "../screens/MyPage/MyPage";
import Setting from "../screens/MyPage/Setting";
import UserInfo from "../screens/MyPage/UserInfo";
import EditUserInfo from "../screens/MyPage/EditUserInfo";
import { Image, Text, TouchableOpacity } from "react-native";
import LoggedInNav from "./LoggedInNav";
import Login from "../screens/OnBoarding/Login";
import EditPW from "../screens/MyPage/EditPW";
import { WithLocalSvg } from "react-native-svg";
import SettingIcon from "../assets/SVGs/Setting.svg";
import Left from "../assets/SVGs/Left.svg";
import { colors } from "../colors";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../recoil/MyPageAtom";

const Stack = createStackNavigator();

export default function MyPageNav() {
  const isDark = useRecoilValue(IsDarkAtom);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: isDark ? colors.grey_9 : colors.white },
        headerTintColor: isDark ? colors.white : colors.black,
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
              <WithLocalSvg
                style={{ marginRight: 24 }}
                width={24}
                height={24}
                asset={SettingIcon}
                color={isDark ? colors.white : colors.black}
              />
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
              <WithLocalSvg
                style={{ marginLeft: 24 }}
                width={24}
                height={24}
                asset={Left}
                color={isDark ? colors.white : colors.black}
              />
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
              <WithLocalSvg
                style={{ marginLeft: 24 }}
                width={24}
                height={24}
                asset={Left}
                color={isDark ? colors.white : colors.black}
              />
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
              <WithLocalSvg
                style={{ marginLeft: 24 }}
                width={24}
                height={24}
                asset={Left}
                color={isDark ? colors.white : colors.black}
              />
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
              <WithLocalSvg
                style={{ marginLeft: 24 }}
                width={24}
                height={24}
                asset={Left}
                color={isDark ? colors.white : colors.black}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
