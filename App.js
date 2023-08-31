import { NavigationContainer } from '@react-navigation/native'
import { RecoilRoot } from 'recoil'
import AppBase from './AppBase'
import { LogBox } from 'react-native'
// 운동사전 Toast Message에 사용
import Toast from 'react-native-toast-message'
import styled from 'styled-components/native'
import { colors } from './colors'
import CheckIcon from './assets/SVGs/Check.svg'
LogBox.ignoreAllLogs()
export default function App() {
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
const ToastBase = styled.View`
  height: 44px;
  width: 90%;
  border-radius: 12px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;
`;
const SuccessToastText = styled.Text`
  font-size: 13px;
  font-family: Pretendard-SemiBold;
  flex: 1;
`;
const toastConfig = {
  success: ({props}) => (
    <ToastBase
      style={{ backgroundColor: props.isDark ? colors.white : colors.black }}
    >
      <SuccessToastText style={{ color: props.isDark ? colors.black : colors.white }}>
        루틴이 수정되었습니다.
      </SuccessToastText>
      <CheckIcon width={24} height={24} color={props.isDark ? `${colors.grey_7}` : `${colors.white}`} />
    </ToastBase>
  ),

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
