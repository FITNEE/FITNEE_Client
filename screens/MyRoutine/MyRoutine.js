import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { FlatList, Keyboard, ScrollView } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import {
  ComponentTitle,
  Header,
} from "../../components/Shared/MyRoutine_Shared";
import { colors } from "../../colors";
import { ScreenWidth } from "../../Shared";
import { listToObject } from "../../components/Shared/MyRoutine_Shared";
import {
  DayText,
  ScheduleChanger,
  TextContainer,
} from "../../components/ScheduleChanger";

import { ExerciseItem } from "../../components/ExerciseItem";
import { ExerciseItem_Custom } from "../../components/ExerciseItem_Custom";
import { Alert } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import axios from "axios";

const ScreenBase = styled.SafeAreaView`
  width: 100%;
  flex: 1;
`;

const ContentBase = styled.View`
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  flex: 1;
`;
const ScrollPressable = styled.Pressable`
  width: ${ScreenWidth - 48}px;
  margin-left: 24px;
`;
const DayContainer = styled.View`
  width: 35px;
  height: 60px;
  border-radius: 30px;
  padding-top: 8px;
  background-color: chartreuse;
  justify-content: space-between;
  align-items: center;
`;
const Circle = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${colors.grey_1};
  margin-bottom: 5.5px;
  border-radius: 12px;
`;
const ScheduleContainer = styled.View`
  flex-direction: row;
  padding: 24px;
  width: 100%;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  background-color: white;
