import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { styled } from "styled-components/native";
import Records from "../../components/myPage/Records";
import Analysis from "../../components/myPage/Analysis";
import { colors } from "../../colors";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { IsDarkAtom, TabBarAtom } from "../../recoil/MyPageAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Choice = styled.View`
  margin-top: 10px;
  margin-left: 24px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;
const ChoiceButton = styled.TouchableOpacity`
  display: block;
  padding-bottom: 2px;
`;

export default function MyPage(props) {
  const isFocus = useIsFocused();
  const isDark = useRecoilValue(IsDarkAtom);
  const setIsTabVisible = useSetRecoilState(TabBarAtom);

  useEffect(() => {
    isFocus && setIsTabVisible(true);
  }, [isFocus]);

  const [date, setDate] = useState([]);

  const [now, setNow] = useState(new Date());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const getMyPageData = async (month) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage?month=${month}`;
      const response = await axios.get(url + detailAPI);
      const dateResult = response.data;
      return dateResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getMyPageData(month).then((dateResult) => {
      setDate(dateResult.result);
    });
  }, []);

  const todayFormat = now.toISOString().substring(0, 10).replace(/-/g, "");
  const [checkedDate, setCheckedDate] = useState(todayFormat);
  const [exerciseInfo, setExerciseInfo] = useState([]);
  const [totalCalories, setTotalCalories] = useState();
  const [totalWeight, setTotalWeight] = useState();
  const [totalTime, setTotalTime] = useState();
  const [totalDist, setTotalDist] = useState();

  const getDayHealth = async (checkedDate) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/exercise?date=${checkedDate}`;
      const response = await axios.get(url + detailAPI);
      const checkResult = response.data;
      return checkResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getDayHealth(checkedDate).then((checkResult) => {
      checkResult.code == 709 &&
        setExerciseInfo([
          {
            exerciseInfo: {
              exerciseName: "",
              healthCategoryIdx: 0,
              weight: 0,
            },
            order: 1,
          },
        ]) &
          setTotalCalories(0) &
          setTotalWeight(0) &
          setTotalTime(0) &
          setTotalDist(0);
      checkResult.code == 1000 &&
        setExerciseInfo(checkResult.result.exercise) &
          setTotalCalories(checkResult.result.totalCalories) &
          setTotalWeight(checkResult.result.totalWeight) &
          setTotalTime(checkResult.result.totalTime) &
          setTotalDist(checkResult.result.totalDist);
      console.log(checkResult);
    });
  }, []);
  const [weekData, setWeekData] = useState();

  const getWeekHealth = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/record`;
      const response = await axios.get(url + detailAPI);
      const weekResult = response.data;
      return weekResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getWeekHealth().then((weekResult) => {
      setWeekData(weekResult.result);
      console.log(weekResult.result);
    });
  }, []);

  const [showRecords, SetShowRecords] = useState(true);

  const Container = styled.ScrollView`
    background-color: ${isDark ? colors.d_background : colors.l_background};
  `;
  const ChoiceText = styled.Text`
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 25.5px;
    color: ${isDark ? colors.grey_6 : colors.grey_3};
  `;
  const SelectedTextStyle = {
    color: isDark ? colors.white : colors.black,
  };
  const SelectedBoxStyle = {
    borderBottomWidth: 2,
    borderColor: isDark ? colors.d_main : colors.l_main,
  };

  return (
    <SafeAreaView>
      <Container>
        <Choice>
          <ChoiceButton
            onPress={() => {
              SetShowRecords(true);
            }}
            style={showRecords && SelectedBoxStyle}
          >
            <ChoiceText style={showRecords && SelectedTextStyle}>
              운동 기록
            </ChoiceText>
          </ChoiceButton>
          <ChoiceButton
            onPress={() => {
              SetShowRecords(false);
            }}
            style={!showRecords && SelectedBoxStyle}
          >
            <ChoiceText style={!showRecords && SelectedTextStyle}>
              운동 분석 및 현황
            </ChoiceText>
          </ChoiceButton>
        </Choice>
        {showRecords && <Records exerciseDays={date} month={month} />}
        {!showRecords && <Analysis weekData={weekData} />}
      </Container>
    </SafeAreaView>
  );
}
