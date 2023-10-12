import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import { useEffect } from 'react'
import AppBase from './AppBase'
import { Alert } from 'react-native'
import { LogBox } from 'react-native'
import messaging from '@react-native-firebase/messaging'
// 운동사전 Toast Message에 사용
import Toast from 'react-native-toast-message'
import styled from 'styled-components/native'
import { colors } from './colors'
import CheckIcon from './assets/SVGs/Check.svg'
LogBox.ignoreAllLogs()
export default function App() {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
       Alert.alert('NEW MESSAGE!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <AppBase />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </RecoilRoot>
  )
}

const ToastBG = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  width: 327px;
  border-radius: 12px;
  padding: 12px 16px;
`
const ToastText = styled.Text`
  color: ${colors.white};
  font-size: 13px;
  font-weight: 600;
  line-height: 19.5px;
  font-family: Pretendard-SemiBold;
`
const toastConfig = {
  customToast: ({ text1, props }) => (
    <ToastBG
      style={{
        backgroundColor: props.isDark ? `${colors.grey_7}` : `${colors.grey_9}`,
      }}
    >
      <ToastText>{text1}</ToastText>
      <CheckIcon width={24} height={24} color={props.isDark ? `${colors.grey_7}` : `${colors.white}`} />
    </ToastBG>
  ),
}
