import React, {
  View,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
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

const ExerciseCircle = styled.View`
  width: 307px;
  height: 307px;
  border-radius: 291px;
  background: ${colors.grey_1};
`;

const ReplaceButton = styled.TouchableOpacity`
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: ${colors.grey_3};
  margin-top: 18px;
  margin-bottom: 12px;
  margin-right: 242.5px;
`;

const ReplaceButtonText = styled.Text`
  color: ${colors.l_main};
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
  background: ${colors.grey_1};
  padding: 24px;
  justify-content: center;
`;

const ModalTitle = styled.Text`
  color: ${colors.black};
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 4px;
`;

const ModalTitle2 = styled.Text`
  color: ${colors.grey_8};
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.5px;
`;

const ModalTitleView = styled.View`
  height: 59px;
  margin: 24px;
`;

const SeperateLine = styled.View`
  height: 1px;
  background-color: ${colors.grey_2};
`;

const ReplaceView = styled.View`
  height: 92px;
  width: 375px;
  padding: 24px;
  align-items: center;
  background-color: ${colors.white};
  flex-direction: row;
  justify-content: space-between;
`;

const ReplaceView2 = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ReplaceCircle = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: ${colors.grey_2};
  margin-right: 16px;
`;

const ReplaceTextView = styled.View`
  align-items: baseline;
`;

const ReplaceText1 = styled.Text`
  color: ${colors.black};
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  line-height: 25.5px;
`;

const ReplaceText2 = styled.Text`
  color: ${colors.grey_7};
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
  background: ${colors.grey_3};
  margin-top: 18px;
  margin-bottom: 12px;
  width: 69px;
  height: 36px;
`;

const BottomSheetBack = styled.View`
  background-color: ${colors.grey_1};
  height: 100%;
`;

export default function ExerciseCourse({ navigation }) {
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
  const snapPoints = useMemo(() => ["65%"], []);
  const route = useRoute();
  const dataList = route.params.dataList;
  const listIndex = route.params.listIndex;
  const routineIdx = route.params.routineIdx;
  const totalTime = route.params.totalTime;
  console.log("l", listIndex);
  console.log("t", totalTime);

  const [replaceList, setReplaceList] = useState([]);
  const Week = new Array("sun", "mon", "tue", "wed", "thu", "fri", "sat");

  const now = new Date();
  let day = Week[now.getDay()];
  let healthCategoryIdx = dataList[listIndex].exerciseInfo.healthCategoryIdx;
  // let healthCategoryIdx = 14;

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

  const postReplaceData = async (routineIdx) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/process/${routineIdx}`;
      const response = axios.post(url + detailAPI, {
        healthCategoryIdx: 0,
        dayOfWeek: "string",
      });

      return response;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey_2 }}>
      <ExerciseCard
        exerciseName={dataList[listIndex].exerciseInfo.exerciseName}
      >
        <BottomSheetModalProvider>
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

          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 20 }}
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
                  <ReplaceButton2>
                    <ReplaceButtonText>대체하기</ReplaceButtonText>
                  </ReplaceButton2>
                </ReplaceView>
              ))}
            </BottomSheetBack>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </ExerciseCard>
    </SafeAreaView>
  );
}
