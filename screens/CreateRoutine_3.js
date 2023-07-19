import React from "react";
import styled from "styled-components/native";

export default function CreateRoutine_3({ navigation }) {
  return (
    <Container>
      <StackBar>
        <StackBarPin />
      </StackBar>
      <TitleContainer>
        <Title>{`운동할 부위를
모두 선택하세요`}</Title>
      </TitleContainer>
      <PartContainer>
        <PartItem>
          <PartImage />
          <PartName>가슴</PartName>
        </PartItem>
        <PartItem>
          <PartImage />
          <PartName>등</PartName>
        </PartItem>
        <PartItem>
          <PartImage />
          <PartName>어깨</PartName>
        </PartItem>
        <PartItem>
          <PartImage />
          <PartName>팔</PartName>
        </PartItem>
        <PartItem>
          <PartImage />
          <PartName>코어</PartName>
        </PartItem>
        <PartItem>
          <PartImage />
          <PartName>하체</PartName>
        </PartItem>
      </PartContainer>
      <AllButton>
        <AllText>모든 부위를 운동할래요</AllText>
      </AllButton>
      <NextButton onPress={() => navigation.push("CreateRoutine_4")}>
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
  width: 75%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`;
const TitleContainer = styled.View`
  width: 90%;
  margin-bottom: 10px;
  margin-top: 30px;
`;
const Title = styled.Text`
  font-size: 25px;
`;
const PartContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 85%;
`;
const PartItem = styled.TouchableOpacity`
  width: 101px;
  height: 124px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const PartImage = styled.Image`
  width: 85px;
  height: 85px;
  background-color: #bfbfbf;
  border-radius: 300px;
`;
const PartName = styled.Text`
  font-size: 15px;
  margin-top: 10px;
`;
const AllButton = styled.TouchableOpacity`
  width: 147px;
  height: 40px;
  background-color: #dddddd;
  margin-bottom: 120px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
const AllText = styled.Text`
  font-size: 13px;
`;
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: #bfbfbf;
  border-radius: 10px;
  margin-bottom: 45px;
`;
const ButtonText = styled.Text``;
