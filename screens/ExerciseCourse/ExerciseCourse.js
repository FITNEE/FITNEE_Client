import React, {
  View,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { TextInput, Dimensions, Animated, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
import styled from "styled-components/native";
import ExerciseCard from "../../components/ExerciseCard";
import ExerciseButton from "../../components/ExerciseButton";
import CurrentExplainLine from "../../components/CurrentExplainLine";
import CurrentSet from "../../components/CurrentSet";
import { colors } from "../../colors";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useRoute, StackActions } from "@react-navigation/native";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

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

const SkipExercrise = styled.TouchableOpacity`
  width: 85px;
  height: 20px;
  position: relative;
  margin-top: 16px;
`;

export default function ExerciseCourse({ navigation }) {
  const isDark = useRecoilValue(IsDarkAtom);

  const ExerciseCircle = styled.View`
    width: 307px;
    height: 307px;
    border-radius: 291px;
    background: ${isDark ? colors.black : colors.grey_1};
  `;

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

  const CurrentExplain = styled.View`
    width: 327px;
    height: 108px;
    border-radius: 12px;
    background: ${isDark ? colors.grey_8 : colors.grey_1};
    padding: 24px;
    justify-content: center;
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

  const SkipExercriseText = styled.Text`
    color: ${isDark ? colors.grey_2 : colors.grey_8};
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.5px;
    text-decoration-line: underline;
  `;

  const goToCompleteExercise = () => {
    navigation.dispatch(
      StackActions.replace("ExerciseCourse_1", {
        dataList: dataList,
        listIndex: listIndex,
        routineIdx: routineIdx,
        totalTime: totalTime,
      })
    );
  };

  const inputRef = useRef();
  //opacity를 위해
  const timerAnimation = useRef(new Animated.Value(0)).current;
  //타이머 숫자를 위해
  const textInputAnimation = useRef(new Animated.Value(3)).current;
  const zIndexAnimation = useRef(new Animated.Value(0)).current;
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["70%"], []);
  const route = useRoute();
  const dataList = route.params.dataList;
  const listIndex = route.params.listIndex;
  const routineIdx = route.params.routineIdx;
  const totalTime = route.params.totalTime;
  console.log("index:", listIndex);
  console.log("time:", totalTime);

  const [replaceList, setReplaceList] = useState([]);
  const Week = new Array("sun", "mon", "tue", "wed", "thu", "fri", "sat");

  const now = new Date();
  let day = Week[now.getDay()];
  let healthCategoryIdx = dataList[listIndex].exerciseInfo.healthCategoryIdx;

  const getReplaceData = async (routineIdx, healthCategoryIdx) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `/app/process/replace/`;

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

  // const patchReplaceData = async (
  //   routineIdx,
  //   beforeHealthCategoryIdx,
  //   afterHealthCategoryIdx
  // ) => {
  //   try {
  //     let url = "https://gpthealth.shop/";
  //     let detailAPI = `/app/process/replace?routineIdx=${routineIdx}`;

  //     const response = await axios.patch(url + detailAPI, {
  //       beforeHealthCategoryIdx: beforeHealthCategoryIdx,
  //       afterHealthCategoryIdx: afterHealthCategoryIdx,
  //     });
  //     const result = response.data;
  //     console.log("patchR" + result);
  //     return result;
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  useEffect(() => {
    getReplaceData(routineIdx, healthCategoryIdx).then((response) => {
      setReplaceList(response.result.replacementRecommendations);
      console.log(replaceList);
    });
  }, []);

  const handleModal = () => {
    bottomSheetRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  useEffect(() => {
    const listener = textInputAnimation.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });

    return () => {
      textInputAnimation.removeListener(listener);
      textInputAnimation.removeAllListeners();
    };
  });
  const animation = React.useCallback(() => {
    Animated.sequence([
      Animated.parallel([
        //숫자가 duration동안 3에서 1로
        Animated.timing(textInputAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),

        Animated.timing(zIndexAnimation, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),

        //배경이 3초동안 불투명. 불투명해지는데 걸리는 시간이 duration
        Animated.timing(timerAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),

      //1이 더 오래 보이게
      Animated.delay("300"),

      Animated.parallel([
        Animated.timing(timerAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),

        Animated.timing(zIndexAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),

        Animated.timing(textInputAnimation, {
          toValue: 3,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      //배경이 사라진다. 투명해지는데 걸리는 시간이 duration
    ]).start(goToCompleteExercise);
  }, []);

  const styles = StyleSheet.create({
    text: {
      color: colors.white,
      textAlign: "center",
      fontSize: 80,
      fontWeight: "600",
    },
  });

  const adviceList = dataList[listIndex].exerciseInfo.caution.map((item) => (
    <CurrentExplainLine expl={item} />
  ));

  const pushReplace = async (healthCategoryIdx, name) => {
    //대체
    let replacedData = [...dataList];

    //healthCategoryIdx, name 변경
    replacedData[listIndex].exerciseInfo.healthCategoryIdx = healthCategoryIdx;
    replacedData[listIndex].exerciseInfo.exerciseName = name;

    // await patchReplaceData(
    //   routineIdx,
    //   dataList[listIndex].exerciseInfo.healthCategoryIdx,
    //   item.healthCategoryIdx
    // );

    navigation.dispatch(
      StackActions.replace("ExerciseCourse", {
        dataList: replacedData,
        listIndex: listIndex,
        routineIdx: routineIdx,
        totalTime: totalTime,
      })
    );
  };

  const goToNextExercise = async () => {
    //스킵, skip 추가
    let modifiedDataList = [...dataList];
    modifiedDataList[listIndex] = {
      ...modifiedDataList[listIndex],
      skip: 1,
    };

    if (listIndex + 1 >= dataList.length) {
      await postTotalData(routineIdx, totalTime, dataList);

      // 조건이 충족되면 원하는 화면(FinalScreen)으로 이동합니다.
      navigation.dispatch(
        StackActions.replace("CompleteExercise", {
          dataList: modifiedDataList,
          totalTime: totalTime,
          routineIdx: routineIdx,
        })
      );
    } else {
      navigation.dispatch(
        StackActions.replace("ExerciseCourse", {
          dataList: modifiedDataList,
          listIndex: listIndex + 1,
          routineIdx: routineIdx,
          totalTime: totalTime,
        })
      );
    }
  };

  const postTotalData = async (routineIdx, totalTime, dataList) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `/app/process/end`;

      const response = await axios.post(url + detailAPI, {
        routineIdx: routineIdx,
        totalExerciseTime: totalTime,
        routineDetails: dataList,
      });

      const result = response.data;
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error", error);
    }
  };

  const OpenConfirm2 = () => {
    Alert.alert(
      "운동을 건너뛰겠습니까?",
      "건너뛴 이후에는 다시 실행할 수 없습니다.",
      [
        { text: "취소", onPress: () => console.log(" Stop") },
        {
          text: "건너뛰기",
          onPress: goToNextExercise,
          style: "destructive",
        },
      ]
    );
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDark ? colors.grey_9 : colors.grey_2,
        }}
      >
        <ExerciseCard
          exerciseName={dataList[listIndex].exerciseInfo.exerciseName}
        >
          <ExerciseCircle></ExerciseCircle>

          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                justifyContent: "center",
                width,
                height,
                opacity: timerAnimation,
                backgroundColor: "rgba(38, 38, 38, 0.40)",
                zIndex: zIndexAnimation,
              },
            ]}
          />

          <Animated.View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              height: "92%",
              opacity: timerAnimation,
              zIndex: zIndexAnimation,
            }}
          >
            <TextInput
              ref={inputRef}
              style={styles.text}
              defaultValue={"3"}
              Opacity={"1"}
              editable={false}
            />
          </Animated.View>

          <ReplaceButton disabled={false} onPress={handleModal}>
            <ReplaceButtonText>운동 대체하기</ReplaceButtonText>
          </ReplaceButton>

          <CurrentSet
            set={dataList[listIndex].sets[0].set + 1}
            kg={dataList[listIndex].sets[0].weight}
            num={dataList[listIndex].sets[0].rep}
          />

          <CurrentExplain>{adviceList}</CurrentExplain>

          <ExerciseButton //운동 시작 버튼
            text="운동 시작"
            disabled={false}
            onPress={animation}
            //onPress={goToCompleteExercise}
          />
          <SkipExercrise onPress={() => OpenConfirm2()}>
            <SkipExercriseText>이 운동 건너뛰기</SkipExercriseText>
          </SkipExercrise>

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
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}
