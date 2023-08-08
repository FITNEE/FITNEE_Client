import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { ScreenWidth } from "../Shared";

import { WithLocalSvg } from "react-native-svg";
import ToggleDown from "../../assets/SVGs/ToggleDown.svg";
import ToggleUp from "../../assets/SVGs/ToggleUp.svg";
import { FlatList } from "react-native";

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
  color: ${colors.l_main};
`;
const SetsText = styled.Text`
  font-size: 17px;
  color: ${colors.grey_8};
  font-weight: 400;
`;
const DropDown = styled.TouchableOpacity`
  width: 40px;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
const ExtendedContainer = styled.View`
  width: 100%;
  padding: 8px 16px 0px 16px;
`;
const ExerciseImg = styled.View`
  width: 60px;
  margin-right: 16px;
  height: 60px;
  background-color: ${colors.grey_1};
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

export default List_Normal = ({ routineData, selectedId, setSelectedId }) => {
  const renderItem = ({ item, index }) => {
    return (
      <ExerciseContainer>
        <DefaultContainer>
          <ExerciseImg />
          <ExerciseTextContainer>
            <ExerciseTitle>{item.exerciseName}</ExerciseTitle>
            <ExerciseSubText>
              {item.exerciseParts} | {item.content.length}세트
            </ExerciseSubText>
          </ExerciseTextContainer>
          <DropDown
            onPress={() => {
              selectedId == index ? setSelectedId(null) : setSelectedId(index);
            }}
          >
            <WithLocalSvg
              // style={focused ? { color: '#0351ea' } : { color: '#747474' }}
              width={24}
              height={24}
              asset={selectedId == index ? ToggleUp : ToggleDown}
            />
          </DropDown>
        </DefaultContainer>
        {selectedId == index && (
          <ExtendedContainer>
            {item.content?.map((item, id) => (
              <SetContainer
                key={id}
                style={{
                  fontWeight: 600,
                }}
              >
                <SetsText>{id + 1}</SetsText>
                <SetsText>
                  {item.weight ? `${item.weight} kg` : `-  kg`}
                </SetsText>
                <SetsText>{item.rep} 회</SetsText>
              </SetContainer>
            ))}
          </ExtendedContainer>
        )}
      </ExerciseContainer>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator
      data={routineData}
      renderItem={renderItem}
    />
  );
};
