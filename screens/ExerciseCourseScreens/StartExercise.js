import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ProgressCircle from "../../components/ProgressCircle1";
import GrayCircle from "../../components/GrayCircle";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton } from "../../Shared";
import { colors } from "../../colors";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background: ${colors.white};
`;

const ExerciseText = styled.Text`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  line-height: 33.6px;
`;

const ExerciseExplainText = styled.Text`
  padding: 8px;
  color: #9747ff;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px;
  margin-bottom: 41px;
`;

const ExerciseButton = styled.TouchableOpacity`
  width: 111px;
  height: 111px;
  flex-shrink: 0;
  border-radius: 55.5px;
  background: ${colors.l_main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExerciseButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 33.6px;
`;

const ExerciseRec = styled.View`
  width: 311px;
  height: 175px;
  border-radius: 12px;
  background: ${colors.grey_1};
  margin-bottom: 33px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const RecText1 = styled.Text`
  color: ${colors.grey_7};
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  width: 188px;
`;

const RecText2 = styled.Text`
  color: ${colors.grey_7};
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  width: 55px;
`;

const RecText3 = styled.Text`
  color: ${colors.grey_7};
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  width: 36px;
`;

const FirstRecText1 = styled.Text`
  color: ${colors.grey_7};
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  width: 188px;
`;

const FirstRecText2 = styled.Text`
  color: ${colors.grey_7};
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  width: 55px;
`;

const FirstRecText3 = styled.Text`
  color: ${colors.grey_7};
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  width: 36px;
`;

const RecTextLine = styled.View`
  flex-direction: row;
  width: 279px;
  margin-bottom: 4px;
`;

const CirclesLine = styled.View`
  flex-direction: row;
  width: 256px;
  justify-content: space-around;
`;

export default function StartExercise({ navigation }) {
  const Week = new Array("sun", "mon", "tue", "wed", "thu", "fri", "sat");

  const now = new Date();
  let day = Week[now.getDay()];

  const goToExerciseCourse = () =>
    navigation.navigate("ExerciseCourse", {
      dataList: dataList,
      listIndex: 0,
      routineIdx: routineIdx,
      totalTime: 0,
    });

  const [dataList, setDataList] = useState([]);
  const [circleList, setCircleList] = useState([]);

  const getExerciseData = async (day) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `/app/process/`;

      const response = await axios.get(url + detailAPI, {
        params: {
          dayOfWeek: day,
        },
      });
      const result = response.data;
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getExerciseData(day).then((response) => {
      setDataList(response.result.routineDetails);
      setCircleList(response.result);
    });
  }, []);

  const routineIdx = circleList?.routineIdx;

  const exerciseList = dataList.map((result) => (
    <RecTextLine key={result.exerciseInfo.healthCategoryIdx}>
      <RecText1>{result.exerciseInfo.exerciseName}</RecText1>
      <RecText2 />
      <RecText3>{result.totalSets}세트</RecText3>
    </RecTextLine>
  ));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Container>
        <BackButton onPress={() => navigation.goBack()} />
        <ExerciseText>운동을 시작해 볼까요?</ExerciseText>
        <ExerciseExplainText> </ExerciseExplainText>

        <CirclesLine>
          <ProgressCircle
            num={Math.ceil(circleList?.totalTime / 60)}
            unit="분"
            title="예상 소요시간"
            bubbleOn={false}
          />
          <ProgressCircle
            num="30"
            unit="초"
            title="세트간 휴식"
            bubbleOn={false}
          />
          <GrayCircle
            num={circleList?.totalCalories}
            unit="kcal"
            title="소모 칼로리"
            bubbleOn={false}
          />
        </CirclesLine>

        <ExerciseRec>
          <ScrollView>{exerciseList}</ScrollView>
        </ExerciseRec>

        <ExerciseButton onPress={goToExerciseCourse}>
          <ExerciseButtonText>시작</ExerciseButtonText>
        </ExerciseButton>
      </Container>
    </SafeAreaView>
  );
}
