import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Dimensions, Animated, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
import styled from "styled-components/native";
import ExerciseCard from "../../components/exerciseCourse/ExerciseCard";
import { colors } from "../../colors";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import NextSet from "../../components/exerciseCourse/NextSet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useRoute, StackActions } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";
import ArrowCircle from "../../assets/SVGs/ArrowCircle.svg";
import Close from "../../assets/SVGs/Close.svg";
import ExerciseButton from "../../components/exerciseCourse/ExerciseButton";
import { useFocusEffect } from "@react-navigation/native";

const StartButton = styled.TouchableOpacity`
  padding: 8px 12px;
  height: 36px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100%;
  background: ${colors.l_main};
  width: 99px;
  margin-right: 24px;
`;

const StartButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 13px;
  font-family: Pretendard-SemiBold;
  line-height: 19.5px;
`;

const ExerciseCircle = styled.View`
  width: 307px;
  height: 307px;
  border-radius: 291px;
  background: ${({ isDark }) => (isDark ? colors.black : colors.grey_1)};
  margin-bottom: 70px;
  justify-content: center;
  align-items: center;
`;

const TimerText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 56px;
  font-family: Pretendard-Regular;
`;

const StopExercise = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  right: 24px;
`;

const BlankBox = styled.View`
  height: 131px;
`;

export default function ExerciseCourse_2_2({
  navigation,
  dataList,
  listIndex,
  totalTime,
  routineIdx,
  setId,
  toggleShowExerciseCourse2_2,
}) {
  const goToStartExercise = () => {
    navigation.navigate("StartExercise");
  };

  const goToNextExercise = () => {
    setIsPlaying(false);
    navigation.dispatch(
      StackActions.replace("ExerciseCourse", {
        dataList: dataList,
        listIndex: listIndex + 1,
        totalTime: totalTime - restTime,
        routineIdx: routineIdx,
      })
    );
  };

  const OpenConfirm = () => {
    Alert.alert(
      "현재 진행중인 운동루틴을 중단하시겠습니까?",
      "현재까지 운동하신 내용은 저장되지 않습니다.",
      [
        { text: "취소", onPress: () => console.log("Cancel Stop") },
        {
          text: "운동 중단하기",
          onPress: goToStartExercise,
          style: "destructive",
        },
      ]
    );
  };

  const [isPlaying, setIsPlaying] = React.useState(true);
  const [duration, setDuration] = React.useState(30);
  const [isLast, setIsLast] = useState(false);

  // //data route
  // const route = useRoute();
  // const dataList = route.params.dataList;
  // const listIndex = route.params.listIndex;
  // const routineIdx = route.params.routineIdx;
  // const totalTime = route.params.totalTime;

  const [restTime, setRestTime] = useState(0);

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    min = minutes < 10 ? "0" + minutes : minutes;
    const seconds = remainingTime % 60;
    sec = seconds < 10 ? "0" + seconds : seconds;

    return `${min}:${sec}`;
  };

  //   const RestTime = ({ remainingTime }) => {
  //     return setRestTime(30 - remainingTime);
  //   };

  const isDark = useRecoilValue(IsDarkAtom);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.grey_9 : colors.grey_2,
      }}
    >
      <ExerciseCard isDark={isDark} exerciseName="휴식 시간">
        <StopExercise onPress={() => OpenConfirm()}>
          <Close
            width={24}
            height={24}
            color={isDark ? colors.white : colors.black}
          />
        </StopExercise>
        <ExerciseCircle isDark={isDark}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={duration}
            colors={colors.d_main}
            size={315}
            strokeWidth={8}
            trailColor={isDark ? colors.grey_7 : colors.grey_3}
            onComplete={toggleShowExerciseCourse2_2}
            updateInterval={0.001}
            rotation={"counterclockwise"}
          >
            {({ remainingTime }) => (
              //RestTime({ remainingTime }),
              <TimerText isDark={isDark}>
                {children({ remainingTime })}
              </TimerText>
            )}
          </CountdownCircleTimer>
        </ExerciseCircle>

        <NextSet
          set="1"
          kg={dataList[listIndex].sets[0].weight}
          num={dataList[listIndex].sets[0].rep}
          isDark={isDark}
        />
        {/* <NextSet
          set="2"
          kg={dataList[listIndex + 1].sets[1].weight}
          num={dataList[listIndex + 1].sets[1].rep}
          isDark={isDark}
        /> */}
        <BlankBox />

        <ExerciseButton //운동 시작 버튼
          text="바로 시작하기"
          disabled={false}
          onPress={toggleShowExerciseCourse2_2}
          //onPress={goToCompleteExercise}
          isDark={isDark}
        />
      </ExerciseCard>
    </SafeAreaView>
  );
}
