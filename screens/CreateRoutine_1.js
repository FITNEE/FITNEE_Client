import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigationState } from "@react-navigation/native";
import CreateRoutineHeader from "../components/CreateRoutineHeader";
import { useRecoilState } from "recoil";
import { CreateRoutineAtom } from "../recoil/CreateRoutineAtom";
import { colors } from "../colors";

export default function CreateRoutine_1({ navigation }) {
  const [home, SetHome] = useState(false);
  const [fitness, SetFitness] = useState(false);
  const [select, SetSelect] = useState(false);
  const index = useNavigationState((state) => state.index);
  const [routine, setRoutine] = useRecoilState(CreateRoutineAtom);
  useEffect(() => {
    navigation.setOptions({
      header: () => <CreateRoutineHeader title="루틴 등록" index={index} />,
    });
  }, []);
  useEffect(() => {
    // console.log("atom : ", routine);
  }, [routine]);
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
  const nextButton = () => {
    setRoutine((prev) => ({
      ...prev,
      place: home ? "home" : "gym",
    }));
    console.log("atom : ", routine);
    navigation.push("CreateRoutine_2");
  };
  useEffect(() => {
    SetSelect(home || fitness);
  }, [home, fitness]);
  return (
    <Container>
      <TitleContainer>
        <Title>운동하는 곳을 선택해주세요</Title>
        <SubTitle>장소에 맞게 운동을 추천해 드릴게요</SubTitle>
      </TitleContainer>
      <SpaceContainer>
        <SpaceItem isActive={home} onPress={homePress}>
          <SpaceImage />
          <SpaceName isActive={home}>집</SpaceName>
        </SpaceItem>
        <SpaceItem isActive={fitness} onPress={fitnessPress}>
          <SpaceImage />
          <SpaceName>헬스장</SpaceName>
        </SpaceItem>
      </SpaceContainer>
      <NextButton isActive={select} onPress={nextButton} disabled={!select}>
        <ButtonText isActive={select}>다음</ButtonText>
      </NextButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;
const TitleContainer = styled.View`
  width: 90%;
  margin-bottom: 60px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
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
  background-color: ${(props) =>
    props.isActive ? colors.l_sub_2 : colors.white};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 1px;
  border-color: ${(props) => (props.isActive ? colors.l_main : colors.white)};
`;
const SpaceImage = styled.Image`
  width: 117px;
  height: 117px;
  background-color: ${colors.grey_1};
  border-radius: 500px;
`;
const SpaceName = styled.Text`
  margin-top: 10px;
  font-weight: bold;
  color: ${(props) => (props.isActive ? colors.l_main : colors.black)};
`;
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isActive ? colors.l_main : colors.grey_3};
  border-radius: 10px;
`;
const ButtonText = styled.Text`
  color: ${(props) => (props.isActive ? colors.white : colors.black)};
`;
