import styled from "styled-components/native";
import { colors } from "../../colors";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Picker } from "react-native-wheel-pick";
import { ScreenWidth } from "../../Shared";

export const Title = styled.Text`
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  color: ${colors.black};
`;

export const Input = styled.TextInput`
  padding: 15px 7px;
  border-radius: 4px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 48px;
`;

export const SubText = styled.Text`
  font-size: 13px;
  margin-top: 8px;
  font-weight: 400;
  line-height: 19px;
  color: ${colors.black};
`;
export const StatusText = styled.Text`
  font-size: 12px;
  width: 100%;
  text-align: right;
  margin-bottom: 12px;
  margin-right: 8px;
  font-weight: 300;
  color: ${colors.grey_4};
`;

const ScreenContainer = styled.SafeAreaView`
  flex: 1;
`;
const KeyBoardAwareContainer = styled.KeyboardAvoidingView`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  flex: 1;
  /* height: 90%; */
`;

export const ScreenLayout = ({ children }) => {
  return (
    <ScreenContainer>
      <KeyBoardAwareContainer behavior={Platform.select({ ios: "padding" })}>
        {children}
      </KeyBoardAwareContainer>
    </ScreenContainer>
  );
};

//****************** NumberInput  *******************************************************/

const NumberContainer = styled.TouchableOpacity`
  margin-top: 16px;
  padding: 15px 7px;
  border-radius: 4px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 48px;
`;

const NumberText = styled.Text``;

export const NumberInput = ({ onPress, value, placeholder }) => {
  return (
    <NumberContainer onPress={onPress}>
      <NumberText
        style={
          value
            ? {
                color: colors.black,
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
  defaultVal,
}) => {
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleHeight={80}
    >
      <BottomSheetHeader>
        <BottomButton onPress={hideFunc}>
          <BottomSheetText>숨기기</BottomSheetText>
        </BottomButton>
        <BottomButton onPress={hideFunc}>
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
