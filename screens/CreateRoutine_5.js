import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import RoutineItem from "../components/RoutineItem";

export default function CreateRoutine_5({ navigation }) {
  return (
    <Container>
      <TitleContainer>
        <Title>루틴이 생성되었어요!</Title>
        <SubTitle>
          {`회원님의 답변을 기반으로 최적의 플랜을 만들었어요.
         가장 마음에 드는 플랜을 선택해주세요.`}
        </SubTitle>
      </TitleContainer>
      <RoutineContainer>
        <RoutineTitleContainer>
          <RoutineTitle>전신 근력 및 기초 체력</RoutineTitle>
        </RoutineTitleContainer>
        <ItemConteiner>
          <RoutineItem />
        </ItemConteiner>
      </RoutineContainer>
      <NextButton>
        <ButtonText>이 루틴으로 결정</ButtonText>
      </NextButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;
const TitleContainer = styled.View`
  width: 90%;
  margin-bottom: 60px;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;
const SubTitle = styled.Text`
  font-size: 15px;
  margin-top: 10px;
`;
const RoutineContainer = styled.View`
  width: 90%;
  align-items: center;
  justify-content: center;
`;
const RoutineTitleContainer = styled.View`
  position: absolute;
  width: 157px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
  border-radius: 100px;
  top: -15px;
  left: 98px;
  z-index: 1;
`;
const RoutineTitle = styled.Text``;
const ItemConteiner = styled.View`
  width: 100%;
  border: 1px;
  border-color: #dddddd;
  border-radius: 20px;
  background-color: white;
  padding: 20px;
`;
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: #bfbfbf;
  border-radius: 10px;
  margin-bottom: 50px;
`;
const ButtonText = styled.Text``;
