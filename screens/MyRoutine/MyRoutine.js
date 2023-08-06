import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { FlatList, Keyboard, ScrollView } from "react-native";
import {
  ComponentTitle,
  Header,
} from "../../components/Shared/MyRoutine_Shared";
import { colors } from "../../colors";
import { ScreenWidth } from "../../Shared";
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
  flex-direction: column;
  flex: 1;
  background-color: ${colors.white};
`;
const ContentBase = styled.View`
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex: 1;
`;
const ContentLayout = styled.View`
  width: 100%;
  flex-direction: column;
  flex: 1;
  background-color: #f6f8fa;
`;
const ScreenBaseCustom = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
`;
const ScrollPressable = styled.Pressable`
  width: ${ScreenWidth - 48}px;
  margin-left: 24px;
`;
const DayContainer = styled.TouchableOpacity`
  width: 35px;
  height: 60px;
  border-radius: 30px;
  padding-top: 8px;
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
  height: 24px;
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

const MyRoutine = () => {
  //prettier-ignore
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  //커스텀 or 일반 보기모드 식별 위함
  const [mode, setMode] = useState(false);

  //요일별 운동 유무 및 각 요일 운동 idx 보관목적 ->custom하면서 변경될 수 있기에 useState로 저장
  const [SCHEDULE, setSCHEDULE] = useState([]);

  //각 요일에 대한 세부 루틴정보들 저장하기 위한 배열 useState
  const [routineData, setRoutineData] = useState([]);

  //커스텀모드에서 세부수정하고자 하는 운동종목 구분하기 위한 id값
  const [editingID, setEditingID] = useState(null);
  //요일 슬라이드로 변경되는 실시간 SCHEDULE배열 임시 저장하기 위한 함수
  const [newRoutine, setNewRoutine] = useState([]);

  const [newSCHE, setNewSCHE] = useState(null);
  //console.log("newSCHE:", newSCHE); // {"0": 0, "1": 1, "2": 2, "3": 3, "4": 6, "5": 4, "6": 5}
  //이전 ID값과 변경 이후 ID값 매칭된거, 이거로 app/routine/calendar 호출하기
  const [selectedDay, setSelectedDay] = useState((new Date().getDay() + 6) % 7);

  const bottomModal = useRef();
  const [snapPoints, setSnapPoints] = useState(["1%"]);
  const [modalShown, setModalShown] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const extendModal = () => {
    console.log("modal Extended");
    //기존 스냅포인트 수치보다 키보드 절대높이인 28%를 더하여서 유동적인 bottomSheet면적에 대비
    setSnapPoints([`${parseInt(snapPoints[0]) + 28}%`]);
  };
  const updateRoutine = async () => {
    try {
      // console.log(
      //   "SCHEDULE[selectedDay].routineId:",
      //   SCHEDULE[selectedDay].routineId
      // );
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/routine/${SCHEDULE[selectedDay].routineId}`;
      const response = await axios.put(url + detailAPI, newRoutine, {
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
  const updateSchedule = async (data) => {
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
  const toggleMode = () => {
    if (mode) {
      updateRoutine().then(
        (res) => console.log("putRoutine api 호출결과:", res) //눌렀을 때 mode가 true였을 때, 즉 커스텀모드에서 완료버튼을 눌렀을때.
      );
      if (newSCHE) {
        let newSCHE_1 = JSON.parse(JSON.stringify(newSCHE));
        let tempNewSCHE = Object.keys(newSCHE_1).reduce((acc, k) => {
          let country = newSCHE_1[k];
          acc[country] = [...(acc[country] || []), k];
          return acc;
        }, {});
        //SCHEDULE의 변경이 있었을 경우,
        let data = {
          monRoutineIdx: SCHEDULE[tempNewSCHE[0]].routineId,
          tueRoutineIdx: SCHEDULE[tempNewSCHE[1]].routineId,
          wedRoutineIdx: SCHEDULE[tempNewSCHE[2]].routineId,
          thuRoutineIdx: SCHEDULE[tempNewSCHE[3]].routineId,
          friRoutineIdx: SCHEDULE[tempNewSCHE[4]].routineId,
          satRoutineIdx: SCHEDULE[tempNewSCHE[5]].routineId,
          sunRoutineIdx: SCHEDULE[tempNewSCHE[6]].routineId,
        }; //0번째 153
        updateSchedule(data).then((res) =>
          console.log("putRoutineSchedule api 호출결과:", res)
        );
      }
    }
    setMode(!mode);
  };
  const popMessage = (id) => {
    Alert.alert("운동 편집", "", [
      {
        text: "상세옵션 편집",
        onPress: () => {
          setModalShown(true);
          setSnapPoints([`${10 + 8 * newRoutine[id].content.length}%`]);
          //확대하고자 하는 운동종목의 세트수에 따라 확장되는 정도를 유동적으로 제어하기 위함
          setEditingID(id);
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
        key={SCHEDULE[selectedDay] * index}
        id={index}
        content={item.content}
        title={item.exerciseName}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );
  };

  /**각 요일별로 존재하는 루틴의 Idx 값을 반환 */
  const getRoutines = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = "app/routine/calendar";
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handleBottomSubmit = () => {
    //일단 ModalShown 변수를 false로 변경하여
    setModalShown(false);
    Keyboard.dismiss();
  };
  /**백엔드로부터 받아온 rawData를 요일요약 상단 컴퍼넌트에 렌더링하고자 숫자값만 담긴 배열로 후가공*/
  const processDayData = (rawData) => {
    let newArr = new Array(rawData.length);
    console.log(newArr);
    newArr[0] = { id: 0, routineId: rawData.monRoutineIdx };
    newArr[1] = { id: 1, routineId: rawData.tueRoutineIdx };
    newArr[2] = { id: 2, routineId: rawData.wedRoutineIdx };
    newArr[3] = { id: 3, routineId: rawData.thuRoutineIdx };
    newArr[4] = { id: 4, routineId: rawData.friRoutineIdx };
    newArr[5] = { id: 5, routineId: rawData.satRoutineIdx };
    newArr[6] = { id: 6, routineId: rawData.sunRoutineIdx };
    setSCHEDULE(newArr);
  };
  const getRoutine = async () => {
    try {
      let url = "https://gpthealth.shop/";
      //후가공한 SCHEDULE 배열에서의 IDX값을 그대로 가져와 query스트링으로 추가
      let detailAPI = `app/routine/${SCHEDULE[selectedDay].routineId}`;
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  useEffect(() => {
    if (modalShown == true) {
      // setSnapPoints([`${20 * newRoutine[editingID].content.length}%`]);
    } else {
      setSnapPoints(["1%"]);
    }
    console.log("modalShown:", modalShown);
  }, [modalShown]);

  const editRoutine = (id, type, value) => {
    let newArr = JSON.parse(JSON.stringify(newRoutine));
    if (type == "repeat") {
      newArr[editingID].content[id].rep = value;
    } else if (type == "weight") {
      newArr[editingID].content[id].weight = value;
    } else if (type == "deleteSet") {
      newArr[id].content.splice(value, 1);
    } else {
      newArr[id].content.push({
        rep: newArr[id].content[newArr[id].content.length - 1].rep,
        weight: newArr[id].content[newArr[id].content.length - 1].weight,
      });
    }
    console.log("editRoutine수행 후 결과값:", newArr[id].content);
    setNewRoutine(newArr);
  };

  const onPressBottomModal = () => bottomModal.current?.present();

  useEffect(() => {
    if (SCHEDULE[selectedDay] != undefined) {
      getRoutine().then((res) => {
        if (res.code == 1000) {
          setRoutineData(res.result);
          setNewRoutine(res.result);
        } else {
          console.log("요일 루틴 가져오기 실패");
        }
      });
    }
  }, [selectedDay]);

  useEffect(() => {
    onPressBottomModal();
    /**요일별 루틴 유무를 파악하고 화면에 출력하는 과정 */
    getRoutines().then((res) => {
      if (res.result) {
        //올바른 데이터 백엔드로부터 받아옴
        // console.log("rawSCHEData", res.result);
        processDayData(res.result);
      } else {
        console.log("백엔드로부터 올바른 myRoutines 데이터 받아오지 못함");
      }
    });
  }, [mode]);
  return (
    <BottomSheetModalProvider>
      <ScreenBase>
        <Header mode={mode} parentFunction={toggleMode} />
        <ContentLayout>
          {!mode && ( //루틴 요약내용을 확인할 수 있는 주간달력 컴퍼넌트
            <ScheduleContainer>
              <TextContainer>
                {days.map((item, id) => (
                  <DayContainer
                    onPress={() => setSelectedDay(id)}
                    key={id}
                    style={
                      id == selectedDay
                        ? { backgroundColor: colors.l_main }
                        : { backgroundColor: colors.white }
                    }
                  >
                    <DayText
                      style={
                        id == selectedDay
                          ? { color: colors.white }
                          : { color: colors.black }
                      }
                    >
                      {item}
                    </DayText>

                    {SCHEDULE[id]?.routineId != 0 && // SCHEDULE 배열의 id번째 요소는 0이 아닌 다른 숫자라면 id번째 요일에 운동이 존재한다는 것 의미
                      SCHEDULE[id] && ( // SCHEDULE 배열의 id번째 요소가 존재하지 않는다는것은, 애초에 SCHEDULE배열로 후가공하기 위해 필요한 rawData가 백엔드로부터 전해지지 않았다는 것을 의미
                        <Circle
                          style={
                            id == selectedDay //만일 선택된 날짜랑 운동있는 요일이랑 겹치면 색상을 변경해야하기 때문에 css 예외처리
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
                flex: 1,
              }}
            >
              <ScreenBaseCustom>
                <ScrollPressable onPress={() => Keyboard.dismiss()}>
                  <ComponentTitle
                    title="요일 변경"
                    subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
                  />
                  <ScheduleChanger
                    SCHEDULE={SCHEDULE}
                    days={days}
                    setNewSCHE={setNewSCHE}
                  />
                  <ComponentTitle
                    title="운동 편집"
                    subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
                  />
                  {newRoutine?.map((item, id) => (
                    <ExerciseItem_Custom
                      key={id}
                      id={id}
                      content={item.content}
                      title={item.exerciseName}
                      editRoutine={editRoutine}
                      popMessage={() => popMessage(id)}
                    />
                  ))}
                </ScrollPressable>
              </ScreenBaseCustom>
            </ScrollView>
          ) : (
            <ContentBase>
              {routineData ? (
                <FlatList
                  showsVerticalScrollIndicator
                  data={routineData}
                  renderItem={renderItem}
                />
              ) : (
                <ContentContainer>
                  <ExerciseTitle style={{ textAlign: "center", width: "100%" }}>
                    해당 요일에는 루틴이 없어요 :(
                  </ExerciseTitle>
                </ContentContainer>
              )}
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
                    {routineData /** 운동이 없는 요일을 선택했을 경우, Null값이 반환됨에 따라 
                  null을 object로 만들수 없다는 오류를 피하기 위함 */ &&
                      routineData[editingID]?.healthCategoryIdx}
                  </ExerciseTitle>
                  <SubmitButton onPress={() => handleBottomSubmit()}>
                    <SubmitText>완료</SubmitText>
                  </SubmitButton>
                </TopContainer>
                <ExtendedContainer>
                  {newRoutine /** 운동이 없는 요일을 선택했을 경우, Null값이 반환됨에 따라 
                  null을 object로 만들수 없다는 오류를 피하기 위함 */ &&
                    newRoutine[editingID]?.content.map((item, id) => (
                      <SetContainer key={id}>
                        <ContentContainer>
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
                              !item.weight && { backgroundColor: colors.grey_2 }
                            }
                          >
                            <EditText>
                              {item.weight ? item.weight : "-"}
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
                            style={
                              !item.rep && { backgroundColor: colors.grey_2 }
                            }
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
        </ContentLayout>
      </ScreenBase>
    </BottomSheetModalProvider>
  );
};

export default MyRoutine;
