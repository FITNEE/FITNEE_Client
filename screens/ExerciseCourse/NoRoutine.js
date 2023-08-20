import React, { useEffect } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TabBarAtom, IsDarkAtom } from "../../recoil/MyPageAtom";
import { useIsFocused } from "@react-navigation/native";
import { processDayData } from "../../components/myRoutine/Functions";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background: ${({ isDark }) => (isDark ? colors.grey_9 : colors.grey_1)};
`;

const RoutineText = styled.Text`
  font-size: 20px;
  font-family: Pretendard-SemiBold;
  line-height: 32px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  padding-bottom: 10px;
`;

const RoutineExplain = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
`;

const RoutineCircle = styled.View`
  width: 125px;
  height: 125px;
  background: ${({ isDark }) => (isDark ? colors.black : colors.white)};
  border-radius: 100%;
  margin-bottom: 8px;
`;

export default function NoRoutine({ navigation }) {
  const isFocus = useIsFocused();
  const isDark = useRecoilValue(IsDarkAtom);
  const setIsTabVisible = useSetRecoilState(TabBarAtom);

  const now = new Date();
  let day2 = (now.getDay() + 6) % 7;

  useEffect(() => {
    // async function fetchData() {
    //   const routineData = await getRoutineData();
    //   const dayRoutineArr = processDayData(routineData.result);
    //   const dayRoutineIdx = dayRoutineArr[day2].routineId;
    //   console.log(dayRoutineIdx);
    //   if (dayRoutineIdx !== 0)
    //     navigation.dispatch(StackActions.replace("StartExercise"));
    // }
    // fetchData();
    isFocus && setIsTabVisible(true);
  }, [isFocus, setIsTabVisible]);

  const getRoutineData = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `/app/routine/calendar`;

      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.grey_9 : colors.grey_1,
      }}
    >
      <Container isDark={isDark}>
        <RoutineCircle isDark={isDark}></RoutineCircle>
        <RoutineText isDark={isDark}>오늘은 운동이 없어요</RoutineText>
        <RoutineExplain isDark={isDark}>
          오늘 운동을 하시려면 루틴을 수정해주세요.
        </RoutineExplain>
      </Container>
    </SafeAreaView>
  );
}
