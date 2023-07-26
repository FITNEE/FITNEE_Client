import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

export default function CreateRoutine_3({ navigation }) {
  const [select, SetSelect] = useState(false);
  const [allPart, SetAllPart] = useState(false);
  const [parts, setParts] = useState([
    { id: 1, name: "가슴", selected: false },
    { id: 2, name: "등", selected: false },
    { id: 3, name: "어깨", selected: false },
    { id: 4, name: "팔", selected: false },
    { id: 5, name: "코어", selected: false },
    { id: 6, name: "하체", selected: false },
  ]);
  const onPartPress = (id) => {
    setParts((prevParts) =>
      prevParts.map((part) =>
        part.id === id ? { ...part, selected: !part.selected } : part
      )
    );
  };
  useEffect(() => {
    SetSelect(
      parts[0].selected ||
        parts[1].selected ||
        parts[2].selected ||
        parts[3].selected ||
        parts[4].selected ||
        parts[5].selected
    );
  }, [parts]);
  const AllPartPress = () => {
    SetAllPart(!allPart);
  };
  useEffect(() => {
    setParts((prevParts) =>
      prevParts.map((part) =>
        allPart ? { ...part, selected: true } : { ...part, selected: false }
      )
    );
  }, [allPart]);
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
        {parts.map((part) => (
          <PartItem
            key={part.id}
            onPress={() => onPartPress(part.id)}
            style={{ backgroundColor: part.selected ? "#DDDDDD" : "white" }}
          >
            <PartImage />
            <PartName>{part.name}</PartName>
          </PartItem>
        ))}
      </PartContainer>
      <AllButton isActive={allPart} onPress={AllPartPress}>
        <AllText>모든 부위를 운동할래요</AllText>
      </AllButton>
      <NextButton
        isActive={select}
        disabled={!select}
        onPress={() => navigation.push("CreateRoutine_4")}
      >
        <ButtonText isActive={select}>다음</ButtonText>
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
  background-color: ${(props) => (props.isActive ? "#BFBFBF" : "#DDDDDD")};
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
  background-color: ${(props) => (props.isActive ? "#BFBFBF" : "#DDDDDD")};
  border-radius: 10px;
  margin-bottom: 45px;
`;
const ButtonText = styled.Text`
  color: ${(props) => (props.isActive ? "black" : "#757575")};
`;
