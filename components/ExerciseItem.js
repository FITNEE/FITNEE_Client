import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { ScreenWidth } from "../Shared";

const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  width: 100%;
`;
const ExerciseTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ExerciseTitle = styled.Text`
  font-size: 17px;
  font-weight: 600;
`;
const ExerciseSubText = styled.Text`
  font-size: 13px;
  margin-top: 4px;
  color: #757575;
`;
const SetsText = styled.Text`
  font-size: 17px;
  color: ${colors.grey_8};
  font-weight: 400;
`;
const DropDown = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: chartreuse;
`;
const ExtendedContainer = styled.View`
  width: 100%;
  padding: 8px 16px 0px 16px;
`;
const ExerciseImg = styled.View`
  width: 60px;
  margin-right: 16px;
  height: 60px;
  background-color: ${colors.grey_3};
  border-radius: 30px;
`;
const ExerciseContainer = styled.View`
  padding: 16px;
  flex-direction: column;
  border-radius: 12px;
  width: ${ScreenWidth - 48}px;
  margin-left: 24px;
  margin-top: 8px;
  background-color: ${colors.white};
`;
const DefaultContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const ExerciseItem = ({
  id,
  setsNum,
  title,
  subText,
  selectedId,
  setSelectedId,
}) => {
  console.log(setsNum);
  return (
    <ExerciseContainer>
      <DefaultContainer>
        <ExerciseImg />
        <ExerciseTextContainer>
          <ExerciseTitle>{title}</ExerciseTitle>
          <ExerciseSubText>{subText}</ExerciseSubText>
        </ExerciseTextContainer>
        <DropDown
          onPress={() => {
            selectedId == id ? setSelectedId("") : setSelectedId(id);
          }}
        />
      </DefaultContainer>
      {selectedId == id && (
        <ExtendedContainer>
          {setsNum.map((item, id) => (
            <SetContainer
              id
              style={{
                fontWeight: 600,
              }}
            >
              <SetsText>{id + 1}</SetsText>
              <SetsText>-</SetsText>
              <SetsText>{item}회</SetsText>
            </SetContainer>
          ))}
        </ExtendedContainer>
      )}
    </ExerciseContainer>
  );
};
