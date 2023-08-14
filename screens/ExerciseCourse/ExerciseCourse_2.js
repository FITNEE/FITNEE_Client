import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Dimensions, Animated, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
import styled from "styled-components/native";
import ExerciseCard from "../../components/ExerciseCard";
import ExerciseButton from "../../components/ExerciseButton";
import CurrentExplainLine from "../../components/CurrentExplainLine";
import CurrentSet from "../../components/CurrentSet";
import { colors } from "../../colors";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import NextSet from "../../components/NextSet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useRoute, StackActions } from "@react-navigation/native";
import axios from "axios";
import { useRecoilState } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

const StartButton = styled.TouchableOpacity`
  padding: 8px 12px;
  height: 36px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: ${colors.l_main};
  width: 99px;
`;

const StartButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 19.5px;
`;

const ReplaceView2 = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ReplaceTextView = styled.View`
  align-items: baseline;
`;

const BottomSheetBack = styled.View`
  height: 100%;
`;

export default function ExerciseCourse_2({ navigation }) {
  const isDark = useRecoilState(IsDarkAtom);

  // const ExerciseCircle = styled.View`
  //   width: 307px;
  //   height: 307px;
  //   border-radius: 291px;
  //   background: ${isDark ? colors.black : colors.grey_1};
  //   margin-bottom: 24px;
  //   justify-content: center;
  //   align-items: center;
  // `;
  const ReplaceButton = styled.TouchableOpacity`
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 100px;
    background: ${isDark ? colors.grey_7 : colors.grey_3};
    margin-top: 18px;
    margin-bottom: 12px;
    margin-right: 242.5px;
  `;

  const ReplaceButtonText = styled.Text`
    color: ${isDark ? colors.white : colors.l_main};
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.5px;
  `;

  const NextView = styled.View`
    position: absolute;
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: ${isDark ? colors.white : colors.black};
    border-radius: 20px 20px 0px 0px;
    justify-content: space-between;
    padding: 22px 24px 0px 24px;
    z-index: 0;
  `;

  const NextText = styled.Text`
    color: ${isDark ? colors.black : colors.white};
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 22.5px;
    width: 230px;
    height: 24px;
  `;

  const ModalTitleView = styled.View`
    height: 59px;
    margin: 24px;
    background-color: ${isDark ? colors.grey_8 : colors.white};
  `;

  const ModalTitle = styled.Text`
    color: ${isDark ? colors.white : colors.black};
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
    margin-bottom: 4px;
  `;

  const ModalTitle2 = styled.Text`
    color: ${isDark ? colors.grey_2 : colors.grey_8};
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 22.5px;
  `;

  const SeperateLine = styled.View`
    height: 1px;
    background-color: ${isDark ? colors.grey_7 : colors.grey_2};
  `;

  const ReplaceView = styled.View`
    height: 92px;
    width: 100%;
    padding: 24px;
    align-items: center;
    background-color: ${isDark ? colors.grey_8 : colors.white};
    flex-direction: row;
    justify-content: space-between;
  `;

  const ReplaceCircle = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: ${isDark ? colors.grey_9 : colors.grey_2};
    margin-right: 16px;
  `;

  const ReplaceText1 = styled.Text`
    color: ${isDark ? colors.white : colors.black};
    text-align: center;
    font-size: 17px;
    font-weight: 500;
    line-height: 25.5px;
  `;

  const ReplaceText2 = styled.Text`
    color: ${isDark ? colors.grey_3 : colors.grey_7};
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
  `;

  const ReplaceButton2 = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 100px;
    background: ${isDark ? colors.grey_7 : colors.grey_3};
    margin-top: 18px;
    margin-bottom: 12px;
    width: 69px;
    height: 36px;
  `;

  const goToNextExercise = () => {
    setIsPlaying(false);
    navigation.dispatch(
      StackActions.replace("ExerciseCourse", {
        dataList: dataList,
        listIndex: listIndex + 1,
        totalTime: totalTime + restTime,
        routineIdx: routineIdx,
      })
    );
  };

  const pushReplace = async (healthCategoryIdx, name) => {
    let replacedData = [...dataList];

    replacedData[listIndex + 1].exerciseInfo.healthCategoryIdx =
      healthCategoryIdx;
    replacedData[listIndex + 1].exerciseInfo.exerciseName = name;

    navigation.dispatch(
      StackActions.replace("ExerciseCourse", {
        dataList: replacedData,
        listIndex: listIndex + 1,
        routineIdx: routineIdx,
        totalTime: totalTime,
      })
    );
  };

  const [isPlaying, setIsPlaying] = React.useState(true);
  const [duration, setDuration] = React.useState(30);

  //data route
  const route = useRoute();
  const dataList = route.params.dataList;
  const listIndex = route.params.listIndex;
  const routineIdx = route.params.routineIdx;
  const totalTime = route.params.totalTime;

  const [restTime, setRestTime] = useState(0);

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    min = minutes < 10 ? "0" + minutes : minutes;
    const seconds = remainingTime % 60;
    sec = seconds < 10 ? "0" + seconds : seconds;

    return `${min}:${sec}`;
  };

  const RestTime = ({ remainingTime }) => {
    return setRestTime(-1 * (30 - remainingTime));
  };

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["65%"], []);

  const handleClosePress = () => bottomSheetRef.current.close();

  const handleModal = () => {
    bottomSheetRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const [replaceList, setReplaceList] = useState([]);
  let healthCategoryIdx =
    dataList[listIndex + 1].exerciseInfo.healthCategoryIdx;

  const getReplaceData = async (routineIdx, healthCategoryIdx) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `/app/process/replace`;

      const response = await axios.get(url + detailAPI, {
        params: {
          routineIdx: routineIdx,
          healthCategoryIdx: healthCategoryIdx,
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
    getReplaceData(routineIdx, healthCategoryIdx).then((response) => {
      setReplaceList(response.result.replacementRecommendations);
      console.log(replaceList);
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.grey_9 : colors.grey_2,
      }}
    >
      <BottomSheetModalProvider>
        <ExerciseCard exerciseName="휴식 시간">
          <View
            style={{
              width: 307,
              height: 307,
              borderRadius: 291,
              backgroundColor: isDark ? colors.black : colors.grey_1,
              marginBottom: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={duration}
              colors={colors.d_main}
              size={315}
              strokeWidth={8}
              trailColor={isDark ? colors.grey_7 : colors.grey_3}
              onComplete={goToNextExercise}
              updateInterval={0.001}
              rotation={"counterclockwise"}
            >
              {({ remainingTime }) => (
                RestTime({ remainingTime }),
                (
                  <Text
                    style={{
                      color: isDark ? colors.white : colors.black,
                      fontSize: 56,
                    }}
                  >
                    {children({ remainingTime })}
                  </Text>
                )
              )}
            </CountdownCircleTimer>
          </View>

          <ReplaceButton onPress={handleModal}>
            <ReplaceButtonText>운동 대체하기</ReplaceButtonText>
          </ReplaceButton>

          <NextSet
            set="1"
            kg={dataList[listIndex + 1].sets[0].weight}
            num={dataList[listIndex + 1].sets[0].rep}
          />

          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{
              borderRadius: 20,
              backgroundColor: isDark ? colors.grey_8 : colors.white,
            }}
            backdropComponent={renderBackdrop}
          >
            <ModalTitleView>
              <ModalTitle>운동 대체하기</ModalTitle>
              <ModalTitle2>
                현재 운동과 유사한 효과의 운동을 추천해 드릴게요.
              </ModalTitle2>
            </ModalTitleView>
            <BottomSheetBack>
              <SeperateLine />

              {replaceList.map((item, healthCategoryIdx) => (
                <ReplaceView>
                  <ReplaceView2>
                    <ReplaceCircle />
                    <ReplaceTextView key={healthCategoryIdx}>
                      <ReplaceText1>{item.name}</ReplaceText1>
                      <ReplaceText2>
                        {item.parts} | {item.muscle} | {item.equipment}
                      </ReplaceText2>
                    </ReplaceTextView>
                  </ReplaceView2>
                  <ReplaceButton2
                    onPress={() => {
                      pushReplace(item.healthCategoryIdx, item.name);
                    }}
                  >
                    <ReplaceButtonText>대체하기</ReplaceButtonText>
                  </ReplaceButton2>
                </ReplaceView>
              ))}
            </BottomSheetBack>
          </BottomSheetModal>
        </ExerciseCard>
        <NextView>
          <NextText>
            {dataList[listIndex + 1].exerciseInfo.exerciseName}
          </NextText>
          <StartButton onPress={goToNextExercise}>
            <StartButtonText>바로 시작하기</StartButtonText>
          </StartButton>
        </NextView>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}
