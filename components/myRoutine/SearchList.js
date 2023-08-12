import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { WithLocalSvg } from "react-native-svg";
import Check from "../../assets/SVGs/Check.svg";
const ListContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;
const ResultContainer = styled.TouchableOpacity`
  padding: 24px 16px;
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.grey_1};
  justify-content: space-between;
`;
const TextContainer = styled.View`
  flex-direction: column;
  padding-left: 16px;
  flex: 1;
`;
const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${colors.grey_2};
  border-radius: 32px;
`;
const Title = styled.Text`
  font-weight: 500;
  font-size: 15px;
  color: ${colors.black};
`;
const SubText = styled.Text`
  font-size: 13px;
  margin-top: 4px;
  font-weight: 400;
  color: ${colors.grey_7};
`;
const CheckButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export default function SearchList({ parentSearchList, editSelectedList }) {
  return (
    <ListContainer>
      {parentSearchList?.map((words, index) => {
        return (
          <ResultContainer key={index} onPress={() => console.log("pressed")}>
            <IconContainer />
            <TextContainer>
              <Title>{words.name}</Title>
              <SubText>
                {words.parts} | {words.equipment}
              </SubText>
            </TextContainer>
            <CheckButton
              onPress={() =>
                editSelectedList("add", index, {
                  exerciseName: words.name,
                  exerciseParts: words.parts,
                  healthCategoryIdx: words.healthCategoryIdx,
                })
              }
            >
              <WithLocalSvg width={24} height={24} asset={Check} />
            </CheckButton>
          </ResultContainer>
        );
      })}
    </ListContainer>
  );
}
