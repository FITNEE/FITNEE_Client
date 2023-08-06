import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Picker, DatePicker } from "react-native-wheel-pick";
import { useNavigationState } from "@react-navigation/native";
import CreateRoutineHeader from "../components/CreateRoutineHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import { CreateRoutineAtom } from "../recoil/CreateRoutineAtom";

export default function CreateRoutine_2({ navigation }) {
  const [shouldRender, setShouldRender] = useState(true);
  const [dontKnow, setDontKnow] = useState(false);
  const [value, setValue] = useState(0);
  const [routine, setRoutine] = useRecoilState(CreateRoutineAtom);
  const index = useNavigationState((state) => state.index);
  useEffect(() => {
    navigation.setOptions({
      header: () => <CreateRoutineHeader title="루틴 등록" index={index} />,
    });
  }, []);
  useEffect(() => {
    console.log("atom2 : ", routine);
  }, [routine]);
  const nextButton = () => {
    setRoutine((prev) => ({
      ...prev,
      RM: value,
    }));
    navigation.push("CreateRoutine_3");
  };
  const handleDontKnow = () => {
    setDontKnow(!dontKnow);
  };
  useEffect(() => {
    // 일정 시간(예: 5초) 후에 렌더링 여부를 false로 변경
    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 5000); // 5초

    // 컴포넌트가 언마운트되면 타이머 클리어
    return () => clearTimeout(timer);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  let data = [];
  for (var i = 0; i < 201; i += 5) {
    data.push(i);
  }

  return (
    <Container>
      <TitleContainer>
        <Title>나의 예상 스쿼트 1RM은?</Title>
        {shouldRender ? (
          <Bubble>
            <BubbleText>{`정확한 동작으로 한 번 들어 올릴 
수 있는 무게를 의미해요.`}</BubbleText>
            <BubbleArrow />
          </Bubble>
        ) : null}
        <SubTitle>
          {`회원님의 답변을 바탕으로
정확한 트레이닝 중량을 추천해 드릴게요.`}
        </SubTitle>
      </TitleContainer>
      <Picker
        style={{
          backgroundColor: "white",
          width: 288,
          height: 200,
          borderRadius: 20,
        }}
        selectedValue="0"
        pickerData={data}
        onValueChange={(value) => {
          setValue(value);
          console.log(value);
        }}
      />
      <DontKnowButton isActive={dontKnow} onPress={handleDontKnow}>
        <DontKnowText>잘 모르겠어요</DontKnowText>
      </DontKnowButton>
      <NextButton onPress={nextButton}>
        <ButtonText>다음</ButtonText>
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
const Bubble = styled.View`
  position: absolute;
  width: 164px;
  height: 53px;
  padding: 0px;
  background: #363636;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  top: 50px;
  left: 180px;
  z-index: 1;
`;

const BubbleArrow = styled.View`
  position: absolute;
  border-style: solid;
  border-width: 0 8px 10px;
  border-color: #363636 transparent;
  display: block;
  width: 0;
  z-index: 1;
  top: -10px;
  left: 16px;
`;
const BubbleText = styled.Text`
  font-size: 11px;
  color: white;
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
const DontKnowButton = styled.TouchableOpacity`
  width: 99px;
  height: 40px;
  background-color: ${(props) => (props.isActive ? "#BFBFBF" : "#DDDDDD")};
  margin-bottom: 120px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
const DontKnowText = styled.Text`
  font-size: 13px;
`;
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: #bfbfbf;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const ButtonText = styled.Text``;
