import React from "react";
import styled from "styled-components/native";

export default function CreateRoutine_2({ navigation }) {
  return (
    <Container>
      <StackBar>
        <StackBarPin />
      </StackBar>
      <TitleContainer>
        <Title>나의 예상 스쿼트 1RM은?</Title>
        <SubTitle>
          {`회원님의 답변을 바탕으로
정확한 트레이닝 중량을 추천해 드릴게요.`}
        </SubTitle>
      </TitleContainer>

      <NextButton>
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
  background-color: #f3f3f3;
`;
const StackBar = styled.View`
  width: 90%;
  height: 10px;
  background-color: #dddddd;
  margin-top: 10px;
  border-radius: 10px;
`;
const StackBarPin = styled.View`
  width: 50%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`;
const TitleContainer = styled.View`
  width: 90%;
  margin-bottom: 60px;
`;
const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;
const SubTitle = styled.Text`
  font-size: 15px;
  margin-top: 10px;
`;
const WeightContainer = styled.View`
  width: 288px;
  height: 200px;
  margin-bottom: 60px;
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
