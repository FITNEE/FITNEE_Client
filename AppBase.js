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
import axios from 'axios'

SplashScreen.preventAutoHideAsync()

export default function AppBase() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState)
  const setIsDark = useSetRecoilState(IsDarkAtom)

  const checkTokenValid = async () => {
    let url = 'https://gpthealth.shop/'
    let detailAPI = 'app/user/check'
    const response = await axios.post(url + detailAPI)
    return response.data
  }
  useEffect(() => {
    async function prepare() {
      try {
        //recoil쪽으로 accessToken 저장 -> 추후 로그인 절차에서 분기하는 데에 사용
        AsyncStorage.getItem('accessToken').then((accessToken) => {
          console.log(accessToken)
          if (accessToken) {
            console.log('accessToken있음')
            checkTokenValid().then((result) => {
              if (result.code == 1000) {
                //현재 기기에 저장되어있는 토큰값이 유효한 토큰이다
                setLoggedIn(true) // 자동으로 로그인
              }
            })
          }
          console.log('accesstoken없음')
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
