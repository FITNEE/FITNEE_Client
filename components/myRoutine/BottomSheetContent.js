import { styled } from "styled-components/native";
import { colors } from "../../colors";
import { ContentContainer } from "../Shared/MyRoutine_Shared";
import { useEffect, useState } from "react";

const BottomSheetBase = styled.Pressable`
  width: 100%;
  height: 100%;
  padding: 24px;
  border-radius: 24px;
  flex-direction: column;
`;
const BottomSheetHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  height: 24px;
`;
const ExerciseTitle = styled.Text`
  font-size: 17px;
  margin-bottom: 6px;
  font-weight: 500;
`;
const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  height: 48px;
  border-radius: 8px;
  margin-top: 10px;
`;
const ExtendedContainer = styled.View`
  width: 100%;
`;
const SetsText = styled.Text`
  font-size: 17px;
  flex: 1;
  color: ${colors.grey_8};
  font-weight: 400;
`;
const EditText = styled.Text`
  font-size: 17px;
  flex: 1;
  color: ${colors.grey_8};
  text-align: center;
  font-weight: 400;
`;
const EditBox = styled.TextInput`
  height: 32px;
  margin-right: 8px;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  width: 56px;
`;
const SubmitText = styled.Text`
  font-size: 17px;
  color: ${colors.l_main};
  text-align: center;
  font-weight: 700;
`;
const SubmitButton = styled.TouchableOpacity`
  width: 56px;
  margin-left: 20px;
`;

export const BottomSheetContent = ({
  isDark,
  handleClosePress,
  newRoutine,
  editingID,
  extendModal,
}) => {
  const [tempArr, setTempArr] = useState(null);
  useEffect(() => {
    setTempArr(newRoutine);
  }, [newRoutine]);
  const editRoutine = (id, type, value) => {
    let newArr = JSON.parse(JSON.stringify(tempArr));
    if (type == "repeat") {
      newArr[editingID].content[id].rep = value;
    } else if (type == "weight") {
      newArr[editingID].content[id].weight = value;
    }
    console.log(newArr[editingID].content[id]);
    setTempArr(newArr);
  };

  return (
    <BottomSheetBase
      style={{ backgroundColor: isDark ? colors.grey_8 : colors.white }}
    >
      <BottomSheetHeader>
        <ExerciseTitle style={{ color: isDark ? colors.white : colors.black }}>
          {newRoutine /** 운동이 없는 요일을 선택했을 경우, Null값이 반환됨에 따라 
                  null을 object로 만들수 없다는 오류를 피하기 위함 */ &&
            newRoutine[editingID]?.exerciseName}
        </ExerciseTitle>
        <SubmitButton onPress={() => handleClosePress(tempArr)}>
          <SubmitText>완료</SubmitText>
        </SubmitButton>
      </BottomSheetHeader>
      <ExtendedContainer>
        {newRoutine /** 운동이 없는 요일을 선택했을 경우, Null값이 반환됨에 따라 
                  null을 object로 만들수 없다는 오류를 피하기 위함 */ &&
          newRoutine[editingID]?.content.map((item, id) => (
            <SetContainer
              style={{
                backgroundColor: isDark ? colors.grey_7 : colors.grey_1,
              }}
              key={id}
            >
              <ContentContainer key={id}>
                <SetsText style={isDark && { color: colors.white }}>
                  {id + 1}
                </SetsText>
                <EditBox
                  style={{
                    backgroundColor: isDark
                      ? !item.weight
                        ? colors.black
                        : colors.black
                      : !item.weight
                      ? colors.white
                      : colors.grey_2,
                  }}
                  keyboardType="numeric"
                  selectTextOnFocus={item.weight != null}
                  editable={item.weight != null}
                  onFocus={() => extendModal()}
                  // value={newRoutine[editingID].content[id].weight}
                  onChangeText={(value) => editRoutine(id, "weight", value)}
                >
                  <EditText style={item.weight && { color: colors.l_main }}>
                    {item.weight}
                  </EditText>
                </EditBox>
                <SetsText style={isDark && { color: colors.white }}>
                  kg
                </SetsText>
                <EditBox
                  style={{
                    backgroundColor: isDark
                      ? !item.weight
                        ? colors.black
                        : colors.black
                      : !item.weight
                      ? colors.white
                      : colors.grey_2,
                  }}
                  keyboardType="numeric"
                  selectTextOnFocus={item.rep != null}
                  editable={item.rep != null}
                  onFocus={() => extendModal()}
                  // value={newRoutine[editingID].content[id].rep}
                  onChangeText={(value) => editRoutine(id, "repeat", value)}
                >
                  <EditText style={{ color: colors.l_main }}>
                    {item.rep}
                  </EditText>
                </EditBox>
                <SetsText style={isDark && { color: colors.white }}>
                  회
                </SetsText>
              </ContentContainer>
            </SetContainer>
          ))}
      </ExtendedContainer>
    </BottomSheetBase>
  );
};
