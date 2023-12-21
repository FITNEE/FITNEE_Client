import styled from 'styled-components/native'
import { colors } from '../../colors'
import { Picker } from 'react-native-wheel-pick'
import { ScreenWidth } from '../../Shared'
import { Platform, Pressable, StatusBar, StyleSheet, Text } from 'react-native'
import WheelPickerExpo from 'react-native-wheel-picker-expo'

const TitleText = styled.Text`
  font-size: 24px;
  line-height: 32px;
  font-family: Pretendard-SemiBold;
`
export const Title = ({ isDark, text }) => {
  return <TitleText style={{ color: isDark ? colors.white : colors.black }}>{text}</TitleText>
}
export const SubText2 = ({ isDark, text }) => {
  return <_SubText2 style={{ color: isDark ? colors.white : colors.l_main }}>{text}</_SubText2>
}
const _SubText2 = styled.Text`
  font-size: 12px;
  margin-top: 4px;
  font-family: Pretendard-SemiBold;
`

export const _SubText = styled.Text`
  font-size: 13px;
  margin-top: 8px;
  font-family: Pretendard-Regular;
  line-height: 19px;
`
export const SubText = ({ isDark, text }) => {
  return <_SubText style={{ color: isDark ? colors.white : colors.black }}>{text}</_SubText>
}
export const Input = styled.TextInput`
  padding: 15px 16px;
  border-radius: 10px;
  width: 100%;
  height: 48px;
`

export const InputTitle = styled.Text`
  font-size: 11px;
  margin-left: 16px;
  margin-bottom: 2px;
  font-family: Pretendard-Regular;
  line-height: 19px;
  color: ${colors.l_main};
`
export const StatusText = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 11px;
  text-align: right;
  margin-bottom: 8px;
  margin-right: 8px;
`

//****************** ScreenLayout  *******************************************************/

export const ScreenContainer = styled.SafeAreaView`
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
  flex: 1;
`
const KeyBoardAwareContainer = styled.KeyboardAvoidingView`
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
`

export const ScreenKeyboardLayout = ({ children, isDark, isRelative = false, onPress = null }) => {
  return (
    <ScreenContainer style={{ backgroundColor: isDark ? colors.grey_9 : colors.grey_1 }}>
      <Pressable onPress={onPress} style={{ width: '100%', flex: 1 }}>
        <KeyBoardAwareContainer
          style={{
            paddingLeft: 24,
            paddingRight: 24,
            justifyContent: isRelative ? 'flex-start' : 'space-between',
          }}
          // behavior={Platform.select({ ios: 'padding' })}
        >
          {children}
        </KeyBoardAwareContainer>
      </Pressable>
    </ScreenContainer>
  )
}

//****************** NumberInput  *******************************************************/

const NumberContainer = styled.TouchableOpacity`
  margin-top: 2px;
  justify-content: center;
  padding: 7px;
  border-radius: 4px;
  border-radius: 10px;
  width: 100%;
  height: 48px;
`

const NumberText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  font-family: Pretendard-Regular;
`

export const NumberInput = ({ onPress, value, placeholder, active, isDark }) => {
  return (
    <NumberContainer
      style={[
        active && { borderColor: colors.l_main, borderWidth: 1 },
        { backgroundColor: isDark ? colors.black : colors.white },
      ]}
      onPress={onPress}
    >
      <NumberText
        style={
          value
            ? {
                color: isDark ? colors.white : colors.black,
              }
            : {
                color: colors.grey_5,
              }
        }
      >
        {value ? value : placeholder}
      </NumberText>
    </NumberContainer>
  )
}

//****************** BottomSheet  *******************************************************/

const BottomSheetBase = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px;
  border-radius: 24px 24px 0px 0px;
  flex-direction: column;
`
const BottomButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  /* width: 80px; */
  padding: 0px 24px;
  height: 56px;
`
const BottomSheetHeader = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  height: 56px;
`
const BottomContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`

const SubmitText = styled.Text`
  font-family: Pretendard-Bold;
  font-size: 17px;
  color: ${colors.d_main};
`

const PickerContainer = styled.View`
  overflow: hidden;
`
export const MyBottomSheet = ({ isDark, setValue, nextFunc, defaultVal, selectableDatas }) => {
  return (
    <BottomSheetBase
      style={{
        backgroundColor: isDark ? colors.grey_8 : colors.white,
        paddingTop: Platform.OS === 'android' ? 8 : 8,
      }}
    >
      <BottomSheetHeader>
        <BottomButton onPress={nextFunc}>
          <SubmitText>다음</SubmitText>
        </BottomButton>
      </BottomSheetHeader>
      <BottomContainer>
        {Platform.OS === 'ios' ? (
          <Picker
            textColor={isDark ? colors.white : colors.black}
            style={{
              backgroundColor: isDark ? colors.grey_8 : colors.white,
              width: ScreenWidth,
            }}
            selectedValue={defaultVal}
            pickerData={selectableDatas}
            onValueChange={(value) => {
              setValue(value)
            }}
          />
        ) : (
          <PickerContainer>
            <WheelPickerExpo
              height={200}
              width={ScreenWidth - 48}
              initialSelectedIndex={0}
              items={selectableDatas.map((name) => ({ label: name, value: '' }))}
              onChange={({ item }) => setValue(item.label)}
              backgroundColor={isDark ? colors.grey_8 : colors.white}
              selectedStyle={{ borderColor: colors.grey_5, borderWidth: StyleSheet.hairlineWidth }}
              renderItem={(props) => (
                <Text
                  style={{
                    fontFamily: 'Pretendard-Regular',
                    fontSize: 20,
                    color: isDark ? colors.white : colors.black,
                  }}
                >
                  {props.label}
                </Text>
              )}
            />
          </PickerContainer>
        )}
      </BottomContainer>
    </BottomSheetBase>
  )
}
