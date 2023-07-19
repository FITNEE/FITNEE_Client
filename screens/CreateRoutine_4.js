import React from "react";
import styled from "styled-components/native";

export default function CreateRoutine_4({ navigation }) {
  return (
    <Container>
      <StackBar>
        <StackBarPin />
      </StackBar>
      <TitleContainer>
        <Title>운동할 요일을 선택해주세요.</Title>
        <SubTitle>마이루틴에서 언제든지 변경할 수 있어요.</SubTitle>
      </TitleContainer>
      <DayContainer>
        <DayItem>
          <DayName>월</DayName>
        </DayItem>
        <DayItem>
          <DayName>월</DayName>
        </DayItem>
        <DayItem>
          <DayName>월</DayName>
        </DayItem>
        <DayItem>
          <DayName>월</DayName>
        </DayItem>
        <DayItem>
          <DayName>월</DayName>
        </DayItem>
        <DayItem>
          <DayName>월</DayName>
        </DayItem>
        <DayItem>
          <DayName>월</DayName>
        </DayItem>
      </DayContainer>
      <AllDayButton>
        <AllDayText>매일 운동할래요</AllDayText>
      </AllDayButton>
      <NextButton>
        <ButtonText>선택 완료</ButtonText>
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
  width: 100%;
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
const DayContainer = styled.View`
  flex-direction: row;
  width: 327px;
  height: 43px;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  margin-bottom: 70px;
`;
const DayItem = styled.TouchableOpacity`
  width: 43px;
  height: 43px;
  background-color: white;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
const DayName = styled.Text``;
const AllDayButton = styled.TouchableOpacity`
  width: 110px;
  height: 40px;
  background-color: #dddddd;
  margin-bottom: 50px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
const AllDayText = styled.Text`
  font-size: 13px;
`;
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
  border-radius: 10px;
  margin-bottom: 45px;
`;
const ButtonText = styled.Text``;
