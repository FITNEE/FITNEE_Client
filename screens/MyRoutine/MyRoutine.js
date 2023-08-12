import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, Alert, View } from "react-native";
import styled from "styled-components/native";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "../../colors";
import { Header } from "../../components/Shared/MyRoutine_Shared";
import {
  pressBack,
  processDayData,
} from "../../components/myRoutine/Functions";
import { MyToast, showToast } from "../../components/myRoutine/MyToast";
import WeekCalendar from "../../components/myRoutine/WeekCalendar";
import List_Custom from "../../components/myRoutine/List_Custom";
import List_Normal from "../../components/myRoutine/List_Normal";
import {
  getRoutines,
  getRoutine,
  updateRoutine,
} from "../../components/myRoutine/data";
import {
  ContentContainer,
  NoRoutineText,
} from "../../components/Shared/MyRoutine_Shared";
import { Button } from "../../Shared";
import { IsDarkAtom, TabBarAtom } from "../../recoil/MyPageAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const BottomSheetBase = styled.Pressable`
  width: 100%;
  height: 100%;
  padding: 24px;

  border-radius: 24px;
  flex-direction: column;
`;
const BottomSheetHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  height: 24px;
`;
const ExerciseTitle = styled.Text`
  font-size: 17px;
  margin-bottom: 6px;
  font-weight: 500;
`;
const IndicatorBase = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${colors.grey_1};
  height: 48px;
  border-radius: 8px;
  margin-top: 10px;
`;
const ExtendedContainer = styled.View`
  width: 100%;
`;
const SetsText = styled.Text`
  font-size: 17px;
  flex: 1;
  color: ${colors.grey_8};
  font-weight: 400;
`;
const EditText = styled.Text`
  font-size: 17px;
  flex: 1;
  color: ${colors.grey_8};
  text-align: center;
  font-weight: 400;
`;
const EditBox = styled.TextInput`
  height: 32px;
  margin-right: 8px;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  width: 56px;
  background-color: ${colors.grey_2};
`;

const SubmitText = styled.Text`
  font-size: 17px;
  color: ${colors.l_main};
  text-align: center;
  font-weight: 700;
`;
const SubmitButton = styled.TouchableOpacity`
  width: 56px;
  margin-left: 20px;
