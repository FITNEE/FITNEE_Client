import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import RoutineItem from "../components/RoutineItem";
import Scroll from "../components/Scroll";
import { useNavigationState, useRoute } from "@react-navigation/native";
import CreateRoutineHeader from "../components/CreateRoutineHeader";
import axios from "axios";
import { IsDarkAtom } from "../recoil/MyPageAtom";
import { useRecoilValue } from "recoil";

export default function CreateRoutine_5({ navigation }) {
  const [routine, SetRoutine] = useState("");
  const index = useNavigationState((state) => state.index);
  const isDark = useRecoilValue(IsDarkAtom);
  const [dayId, setDayId] = useState({
    monRoutineIdx: 0,
    tueRoutineIdx: 0,
    wedRoutineIdx: 0,
    thuRoutineIdx: 0,
    friRoutineIdx: 0,
    satRoutineIdx: 0,
    sunRoutineIdx: 0,
  });
  useEffect(() => {
    navigation.setOptions({
      header: () => <CreateRoutineHeader title="루틴 등록" index={index} />,
    });
  }, []);
  const route = useRoute();
  const responseData = route.params?.responseData;
  const currentRoutine = (routine) => {
    SetRoutine(routine);
  };
  const handleSubmit = async () => {
    try {
      console.log("test : ", routine);
      const response = await axios.post(
        "https://gpthealth.shop/app/routine/calendar",
        dayId,
        {
          headers: { "Content-Type": `application/json` },
        }
      );
      console.log("최종 루틴 결정 완료!! : ", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const selectRoutine = () => {
    handleSubmit();
    navigation.push("Home");
  };
  useEffect(() => {
    if (routine) {
      responseData[routine].item.map((item) => {
        switch (item.day) {
          case "Sunday":
            setDayId((prev) => ({
              ...prev,
              sunRoutineIdx: item.routineIdx,
            }));
            break;
          case "Monday":
            setDayId((prev) => ({
              ...prev,
              monRoutineIdx: item.routineIdx,
            }));
            break;
          case "Tuesday":
            setDayId((prev) => ({
              ...prev,
              tueRoutineIdx: item.routineIdx,
            }));
            break;
          case "Wednesday":
            setDayId((prev) => ({
              ...prev,
              wedRoutineIdx: item.routineIdx,
            }));
            break;
          case "Thursday":
            setDayId((prev) => ({
              ...prev,
              thuRoutineIdx: item.routineIdx,
            }));
            break;
          case "Friday":
            setDayId((prev) => ({
              ...prev,
              friRoutineIdx: item.routineIdx,
            }));
            break;
          case "Saturday":
            setDayId((prev) => ({
              ...prev,
              satRoutineIdx: item.routineIdx,
            }));
            break;

          default:
            break;
        }
      });
    }
  }, [routine]);

  return (
    <Container isDark={isDark}>
      <SafeAreaView>
        <TitleContainer>
          <Title isDark={isDark}>루틴이 생성되었어요!</Title>
          <SubTitle isDark={isDark}>
            {`회원님의 답변을 기반으로 최적의 플랜을 만들었어요.
         가장 마음에 드는 플랜을 선택해주세요.`}
          </SubTitle>
        </TitleContainer>
        <ScrollContainer>
          <Scroll
            isDark={isDark}
            data={responseData}
            currentRoutine={currentRoutine}
          />
        </ScrollContainer>
        <NextButton isDark={isDark} onPress={selectRoutine}>
          <ButtonText isDark={isDark}>이 루틴으로 결정</ButtonText>
        </NextButton>
      </SafeAreaView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
`;
const SafeAreaView = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`;
const TitleContainer = styled.View`
  width: 90%;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`;
const SubTitle = styled.Text`
  font-size: 15px;
  margin-top: 5px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`;
const ScrollContainer = styled.View`
  /* height: 600px; */
`;

const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.d_main};
  border-radius: 10px;
  /* margin-bottom: 50px; */
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: ${(props) => (props.isDark ? colors.black : colors.white)};
`;
