import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Alert, ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "../../colors";
import { Header, Header_Temp } from "../../components/Shared/MyRoutine_Shared";
import { List_Custom } from "../../components/myRoutine/List_Custom";
import {
  getRoutines,
  getRoutine,
  updateRoutine,
} from "../../components/myRoutine/data";
import { Button } from "../../Shared";
import { IsDarkAtom, TabBarAtom } from "../../recoil/MyPageAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BottomSheetContent } from "../../components/myRoutine/BottomSheetContent";

const ScreenBase = styled.SafeAreaView`
  width: 100%;
  flex-direction: column;
  flex: 1;
`;
export default RoutineCustom = ({ navigation, route }) => {
  const [editingID, setEditingID] = useState(null);
  const [SCHEDULE, setSCHEDULE] = useState(route.params.SCHEDULE);
  const [newRoutine, setNewRoutine] = useState(route.params.routineData);
  // //이전 ID값과 변경 이후 ID값 매칭된거, 이거로 app/routine/calendar 호출하기
  const [modalState, setModalState] = useState(0);

  const setIsTabVisible = useSetRecoilState(TabBarAtom);
  const isDark = useRecoilValue(IsDarkAtom);
  //가장 밑단에서 backgroundColor 제공

  const updateNewSCHE = (position) => {
    console.log("updateNewSCHE 실행됨");
    // newSCHERef.current = position;
  };
  const popMessage = (id) => {
    // setSnapPoints([
    //   `${14 + 8 * newRoutine[id].content.length}%`,
    //   `${46 + 8 * newRoutine[id].content.length}`,
    // ]);
    setEditingID(id);
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
    if (type == "deleteSet") {
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
    } else if (type == "addSet") {
      newArr[id].content.push({
        rep: newArr[id].content[newArr[id].content.length - 1].rep,
        weight: newArr[id].content[newArr[id].content.length - 1].weight,
      });
    } else {
      console.log("무슨 타입입니까...?");
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

  // const isFocus = useIsFocused();
  // useEffect(() => {
  //   if (route.params) {
  //     setMode(true);
  //     editRoutine(0, "addExercise", route.params.selectedItem);
  //   }
  //   //params에서 변수를 토대로 요일과 운동 추가 중 택 1
  // }, [isFocus]);

  const extendModal = () => {
    console.log("modal Extended");
    // bottomModal.current.snapToIndex(1);
    if (modalState != 2) {
      // setSnapPoints([`${parseInt(snapPoints[0]) + 28}%`]);
    }
    // setModalState(2);
  };

  const handleClosePress = (tempArr) => {
    setNewRoutine(tempArr);
    setModalState(0);
    bottomModal.current.close();
    Keyboard.dismiss();
  };

  // useEffect(() => {
  //   if (modalState == 0) {
  //     // setSnapPoints(["1%"]);
  //   }
  // }, [modalState]);
  setIsTabVisible(false);
  const bottomModal = useRef(null);

  return (
    <ScreenBase
      style={{ backgroundColor: isDark ? colors.grey_9 : colors.white }}
    >
      <Header_Temp
        isDark={isDark}
        isCustom={false}
        onPress={() => console.log("PressedLeft")}
        onPressRight={() => console.log("PressedRight")}
      />
      <ScrollView
        style={{
          backgroundColor: isDark ? colors.grey_9 : colors.grey_1,
        }}
      >
        <List_Custom
          isDark={isDark}
          SCHEDULE={SCHEDULE}
          updateNewSCHE={updateNewSCHE}
          newRoutine={newRoutine}
          editRoutine={editRoutine}
          popMessage={popMessage}
        />
      </ScrollView>
      <Button
        onPress={() => navigation.navigate("ExerciseSearch", {})}
        text="운동 추가하기"
        enabled={true}
        mode="absolute"
      />

      <BottomSheet
        ref={bottomModal}
        backdropComponent={renderBackdrop}
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
          newRoutine={newRoutine}
          editingID={editingID}
          extendModal={extendModal}
          setNewRoutine={setNewRoutine}
        />
      </BottomSheet>
    </ScreenBase>
  );
};