`;

const BottomSheetContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;
const MyRoutine = () => {
  //prettier-ignore
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [SCHEDULES, setSCHEDULES] = useState([]);
  const [routineData, setRoutineData] = useState([]);
  const [newArr, setNewArr] = useState([]);
  const [editingID, setEditingID] = useState(null);
  const [mode, setMode] = useState(false);
  const bottomModal = useRef();
  const [snapPoints, setSnapPoints] = useState(["1%"]);
  const [modalShown, setModalShown] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const extendModal = () => {
    console.log("modal Extended");
    setSnapPoints(["60%"]);
  };

  const positions = useSharedValue(listToObject(SCHEDULES));
  // const today = date.getDay();
  const today = 4;
  const routine = [false, true, false, false, true, true, false];
  const toggleMode = () => {
    setMode(!mode);
  };
  const popMessage = (id) => {
    Alert.alert("운동 편집", "", [
      {
        text: "상세옵션 편집",
        onPress: () => {
          //Modal을 띄우기 위해 필요한 유일한 조건
          setModalShown(true);
          setEditingID(id);
          var arr = Array(routineData[id].content.length).fill({
            rep: 0,
            weight: 0,
          });
          setNewArr(arr);
          console.log("newArr:", arr);
        },
        style: "default",
      },
      {
        text: "선택 운동 삭제",
        onPress: () => console.log("OK Pressed"),
        style: "destructive",
      },
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "default",
      },
    ]);
  };
  const renderItem = ({ item, index }) => {
    return (
      <ExerciseItem
        id={index}
        content={item.content}
        title={item.healthCategoryIdx}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );
  };
  const getRoutine = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/routine/${6}`;
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  //요일 별 루틴 여부 파악위함
  const getRoutines = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/routines`;
      const response = await axios.get(url + detailAPI, {
        params: {
          userId: "pjk@naver.com",
        },
      });
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const onPressBottomModal = () => bottomModal.current?.present();
  const handleBottomSubmit = (data) => {
    //일단 ModalShown 변수를 false로 변경하여, 추후 Keyboard.dismiss()를 해도 keyboardDidhideListener
    setModalShown(false);
    Keyboard.dismiss();
    // reset();
  };

  const editNewArr = (id, type, text) => {
    let finalArr = newArr;
    finalArr[id].type = text;
  };
  useEffect(() => {
    if (modalShown == true) {
      setSnapPoints(["34%"]);
    } else {
      setSnapPoints(["1%"]);
    }
    console.log(modalShown);
  }, [modalShown]);

  useEffect(() => {
    onPressBottomModal();
    // getRoutine().then((res) => setRoutineData(res.result));
    // getRoutine().then((res) => console.log(res));
    // getRoutines().then((res) => console.log(res.result));
  }, []);
  return (
    <BottomSheetModalProvider>
      <ScreenBase>
        <Header mode={mode} parentFunction={toggleMode} />
        {!mode && (
          <ScheduleContainer>
            <TextContainer>
              {days.map((item, id) => (
                <DayContainer
                  id
                  style={
                    id == today
                      ? { backgroundColor: colors.grey_7 }
                      : { backgroundColor: colors.white }
                  }
                >
                  <DayText
                    style={
                      id == today
                        ? { color: colors.white }
                        : { color: colors.black }
                    }
                  >
                    {item}
                  </DayText>
                  {routine[id] == true && (
                    <Circle
                      style={
                        id == today
                          ? { backgroundColor: colors.white }
                          : { backgroundColor: colors.grey_3 }
                      }
                    />
                  )}
                </DayContainer>
              ))}
            </TextContainer>
          </ScheduleContainer>
        )}
        {mode ? (
          <ScrollView
            style={{
              width: "100%",
            }}
          >
            <ScrollPressable onPress={() => Keyboard.dismiss()}>
              {/* <ScrollPressable> */}
              <ComponentTitle
                title="요일 변경"
                subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
              />
              <ScheduleChanger
                SCHEDULES={SCHEDULES}
                days={days}
                positions={positions}
                isCustom={mode}
              />
              <ComponentTitle
                title="운동 편집"
                subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
              />
              {routineData?.map((item, id) => (
                <ExerciseItem_Custom
                  id
                  content={item.content}
                  title={item.healthCategoryIdx}
                  popMessage={() => popMessage(id)}
                />
              ))}
            </ScrollPressable>
          </ScrollView>
        ) : (
          <ContentBase>
            <FlatList
              showsVerticalScrollIndicator
              data={routineData}
              keyExtractor={(data) => data.id}
              renderItem={renderItem}
            />
          </ContentBase>
        )}

        <BottomSheetModal
          ref={bottomModal}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
          handleHeight={0}
          enableDismissOnClose
          handleIndicatorStyle={{ height: 0 }}
        >
          <BottomSheetContainer>
            <ExerciseContainer>
              <TopContainer>
                <ExerciseTitle>
                  {routineData[editingID]?.healthCategoryIdx}
                </ExerciseTitle>
                <SubmitButton onPress={() => handleBottomSubmit()}>
                  <SubmitText>완료</SubmitText>
                </SubmitButton>
              </TopContainer>
              <ExtendedContainer>
                {routineData[editingID]?.content.map((item, id) => (
                  <SetContainer id>
                    <ContentContainer>
                      <SetsText>{id + 1}</SetsText>
                      <EditBox
                        keyboardType="numeric"
                        selectTextOnFocus={item.weight != null}
                        editable={item.weight != null}
                        onFocus={() => extendModal()}
                        onChangeText={(text) => editNewArr(id, "rep", text)}
                        style={
                          !item.weight && { backgroundColor: colors.grey_2 }
                        }
                      >
                        <EditText>{item.weight ? item.weight : "-"}</EditText>
                      </EditBox>
                      <SetsText>kg</SetsText>
                      <EditBox
                        keyboardType="numeric"
                        selectTextOnFocus={item.rep != null}
                        editable={item.rep != null}
                        onFocus={() => extendModal()}
                        onChangeText={(text) => editNewArr(id, rep, text)}
                        style={!item.rep && { backgroundColor: colors.grey_2 }}
                      >
                        <EditText>{item.rep}</EditText>
                      </EditBox>
                      <SetsText>회</SetsText>
                    </ContentContainer>
                  </SetContainer>
                ))}
              </ExtendedContainer>
            </ExerciseContainer>
          </BottomSheetContainer>
        </BottomSheetModal>
      </ScreenBase>
    </BottomSheetModalProvider>
  );
};

export default MyRoutine;

const ExerciseContainer = styled.Pressable`
  padding: 24px;
  padding-top: 2px;
  flex-direction: column;
  background-color: ${colors.white};
`;
const ContentContainer = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const ExerciseTitle = styled.Text`
  font-size: 17px;
  margin-bottom: 6px;
  font-weight: 500;
`;
const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${colors.grey_2};
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
  background-color: ${colors.grey_4};
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