`;

export default MyRoutine = ({ navigation, route }) => {
  //커스텀 or 일반 보기모드 식별 위함
  const [mode, setMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //요일별 운동 유무 및 각 요일 운동 idx 보관목적 ->custom하면서 변경될 수 있기에 useState로 저장
  const [SCHEDULE, setSCHEDULE] = useState([]);
  //각 요일에 대한 세부 루틴정보들 저장하기 위한 배열 useState
  const [routineData, setRoutineData] = useState([]);
  //커스텀모드에서 세부수정하고자 하는 운동종목 구분하기 위한 id값
  const [editingID, setEditingID] = useState(null);
  //DropDown 누른 운동 구분하기위함.
  const [selectedId, setSelectedId] = useState(null);
  //요일 슬라이드로 변경되는 실시간 SCHEDULE배열 임시 저장하기 위한 함수
  const [newRoutine, setNewRoutine] = useState([]);
  const [newSCHE, setNewSCHE] = useState(null);
  //이전 ID값과 변경 이후 ID값 매칭된거, 이거로 app/routine/calendar 호출하기
  const [selectedDay, setSelectedDay] = useState((new Date().getDay() + 6) % 7);
  const [snapPoints, setSnapPoints] = useState(["1%"]);

  const setIsTabVisible = useSetRecoilState(TabBarAtom);

  // const isDark = useRecoilValue(IsDarkAtom);
  let isDark = false;

  //가장 밑단에서 backgroundColor 제공
  const ScreenBase = styled.SafeAreaView`
    width: 100%;
    flex-direction: column;
    flex: 1;
    background-color: ${isDark
      ? mode
        ? colors.grey_9
        : colors.black
      : colors.white};
  `;
  //평시모드에서 column, spaceBetween 속성부여역할로 헤더,푸터 제외한 모든 요소 감쌈
  const ContentBase = styled.View`
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    flex: 1;
    background-color: ${isDark ? colors.black : colors.grey_1};
  `;

  const isFocus = useIsFocused();
  const updateDatas = () => {
    getRoutines().then((res) => {
      if (res.result) {
        setSCHEDULE(processDayData(res.result));
        getRoutine(processDayData(res.result), selectedDay, setIsLoading).then(
          (res) => {
            if (res.code == 1000) {
              setRoutineData(res.result);
              setNewRoutine(res.result);
            } else {
              console.log("routine 데이터 받아오지 못함");
            }
          }
        );
      } else {
        console.log("calender 데이터 받아오지 못함+routine데이터도 실패");
      }
    });
  };

  const toggleMode = () => {
    if (mode) {
      updateRoutine(SCHEDULE, selectedDay, newRoutine).then(
        (res) => {
          console.log("updateRoutine api 호출결과:", res);
          updateDatas();
          showToast();
        } //눌렀을 때 mode가 true였을 때, 즉 커스텀모드에서 완료버튼을 눌렀을때.
      );
      if (newSCHE) {
        //SCHEDULE의 변경이 있었을 경우,
        let newSCHE_1 = JSON.parse(JSON.stringify(newSCHE));
        let tempNewSCHE = Object.keys(newSCHE_1).reduce((acc, k) => {
          let country = newSCHE_1[k];
          acc[country] = [...(acc[country] || []), k];
          return acc;
        }, {});
        //prettier-ignore
        let data = {"monRoutineIdx": SCHEDULE[tempNewSCHE[0]].routineId,"tueRoutineIdx": SCHEDULE[tempNewSCHE[1]].routineId,"wedRoutineIdx": SCHEDULE[tempNewSCHE[2]].routineId,"thuRoutineIdx": SCHEDULE[tempNewSCHE[3]].routineId,"friRoutineIdx": SCHEDULE[tempNewSCHE[4]].routineId,"satRoutineIdx": SCHEDULE[tempNewSCHE[5]].routineId,"sunRoutineIdx": SCHEDULE[tempNewSCHE[6]].routineId,}; //0번째 153
        updateRoutines(data).then((res) =>
          console.log("updateRoutineSchedule api 호출결과:", res)
        );
        setNewSCHE(null);
      }
    }
    setMode(!mode);
  };
  const popMessage = (id) => {
    setSnapPoints([
      `${14 + 8 * newRoutine[id].content.length}%`,
      `${46 + 8 * newRoutine[id].content.length}`,
    ]);
    Alert.alert("운동 편집", "", [
      {
        text: "상세옵션 편집",
        onPress: () => {
          bottomModal.current?.snapToIndex(0);
          //확대하고자 하는 운동종목의 세트수에 따라 확장되는 정도를 유동적으로 제어하기 위함
          setEditingID(id);
        },
        style: "default",
      },
      {
        text: "선택 운동 삭제",
        onPress: () => editRoutine(id, "deleteExercise", 1),
        style: "destructive",
      },
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "default",
      },
    ]);
  };
  const updateRoutines = async (data) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = "app/routine/calendar";
      const response = await axios.put(url + detailAPI, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const editRoutine = (id, type, value) => {
    let newArr = JSON.parse(JSON.stringify(newRoutine));
    if (type == "repeat") {
      newArr[editingID].content[id].rep = value;
    } else if (type == "weight") {
      newArr[editingID].content[id].weight = value;
    } else if (type == "deleteSet") {
      if (newArr[id].content.length <= 1) {
        Alert.alert("최소 세트가 1개 있어야 해요", "", [
          {
            text: "확인",
            style: "default",
          },
        ]);
      } else {
        newArr[id].content.splice(value, 1);
      }
    } else if (type == "deleteExercise") {
      newArr.splice(id, 1);
    } else if (type == "addExercise") {
      let addedExercise = Object.assign(
        { content: [{ rep: 15, weight: 40 }] },
        ...value
      );
      newArr.push(addedExercise);
    } else {
      newArr[id].content.push({
        rep: newArr[id].content[newArr[id].content.length - 1].rep,
        weight: newArr[id].content[newArr[id].content.length - 1].weight,
      });
    }
    setNewRoutine(newArr);
  };
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="none"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );
  useEffect(() => {
    if (route.params) {
      setMode(true);
      editRoutine(0, "addExercise", route.params.selectedItem);
    }
  }, [isFocus]);

  const extendModal = () => {
    console.log("modal Extended");
    bottomModal.current.snapToIndex(1);
  };

  const handleClosePress = () => {
    console.log("handleClosePress");
    bottomModal.current.close();
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (SCHEDULE[selectedDay] != undefined) {
      getRoutine(SCHEDULE, selectedDay, setIsLoading).then((res) => {
        console.log("selectedDay변경으로 실행된 getRoutine 실행결과:", res);
        if (res.code == 1000) {
          setRoutineData(res.result);
          setNewRoutine(res.result);
        } else {
          console.log("요일 루틴 가져오기 실패");
        }
      });
    }
  }, [selectedDay]);

  const bottomModal = useRef();

  useEffect(() => {
    updateDatas();
  }, []);

  useEffect(() => {
    setIsTabVisible(!mode);
  }, [mode]);

  return (
    <BottomSheetModalProvider>
      <ScreenBase>
        <Header
          isDark={isDark}
          mode={mode}
          toggleMode={toggleMode}
          onPress={() => pressBack(setMode)}
        />
        {mode ? (
          <>
            <List_Custom
              isDark={isDark}
              SCHEDULE={SCHEDULE}
              newRoutine={newRoutine}
              editRoutine={editRoutine}
              popMessage={popMessage}
              setNewSCHE={setNewSCHE}
            />
            <Button
              onPress={() => navigation.navigate("ExerciseSearch", {})}
              text="운동 추가하기"
              enabled={true}
              mode="absolute"
            />
          </>
        ) : (
          <ContentBase>
            <WeekCalendar //루틴 요약내용을 확인할 수 있는 주간달력 컴퍼넌트
              setSelectedDay={setSelectedDay}
              selectedDay={selectedDay}
              SCHEDULE={SCHEDULE}
              isDark={isDark}
            />
            {isLoading ? (
              <IndicatorBase>
                <ActivityIndicator size="large" color={colors.l_main} />
              </IndicatorBase>
            ) : routineData ? (
              <List_Normal
                routineData={routineData}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                isDark={isDark}
              />
            ) : (
              <ContentContainer>
                <NoRoutineText>해당 요일에는 루틴이 없어요</NoRoutineText>
              </ContentContainer>
            )}
            <MyToast />
          </ContentBase>
        )}

        <BottomSheet
          ref={bottomModal}
          index={-1}
          backdropComponent={renderBackdrop}
          backgroundComponent={() => {
            <View />;
          }}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
          enableDismissOnClose
        >
          <BottomSheetBase
            style={{ backgroundColor: isDark ? colors.grey_8 : colors.white }}
          >
            <BottomSheetHeader>
              <ExerciseTitle>
                {routineData /** 운동이 없는 요일을 선택했을 경우, Null값이 반환됨에 따라 
                  null을 object로 만들수 없다는 오류를 피하기 위함 */ &&
                  routineData[editingID]?.exerciseName}
              </ExerciseTitle>
              <SubmitButton onPress={() => handleClosePress()}>
                <SubmitText>완료</SubmitText>
              </SubmitButton>
            </BottomSheetHeader>
            <ExtendedContainer>
              {newRoutine /** 운동이 없는 요일을 선택했을 경우, Null값이 반환됨에 따라 
                  null을 object로 만들수 없다는 오류를 피하기 위함 */ &&
                newRoutine[editingID]?.content.map((item, id) => (
                  <SetContainer key={id}>
                    <ContentContainer key={id}>
                      <SetsText>{id + 1}</SetsText>
                      <EditBox
                        keyboardType="numeric"
                        selectTextOnFocus={item.weight != null}
                        editable={item.weight != null}
                        onFocus={() => extendModal()}
                        onChangeText={(value) =>
                          editRoutine(id, "weight", value)
                        }
                        style={
                          !item.weight && {
                            backgroundColor: colors.grey_2,
                          }
                        }
                      >
                        <EditText
                          style={item.weight && { color: colors.l_main }}
                        >
                          {item.weight}
                        </EditText>
                      </EditBox>
                      <SetsText>kg</SetsText>
                      <EditBox
                        keyboardType="numeric"
                        selectTextOnFocus={item.rep != null}
                        editable={item.rep != null}
                        onFocus={() => extendModal()}
                        onChangeText={(value) =>
                          editRoutine(id, "repeat", value)
                        }
                        style={!item.rep && { backgroundColor: colors.grey_2 }}
                      >
                        <EditText style={{ color: colors.l_main }}>
                          {item.rep}
                        </EditText>
                      </EditBox>
                      <SetsText>회</SetsText>
                    </ContentContainer>
                  </SetContainer>
                ))}
            </ExtendedContainer>
          </BottomSheetBase>
        </BottomSheet>
      </ScreenBase>
    </BottomSheetModalProvider>
  );
};
