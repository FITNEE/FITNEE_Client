import styled from "styled-components/native";
import { colors } from "../../colors";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Picker } from "react-native-wheel-pick";
import { ScreenWidth } from "../../Shared";

const TitleText = styled.Text`
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
`;
export const Title = ({ isDark, text }) => {
  return (
    <TitleText style={{ color: isDark ? colors.white : colors.black }}>
      {text}
    </TitleText>
  );
};

export const _SubText = styled.Text`
  font-size: 13px;
  margin-top: 8px;
  font-weight: 400;
  line-height: 19px;
`;
export const SubText = ({ isDark, text }) => {
  return (
    <_SubText style={{ color: isDark ? colors.white : colors.black }}>
      {text}
    </_SubText>
  );
};
export const Input = styled.TextInput`
  padding: 15px 16px;
  border-radius: 10px;
  width: 100%;
  height: 48px;
`;

export const InputTitle = styled.Text`
  font-size: 12px;
  margin-left: 16px;
  margin-bottom: 2px;
  font-weight: 400;
  line-height: 19px;
  color: ${colors.l_main};
`;
export const StatusText = styled.Text`
  font-size: 11px;
  text-align: right;
  margin-bottom: 8px;
  margin-right: 8px;
  font-weight: 300;
`;

export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
`;
const KeyBoardAwareContainer = styled.KeyboardAvoidingView`
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-left: 5%;
  flex: 1;
`;

export const ScreenLayout = ({ children, isDark, isRelative = false }) => {
  return (
    <ScreenContainer
      style={{ backgroundColor: isDark ? colors.grey_9 : colors.grey_1 }}
    >
      <KeyBoardAwareContainer
        style={{
          justifyContent: isRelative ? "flex-start" : "space-between",
        }}
        behavior={Platform.select({ ios: "padding" })}
      >
        {children}
      </KeyBoardAwareContainer>
    </ScreenContainer>
  );
};

//****************** NumberInput  *******************************************************/

const NumberContainer = styled.TouchableOpacity`
  margin-top: 2px;
  padding: 15px 7px;
  border-radius: 4px;
  border-radius: 10px;
  width: 100%;
  height: 48px;
`;

const NumberText = styled.Text`
  margin-left: 8px;
`;

export const NumberInput = ({
  onPress,
  value,
  placeholder,
  active,
  isDark,
}) => {
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
  );
};

//****************** BottomSheet  *******************************************************/

const BottomButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 56px;
`;
const BottomSheetHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 56px;
`;

const BottomSheetText = styled.Text`
  color: ${colors.d_main};
  font-size: 15px;
`;
export const MyBottomSheet = ({
  setValue,
  selectableDatas,
  modalRef,
  snapPoints,
  hideFunc,
  nextFunc = hideFunc,
  defaultVal,
}) => {
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleHeight={80}
    >
      <BottomSheetHeader>
        <BottomButton onPress={hideFunc}>
          <BottomSheetText>숨기기</BottomSheetText>
        </BottomButton>
        <BottomButton onPress={nextFunc}>
          <BottomSheetText>다음</BottomSheetText>
        </BottomButton>
      </BottomSheetHeader>
      <Picker
        style={{
          backgroundColor: colors.white,
          width: ScreenWidth,
        }}
        selectedValue={defaultVal}
        pickerData={selectableDatas}
        onValueChange={(value) => {
          setValue(value);
        }}
      />
    </BottomSheetModal>
  );
};
