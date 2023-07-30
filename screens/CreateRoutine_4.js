import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigationState } from "@react-navigation/native";
import CreateRoutineHeader from "../components/CreateRoutineHeader";

export default function CreateRoutine_4({ navigation }) {
  const [select, SetSelect] = useState(false);
  const [allDay, SetAllDay] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [days, setDays] = useState([
    { id: 1, name: "일", selected: false },
    { id: 2, name: "월", selected: false },
    { id: 3, name: "화", selected: false },
    { id: 4, name: "수", selected: false },
    { id: 5, name: "목", selected: false },
    { id: 6, name: "금", selected: false },
    { id: 7, name: "토", selected: false },
  ]);
  const index = useNavigationState((state) => state.index);
  useEffect(() => {
    if (loading) {
      navigation.setOptions({
        header: () => <CreateRoutineHeader title="루틴 등록" index={4} />,
      });
    } else {
      navigation.setOptions({
        header: () => <CreateRoutineHeader title="루틴 등록" index={index} />,
      });
    }
  }, [loading]);
  const nextPress = () => {
    SetLoading(true);
    const timer = setTimeout(() => {
      navigation.push("CreateRoutine_5");
    }, 2000);
    return () => clearTimeout(timer);
  };
  const onDayPress = (id) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.id === id ? { ...day, selected: !day.selected } : day
      )
    );
  };
  useEffect(() => {
    SetSelect(
      days[0].selected ||
        days[1].selected ||
        days[2].selected ||
        days[3].selected ||
        days[4].selected ||
        days[5].selected ||
        days[6].selected
    );
  }, [days]);
  const AllDayPress = () => {
    SetAllDay(!allDay);
  };
  useEffect(() => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        allDay ? { ...day, selected: true } : { ...day, selected: false }
      )
    );
  }, [allDay]);
  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <Loading />
          <LoadingText>트레이닝 루틴을 생성 중입니다</LoadingText>
        </LoadingContainer>
      ) : (
        <Container>
          <TitleContainer>
            <Title>운동할 요일을 선택해주세요.</Title>
            <SubTitle>마이루틴에서 언제든지 변경할 수 있어요.</SubTitle>
          </TitleContainer>
          <DayContainer>
            {days.map((day) => (
              <DayItem
                key={day.id}
                onPress={() => onDayPress(day.id)}
                style={{ backgroundColor: day.selected ? "#757575" : "white" }}
              >
                <DayName style={{ color: day.selected ? "white" : "#757575" }}>
                  {day.name}
                </DayName>
              </DayItem>
            ))}
          </DayContainer>
          <AllDayButton isActive={allDay} onPress={AllDayPress}>
            <AllDayText>매일 운동할래요</AllDayText>
          </AllDayButton>
          <NextButton isActive={select} disabled={!select} onPress={nextPress}>
            <ButtonText isActive={select}>선택 완료</ButtonText>
          </NextButton>
        </Container>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
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
const DayName = styled.Text`
  color: #757575;
`;
const AllDayButton = styled.TouchableOpacity`
  width: 110px;
  height: 40px;
  background-color: ${(props) => (props.isActive ? "#BFBFBF" : "#DDDDDD")};
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
  background-color: ${(props) => (props.isActive ? "#BFBFBF" : "#DDDDDD")};
  border-radius: 10px;
  margin-bottom: 45px;
`;
const ButtonText = styled.Text`
  color: ${(props) => (props.isActive ? "black" : "#757575")};
`;
const LoadingContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
`;
const Loading = styled.View`
  width: 291px;
  height: 291px;
  background-color: white;
  border-radius: 291px;
`;
const LoadingText = styled.Text`
  margin-top: 30px;
`;
