import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigationState } from "@react-navigation/native";
import CreateRoutineHeader from "../components/CreateRoutineHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import { CreateRoutineAtom } from "../recoil/CreateRoutineAtom";
import axios from "axios";
import { colors } from "../colors";
import { Text } from "react-native";
import CreateRoutineError from "../components/CreateRoutineError";
import { IsDarkAtom } from "../recoil/MyPageAtom";

export default function CreateRoutine_4({ navigation }) {
  const [select, SetSelect] = useState(false);
  const [allDay, SetAllDay] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [error, SetError] = useState(false);
  const [routine, setRoutine] = useRecoilState(CreateRoutineAtom);
  const isDark = useRecoilValue(IsDarkAtom);
  const [days, setDays] = useState([
    { id: 1, name: "일", selected: false, ename: "Sunday" },
    { id: 2, name: "월", selected: false, ename: "Monday" },
    { id: 3, name: "화", selected: false, ename: "Tuesday" },
    { id: 4, name: "수", selected: false, ename: "Wednesday" },
    { id: 5, name: "목", selected: false, ename: "Thursday" },
    { id: 6, name: "금", selected: false, ename: "Friday" },
    { id: 7, name: "토", selected: false, ename: "Saturday" },
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
  // useEffect(() => {
  //   console.log("atom4 : ", routine);
  // }, [routine]);
  useEffect(() => {
    if (loading) {
      handleSubmit();
    }
  }, [routine]);

  const nextPress = () => {
    const selectedDays = days
      .filter((day) => day.selected)
      .map((day) => day.ename);
    setRoutine((prev) => ({
      ...prev,
      dayOfWeeks: selectedDays,
    }));
    SetLoading(true);
  };
  const retryPress = () => {
    handleSubmit();
    SetError(false);
  };

  const handleSubmit = async () => {
    try {
      console.log("test : ", routine);
      const response = await axios.post(
        "https://gpthealth.shop/app/routine",
        routine,
        {
          headers: { "Content-Type": `application/json` },
        }
      );
      console.log("Response:", response.data);
      if (response.data.isSuccess) {
        SetLoading(false);
        navigation.push("CreateRoutine_5", {
          responseData: response.data.result,
        });
      } else {
        console.log("Error :", response.data);
        SetError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      SetError(true);
    }
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
    SetAllDay(
      days[0].selected &&
        days[1].selected &&
        days[2].selected &&
        days[3].selected &&
        days[4].selected &&
        days[5].selected &&
        days[6].selected
    );
  }, [days]);
  const AllDayPress = () => {
    SetAllDay(!allDay);
    setDays((prevDays) =>
      prevDays.map((day) =>
        !allDay ? { ...day, selected: true } : { ...day, selected: false }
      )
    );
  };

  return (
    <Container isDark={isDark}>
      {error ? (
        <CreateRoutineError
          isDark={isDark}
          retryPress={retryPress}
          navigation={navigation}
        />
      ) : loading ? (
        <LoadingContainer isDark={isDark}>
          <Loading isDark={isDark} />
          <LoadingText isDark={isDark}>
            트레이닝 루틴을 생성 중입니다
          </LoadingText>
        </LoadingContainer>
      ) : (
        <Container isDark={isDark}>
          <TitleContainer>
            <Title isDark={isDark}>운동할 요일을 선택해주세요.</Title>
            <SubTitle isDark={isDark}>
              마이루틴에서 언제든지 변경할 수 있어요.
            </SubTitle>
          </TitleContainer>
          <DayContainer>
            {days.map((day) => (
              <DayItem
                key={day.id}
                onPress={() => onDayPress(day.id)}
                style={{
                  backgroundColor: allDay
                    ? isDark
                      ? "#1E1B29"
                      : colors.l_sub_2
                    : day.selected
                    ? colors.l_main
                    : isDark
                    ? colors.grey_9
                    : colors.white,
                  borderWidth: allDay ? 1 : 0,
                  borderColor: allDay
                    ? colors.l_main
                    : day.selected
                    ? colors.l_main
                    : colors.white,
                }}
              >
                <DayName
                  style={{
                    color: allDay
                      ? colors.l_main
                      : isDark
                      ? colors.white
                      : day.selected
                      ? colors.white
                      : colors.black,
                  }}
                >
                  {day.name}
                </DayName>
              </DayItem>
            ))}
          </DayContainer>
          <AllDayButton isDark={isDark} isActive={allDay} onPress={AllDayPress}>
            <AllDayText isDark={isDark} isActive={allDay}>
              매일 운동할래요
            </AllDayText>
          </AllDayButton>
          <NextButton
            isDark={isDark}
            isActive={select}
            disabled={!select}
            onPress={nextPress}
          >
            <ButtonText isDark={isDark} isActive={select}>
              선택 완료
            </ButtonText>
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
  justify-content: space-around;
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
`;
const TitleContainer = styled.View`
  width: 90%;
  margin-bottom: 60px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`;
const SubTitle = styled.Text`
  font-size: 12px;
  margin-top: 10px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
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
  background-color: ${(props) =>
    props.isActive
      ? colors.l_main
      : props.isDark
      ? colors.grey_7
      : colors.grey_3};
  margin-bottom: 50px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
const AllDayText = styled.Text`
  font-size: 13px;
  color: ${(props) =>
    props.isActive ? colors.white : props.isDark ? colors.white : colors.black};
`;
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isActive
      ? colors.l_main
      : props.isDark
      ? colors.grey_8
      : colors.grey_3};
  border-radius: 10px;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: ${(props) =>
    props.isActive
      ? props.isDark
        ? colors.black
        : colors.white
      : props.isDark
      ? colors.white
      : colors.black};
`;
const LoadingContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
`;
const Loading = styled.View`
  width: 291px;
  height: 291px;
  background-color: white;
  border-radius: 291px;
  background-color: ${(props) => (props.isDark ? colors.grey_9 : colors.white)};
`;
const LoadingText = styled.Text`
  margin-top: 30px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`;
