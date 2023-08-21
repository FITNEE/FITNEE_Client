import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Picker } from 'react-native-wheel-pick'
import { ScreenWidth } from '../../Shared'
import { Platform, Pressable, StatusBar } from 'react-native'
import WheelPickerExpo from 'react-native-wheel-picker-expo'

const TitleText = styled.Text`
  font-size: 24px;
  line-height: 32px;
  font-family: Pretendard-SemiBold;
`
export const Title = ({ isDark, text }) => {
  return <TitleText style={{ color: isDark ? colors.white : colors.black }}>{text}</TitleText>
}

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

export const ScreenContainer = styled.SafeAreaView`
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
  /* padding-top: Platform.OS === "android" ? StatusBar.currentHeight : 0 */
  flex: 1;
`
const KeyBoardAwareContainer = styled.KeyboardAvoidingView`
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-left: 5%;
  flex: 1;
`

export const ScreenKeyboardLayout = ({ children, isDark, isRelative = false, onPress = null }) => {
  return (
    <ScreenContainer style={{ backgroundColor: isDark ? colors.grey_9 : colors.grey_1 }}>
      <Pressable onPress={onPress} style={{ width: '100%', flex: 1 }}>
        <KeyBoardAwareContainer
          style={{
            justifyContent: isRelative ? 'flex-start' : 'space-between',
          }}
          behavior={Platform.select({ ios: 'padding' })}
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
  padding: 15px 7px;
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

const BottomButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 56px;
`
const BottomSheetHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 56px;
`
const BottomContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: chartreuse;
`

const BottomSheetText = styled.Text`
  color: ${colors.d_main};
  font-family: Pretendard-Medium;
  font-size: 15px;
`

const PickerContainer = styled.View`
  border-radius: 20px;
  overflow: hidden;
`
export const MyBottomSheet = ({ setValue, modalRef, snapPoints, hideFunc, nextFunc = hideFunc, defaultVal }) => {
  //   let data = []
  //   for (var i = 1960; i < 2023; i++) {
  //     data.push(i)
  //   }
  let data = []
  for (var i = 0; i < 201; i += 5) {
    data.push(i)
  }
  return (
    <BottomSheetModal ref={modalRef} index={0} snapPoints={snapPoints} enablePanDownToClose={false} handleHeight={80}>
      <BottomSheetHeader>
        <BottomButton onPress={hideFunc}>
          <BottomSheetText>숨기기</BottomSheetText>
        </BottomButton>
        <BottomButton onPress={nextFunc}>
          <BottomSheetText>다음</BottomSheetText>
        </BottomButton>
      </BottomSheetHeader>
      <BottomContainer>
        {Platform.OS === 'ios' ? (
          <Picker
            style={{
              backgroundColor: colors.white,
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
              width={288}
              initialSelectedIndex={0}
              items={data.map((name) => ({ label: name, value: '' }))}
              onChange={({ item }) => setValue(item)}
              selectedStyle={{ borderColor: '#E8EBF0', borderWidth: 1 }}
            />
          </PickerContainer>
        )}
      </BottomContainer>
    </BottomSheetModal>
  )
}
