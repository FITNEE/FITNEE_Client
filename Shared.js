import styled from 'styled-components/native'
import { colors } from './colors'
import { ActivityIndicator, Dimensions, Platform, StatusBar } from 'react-native'
import Left from './assets/SVGs/Left.svg'

export const ScreenWidth = Dimensions.get('screen').width
export const ScreenHeight = Dimensions.get('screen').height
//****************** 뒤로가기  *******************************************************/
const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 24px;
  left: 0px;
  width: 48px;
  height: 48px;
`

export const BackButton = ({ onPress, isDark }) => {
  return (
    <BackButtonContainer onPress={onPress}>
      <Left width={24} height={24} color={isDark ? colors.white : colors.black} />
    </BackButtonContainer>
  )
}

//****************** 버튼  *******************************************************/
const MyButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 52px;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  margin-bottom: 64px;
`
const ButtonText = styled.Text`
  font-size: 17px;
  font-family: Pretendard-SemiBold;
`
export const Button = ({ enabled, onPress, text = '확인', isDark, loading = false, mode = 'normal' }) => {
  return (
    <MyButton
      disabled={!enabled}
      onPress={onPress}
      style={[
        enabled
          ? {
              backgroundColor: isDark ? colors.d_main : colors.l_main,
            }
          : { backgroundColor: isDark ? colors.grey_8 : colors.grey_3 },
        // { marginBottom: ScreenWidth > 400 ? 64 : 64 },
        mode == 'absolute' && {
          width: ScreenWidth - 48,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isDark ? colors.grey_3 : colors.grey_7} />
      ) : (
        <ButtonText
          style={
            enabled ? { color: isDark ? colors.black : colors.white } : { color: isDark ? colors.white : colors.grey_7 }
          }
        >
          {text}
        </ButtonText>
      )}
    </MyButton>
  )
}

export const iOSBoxShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.12, // Shadow opacity (0 to 1)
  shadowRadius: 6, // Shadow radius in points
}
//****************** 버튼  *******************************************************/

export const ScreenContainer = styled.SafeAreaView`
  /* padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px; */
  flex: 1;
  width: 100%;
`

export const ScreenLayout = ({ children, isDark, darkBack = colors.black, lightBack = colors.grey_1 }) => {
  return (
    <ScreenContainer style={{ backgroundColor: isDark ? darkBack : lightBack }}>
      <StatusBar backgroundColor={isDark ? darkBack : lightBack} barStyle={isDark ? 'light-content' : 'dark-content'} />
      {children}
    </ScreenContainer>
  )
}
