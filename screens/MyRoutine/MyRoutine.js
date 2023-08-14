import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, Alert, View } from "react-native";
import styled from "styled-components/native";
import BottomSheet from "@gorhom/bottom-sheet";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "../../colors";
import { Header, listToObject } from "../../components/Shared/MyRoutine_Shared";
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
import { BottomSheetContent } from "../../components/myRoutine/BottomSheetContent";

const IndicatorBase = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export default MyRoutine = ({ navigation, route }) => {
  //커스텀 or 일반 보기모드 식별 위함
  const [mode, setMode] = useState(false);

  //요일별 운동 유무 및 각 요일 운동 idx 보관목적 ->custom하면서 변경될 수 있기에 useState로 저장
  const [isLoading, setIsLoading] = useState(false);

  const [SCHEDULE, setSCHEDULE] = useState([]);
  //각 요일에 대한 세부 루틴정보들 저장하기 위한 배열 useState
  const [routineData, setRoutineData] = useState(null);
  //커스텀모드에서 세부수정하고자 하는 운동종목 구분하기 위한 id값
  const [editingID, setEditingID] = useState(null);
  //DropDown 누른 운동 구분하기위함.
  const [selectedId, setSelectedId] = useState(null);
  //요일 슬라이드로 변경되는 실시간 SCHEDULE배열 임시 저장하기 위한 함수
  const [newRoutine, setNewRoutine] = useState([]);

  //이전 ID값과 변경 이후 ID값 매칭된거, 이거로 app/routine/calendar 호출하기
  const [selectedDay, setSelectedDay] = useState((new Date().getDay() + 6) % 7);
  const [snapPoints, setSnapPoints] = useState(["1%"]);

  const [modalState, setModalState] = useState(0);
  const setIsTabVisible = useSetRecoilState(TabBarAtom);

  const isDark = useRecoilValue(IsDarkAtom);
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
      console.log("res:", res);
      if (res.result) {
        setSCHEDULE(processDayData(res.result));
        getRoutine(processDayData(res.result), selectedDay, setIsLoading).then(
          (res) => {
            console.log("getRoutine반응값:", res);
            if (res.result) {
              setRoutineData(res.result.routineDetails);
              setNewRoutine(res.result.routineDetails);
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
        let tempNewSCHE = Object.keys(newSCHE).reduce((acc, k) => {
          let country = newSCHE[k];
          acc[country] = [...(acc[country] || []), k];
          return acc;
        }, {});
        let data = {
          monRoutineIdx: SCHEDULE[tempNewSCHE[0]].routineId,
          tueRoutineIdx: SCHEDULE[tempNewSCHE[1]].routineId,
          wedRoutineIdx: SCHEDULE[tempNewSCHE[2]].routineId,
          thuRoutineIdx: SCHEDULE[tempNewSCHE[3]].routineId,
          friRoutineIdx: SCHEDULE[tempNewSCHE[4]].routineId,
          satRoutineIdx: SCHEDULE[tempNewSCHE[5]].routineId,
          sunRoutineIdx: SCHEDULE[tempNewSCHE[6]].routineId,
        };
        updateRoutines(data).then((res) =>
          console.log("updateRoutineSchedule api 호출결과:", res)
        );
        newSCHE = null;
      }
    }
    setMode(!mode);
  };
  const popMessage = (id) => {
    setEditingID(id);
    // setSnapPoints([
    //   `${14 + 8 * newRoutine[id].content.length}%`,
    //   `${46 + 8 * newRoutine[id].content.length}`,
    // ]);
    Alert.alert("운동 편집", "", [
      {
        text: "상세옵션 편집",
        onPress: () => {
          // setModalState(1);
          // setSnapPoints([`${10 + 8 * newRoutine[id].content.length}%`]);
          bottomModal.current?.expand();
          // bottomModal.current?.snapToIndex(0);
          //확대하고자 하는 운동종목의 세트수에 따라 확장되는 정도를 유동적으로 제어하기 위함
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
  // const renderBackdrop = useCallback(
  //   (props) => (
  //     <BottomSheetBackdrop
  //       {...props}
  //       pressBehavior="none"
  //       appearsOnIndex={0}
  //       disappearsOnIndex={-1}
  //     />
  //   ),
  //   []
  // );
  useEffect(() => {
    if (route.params) {
      setMode(true);
      editRoutine(0, "addExercise", route.params.selectedItem);
    }
  }, [isFocus]);

  const extendModal = () => {
    console.log("modal Extended");
    // bottomModal.current.snapToIndex(1);
    if (modalState != 2) {
      // setSnapPoints([`${parseInt(snapPoints[0]) + 28}%`]);
    }
    // setModalState(2);
  };

  const handleClosePress = (tempArr) => {
    console.log("handleClosePress");
    setNewRoutine(tempArr);
    setModalState(0);
    bottomModal.current.close();
    Keyboard.dismiss();
  };

  var newSCHE;
  const updateNewSCHE = (position) => {
    newSCHE = position;
  };
  useEffect(() => {
    if (SCHEDULE[selectedDay] != undefined) {
      getRoutine(SCHEDULE, selectedDay, setIsLoading).then((res) => {
        // console.log("selectedDay변경으로 실행된 getRoutine 실행결과:", res);
        if (res.result) {
          setRoutineData(res.result.routineDetails);
          setNewRoutine(res.result.routineDetails);
        } else {
          console.log("요일 루틴 가져오기 실패");
          setRoutineData(null);
          setNewRoutine(null);
        }
      });
    }
  }, [selectedDay]);

  // useEffect(() => {
  //   if (modalState == 0) {
  //     // setSnapPoints(["1%"]);
  //   }
  // }, [modalState]);

  const bottomModal = useRef(null);

  useEffect(() => {
    updateDatas();
  }, []);

  useEffect(() => {
    setIsTabVisible(!mode);
  }, [mode]);

  return (
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
            updateNewSCHE={updateNewSCHE}
            newRoutine={newRoutine}
            editRoutine={editRoutine}
            popMessage={popMessage}
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

      {/* <BottomSheet
        ref={bottomModal}
        index={-1}
        snapPoints={["50%"]}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleHeight={0}
        enableDismissOnClose
        handleIndicatorStyle={{ height: 0 }}
      >
        <BottomSheetContent
          isDark={isDark}
          handleClosePress={handleClosePress}
          routineData={routineData}
          newRoutine={newRoutine}
          editingID={editingID}
          extendModal={extendModal}
          setNewRoutine={setNewRoutine}
        />
      </BottomSheet> */}
    </ScreenBase>
  );
};
