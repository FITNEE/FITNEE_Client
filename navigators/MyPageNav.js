import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyPage from '../screens/MyPage/MyPage'
import Setting from '../screens/MyPage/Setting'
import UserInfo from '../screens/MyPage/UserInfo'
import EditUserInfo from '../screens/MyPage/EditUserInfo'
import InAppPurchase from '../screens/MyPage/InAppPurchase'
import { Image, Text, TouchableOpacity } from 'react-native'
import LoggedInNav from './LoggedInNav'
import Login from '../screens/OnBoarding/Login'
import EditPW from '../screens/MyPage/EditPW'
import SettingIcon from '../assets/SVGs/Setting.svg'
import CloseIcon from '../assets/SVGs/Close.svg'
import Left from '../assets/SVGs/Left.svg'
import { colors } from '../colors'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../recoil/MyPageAtom'
import CreateRoutineNav from './CreateRoutineNav'
import TermsOfService from '../screens/MyPage/TermsOfService'
import PrivacyPolicy from '../screens/MyPage/PrivacyPolicy'
import { withIAPContext } from "react-native-iap";

const Stack = createStackNavigator()

export default function MyPageNav() {
  const isDark = useRecoilValue(IsDarkAtom)

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Pretendard-SemiBold',
          fontSize: 17,
          lineHeight: 25.5,
        },
        headerStyle: { backgroundColor: isDark ? colors.grey_9 : colors.white },
        headerTintColor: isDark ? colors.white : colors.black,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={({ navigation }) => ({
          headerTitle: '',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <SettingIcon
                style={{ marginRight: 24 }}
                width={24}
                height={24}
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
          headerTitle: '앱 설정',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Left style={{ marginLeft: 24 }} width={24} height={24} color={isDark ? colors.white : colors.black} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={({ navigation }) => ({
          headerTitle: '계정 정보',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Left style={{ marginLeft: 24 }} width={24} height={24} color={isDark ? colors.white : colors.black} />
            </TouchableOpacity>
          ),
          headerRight: false,
        })}
      />
      <Stack.Screen
        name="InAppPurchase"
        component={withIAPContext(InAppPurchase)}
        options={({ navigation }) => ({
          headerStyle: {backgroundColor: colors.grey_1},
          headerTitle: '',
          headerLeft: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
              <CloseIcon
                style={{ marginRight: 24 }}
                width={24}
                height={24}
                color={isDark ? colors.white : colors.black}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EditUserInfo"
        component={EditUserInfo}
        options={({ navigation }) => ({
          animationEnabled: false,
          headerTitle: '닉네임 변경',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Left style={{ marginLeft: 24 }} width={24} height={24} color={isDark ? colors.white : colors.black} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EditPW"
        component={EditPW}
        options={({ navigation }) => ({
          headerTitle: '비밀번호 수정',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Left style={{ marginLeft: 24 }} width={24} height={24} color={isDark ? colors.white : colors.black} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({ navigation }) => ({
          headerTitle: '개인정보 처리방침',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Left style={{ marginLeft: 24 }} width={24} height={24} color={isDark ? colors.white : colors.black} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={({ navigation }) => ({
          headerTitle: '서비스 이용약관',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Left style={{ marginLeft: 24 }} width={24} height={24} color={isDark ? colors.white : colors.black} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CreateRoutineNav"
        component={CreateRoutineNav}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}
