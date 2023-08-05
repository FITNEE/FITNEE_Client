import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { ScreenWidth } from "../Shared";

const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding: 12px 16px;
  background-color: ${colors.grey_2};
  width: 100%;
  border-radius: 8px;
  margin-top: 4px;
`;
const ExerciseTitle = styled.Text`
  font-size: 17px;
  margin: 8px;
  font-weight: 500;
`;
const SetsText = styled.Text`
  font-size: 17px;
  color: ${colors.grey_8};
  font-weight: 400;
`;
const ExtendedContainer = styled.View`
  width: 100%;
`;
const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
const ExerciseContainer = styled.Pressable`
  padding: 8px;
  flex-direction: column;
  border-radius: 12px;
  width: ${ScreenWidth - 48}px;
  margin-top: 16px;
  background-color: ${colors.white};
`;
const DeleteButton = styled.TouchableOpacity`
  background-color: ${colors.red};
  height: 24px;
  width: 24px;
  margin-left: 20px;
`;
const AddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  width: 100%;
  border-radius: 8px;
  margin-top: 4px;
  height: 48px;
  border: 1px dashed ${colors.black};
`;
const AddText = styled.Text`
  font-size: 17px;
  font-weight: 500;
`;

export const ExerciseItem_Custom = ({
  id,
  content,
  title,
  popMessage,
  editRoutine,
}) => {
  // console.log(content);
  return (
    <ExerciseContainer onLongPress={() => popMessage()}>
      <ExerciseTitle>{title}</ExerciseTitle>
      <ExtendedContainer id>
        {content.map((item, contentId) => (
          <SetContainer key={contentId}>
            <TextContainer>
              <SetsText>{contentId + 1}</SetsText>
              <SetsText>
                {item.weight ? item.weight + `   kg` : `-   kg`}
              </SetsText>
              <SetsText>{item.rep + `   회`}</SetsText>
            </TextContainer>
            <DeleteButton
              onPress={() => editRoutine(id, "deleteSet", contentId)}
            />
          </SetContainer>
        ))}

        <AddButton onPress={() => editRoutine(id, "add", 0)}>
          <AddText>세트 추가</AddText>
        </AddButton>
      </ExtendedContainer>
    </ExerciseContainer>
  );
};
export const ExerciseItem_Detail = ({ id, setsNum, title, popMessage }) => {
  return (
    <ExerciseContainer id={id} onLongPress={() => popMessage()}>
      <ExerciseTitle>{title}</ExerciseTitle>
      <ExtendedContainer id>
        {setsNum.map((item, id) => (
          <SetContainer id>
            <TextContainer>
              <SetsText>{id + 1}</SetsText>
              <SetsText>{`-      kg`}</SetsText>
              <SetsText>{item + `    회`}</SetsText>
            </TextContainer>
            <DeleteButton />
          </SetContainer>
        ))}

        <AddButton onPress={() => console.log("pressed")}>
          <AddText>세트 추가</AddText>
        </AddButton>
      </ExtendedContainer>
    </ExerciseContainer>
  );
};
