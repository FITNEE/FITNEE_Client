import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

export default function CreateRoutine_1({ navigation }) {
  const [home, SetHome] = useState(false);
  const [fitness, SetFitness] = useState(false);
  const [select, SetSelect] = useState(false);
  const homePress = () => {
    SetHome(!home);
    if (fitness) {
      SetFitness(!fitness);
    }
  };
  const fitnessPress = () => {
    SetFitness(!fitness);
    if (home) {
      SetHome(!home);
    }
  };
  useEffect(() => {
    SetSelect(home || fitness);
  }, [home, fitness]);
  return (
    <Container>
      <StackBar>
        <StackBarPin />
      </StackBar>
      <TitleContainer>
        <Title>운동하는 곳을 선택해주세요</Title>
        <SubTitle>장소에 맞게 운동을 추천해 드릴게요</SubTitle>
      </TitleContainer>
      <SpaceContainer>
        <SpaceItem isActive={home} onPress={homePress}>
          <SpaceImage />
          <SpaceName>집</SpaceName>
        </SpaceItem>
        <SpaceItem isActive={fitness} onPress={fitnessPress}>
          <SpaceImage />
          <SpaceName>헬스장</SpaceName>
        </SpaceItem>
      </SpaceContainer>
      <NextButton
        isActive={select}
        onPress={() => navigation.push("CreateRoutine_2")}
        disabled={!select}
      >
        <ButtonText>다음</ButtonText>
      </NextButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const StackBar = styled.View`
  width: 90%;
  height: 10px;
  background-color: #dddddd;
  margin-top: 10px;
  border-radius: 10px;
`;
const StackBarPin = styled.View`
  width: 25%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`;
const TitleContainer = styled.View`
  width: 90%;
  margin-bottom: 60px;
`;
const Title = styled.Text`
  font-size: 20px;
`;
const SubTitle = styled.Text`
  font-size: 12px;
  margin-top: 10px;
`;
const SpaceContainer = styled.View`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  margin-bottom: 100px;
`;
const SpaceItem = styled.TouchableOpacity`
  width: 157px;
  height: 192px;
  background-color: ${(props) => (props.isActive ? "#DDDDDD" : "white")};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
const SpaceImage = styled.Image`
  width: 117px;
  height: 117px;
  background-color: silver;
  border-radius: 500px;
`;
const SpaceName = styled.Text`
  margin-top: 10px;
`;
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isActive ? "#BFBFBF" : "#DDDDDD")};
  border-radius: 10px;
  margin-bottom: 45px;
`;
const ButtonText = styled.Text``;
