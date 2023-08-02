import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import RoutineItem from "../components/RoutineItem";
import Scroll from "../components/Scroll";

export default function CreateRoutine_5({ navigation }) {
  const [routine, SetRoutine] = useState("");
  const ROUTINE_DATA = [
    {
      id: 1,
      title: "전신 근력 및 기초 체력",
      item: [
        {
          id: 1,
          day: "Day 1",
          parts: "등, 어깨, 가슴",
          exercises: [
            { id: 1, name: "데드리프트", set: 3 },
            { id: 2, name: "덤벨프레스", set: 3 },
            { id: 3, name: "바벨 로우", set: 3 },
            { id: 4, name: "사이드 레터럴 라이즈", set: 3 },
            { id: 5, name: "레그프레스", set: 3 },
            { id: 6, name: "크런치", set: 3 },
          ],
        },
        {
          id: 2,
          day: "Day 2",
          parts: "등, 어깨, 가슴",
          exercises: [
            { id: 1, name: "데드리프트", set: 3 },
            { id: 2, name: "덤벨프레스", set: 3 },
            { id: 3, name: "바벨 로우", set: 3 },
            { id: 4, name: "사이드 레터럴 라이즈", set: 3 },
            { id: 5, name: "레그프레스", set: 3 },
            { id: 6, name: "크런치", set: 3 },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "전신 근력 및 기초 체력",
      item: [
        {
          id: 1,
          day: "Day 1",
          parts: "등, 어깨, 가슴",
          exercises: [
            { id: 1, name: "데드리프트", set: 3 },
            { id: 2, name: "덤벨프레스", set: 3 },
            { id: 3, name: "바벨 로우", set: 3 },
            { id: 4, name: "사이드 레터럴 라이즈", set: 3 },
            { id: 5, name: "레그프레스", set: 3 },
            { id: 6, name: "크런치", set: 3 },
          ],
        },
        {
          id: 2,
          day: "Day 2",
          parts: "등, 어깨, 가슴",
          exercises: [
            { id: 1, name: "데드리프트", set: 3 },
            { id: 2, name: "덤벨프레스", set: 3 },
            { id: 3, name: "바벨 로우", set: 3 },
            { id: 4, name: "사이드 레터럴 라이즈", set: 3 },
            { id: 5, name: "레그프레스", set: 3 },
            { id: 6, name: "크런치", set: 3 },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "전신 근력 및 기초 체력",
      item: [
        {
          id: 1,
          day: "Day 1",
          parts: "등, 어깨, 가슴",
          exercises: [
            { id: 1, name: "데드리프트", set: 3 },
            { id: 2, name: "덤벨프레스", set: 3 },
            { id: 3, name: "바벨 로우", set: 3 },
            { id: 4, name: "사이드 레터럴 라이즈", set: 3 },
            { id: 5, name: "레그프레스", set: 3 },
            { id: 6, name: "크런치", set: 3 },
          ],
        },
        {
          id: 2,
          day: "Day 2",
          parts: "등, 어깨, 가슴",
          exercises: [
            { id: 1, name: "데드리프트", set: 3 },
            { id: 2, name: "덤벨프레스", set: 3 },
            { id: 3, name: "바벨 로우", set: 3 },
            { id: 4, name: "사이드 레터럴 라이즈", set: 3 },
            { id: 5, name: "레그프레스", set: 3 },
            { id: 6, name: "크런치", set: 3 },
          ],
        },
      ],
    },
    // Add more routine data as needed
  ];
  return (
    <Container>
      <TitleContainer>
        <Title>루틴이 생성되었어요!</Title>
        <SubTitle>
          {`회원님의 답변을 기반으로 최적의 플랜을 만들었어요.
         가장 마음에 드는 플랜을 선택해주세요.`}
        </SubTitle>
      </TitleContainer>
      <ScrollContainer>
        <Scroll data={ROUTINE_DATA} />
      </ScrollContainer>
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
  margin-top: 60px;
`;
const TitleContainer = styled.View`
  width: 90%;

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
const ScrollContainer = styled.View`
  height: 520px;
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