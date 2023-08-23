/* eslint-disable */
import OnBoardingNav from './navigators/OnBoardingNav'
import LoggedInNav from './navigators/LoggedInNav'
import { useCallback, useEffect, useState } from 'react'
import * as Font from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { loggedInState } from './recoil/AuthAtom'
import * as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native'
import { IsDarkAtom } from './recoil/MyPageAtom'

SplashScreen.preventAutoHideAsync()

export default function AppBase() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState)
  const setIsDark = useSetRecoilState(IsDarkAtom)

  useEffect(() => {
    async function prepare() {
      try {
        await AsyncStorage.getItem('accessToken').then((accessToken) => {
          if (accessToken) {
            setLoggedIn(true)
            console.log('자동으로 로그인됨')
          }
        })
        await AsyncStorage.getItem('darkMode').then((darkMode) => {
          setIsDark(JSON.parse(darkMode))

        })
        await Font.loadAsync({
          'Pretendard-Light': require('./assets/fonts/Pretendard-Light.otf'),
          'Pretendard-Black': require('./assets/fonts/Pretendard-Black.otf'),
          'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.otf'),
          'Pretendard-ExtraBold': require('./assets/fonts/Pretendard-ExtraBold.otf'),
          'Pretendard-Thin': require('./assets/fonts/Pretendard-Thin.otf'),
          'Pretendard-ExtraLight': require('./assets/fonts/Pretendard-ExtraLight.otf'),
          'Pretendard-SemiBold': require('./assets/fonts/Pretendard-SemiBold.otf'),
          'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.otf'),
          'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.otf'),
        })
        // await new Promise((resolve) => setTimeout(resolve, 3000))
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        console.log('앱 실행위해 필요한 모든 자원 및 준비 완료')
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])
  if (!appIsReady) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {loggedIn ? <LoggedInNav /> : <OnBoardingNav />}
    </View>
  )
}
