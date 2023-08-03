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
const MyRoutine = () => {
  //prettier-ignore
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  //커스텀 or 일반 보기모드 식별 위함
  const [mode, setMode] = useState(false);

  //요일별 운동 유무 및 각 요일 운동 idx 보관목적 ->custom하면서 변경될 수 있기에 useState로 저장
  const [SCHEDULE, setSCHEDULE] = useState([]);

  //각 요일에 대한 세부 루틴정보들 저장하기 위한 배열 useState
  const [routineData, setRoutineData] = useState(null);

  //커스텀모드에서 세부수정하고자 하는 운동종목 구분하기 위한 id값
  const [editingID, setEditingID] = useState(null);

  const [selectedDay, setSelectedDay] = useState(null);

  const bottomModal = useRef();
  const [snapPoints, setSnapPoints] = useState(["1%"]);
  const [modalShown, setModalShown] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const extendModal = () => {
    console.log("modal Extended");
    setSnapPoints(["60%"]);
  };
  const SCHEDULES = [
    { id: 0, valid: false },
    { id: 1, part: "코어", valid: true },
    { id: 2, valid: false },
    { id: 3, valid: false },
    { id: 4, part: "하체", valid: true },
    { id: 5, valid: false },
    { id: 6, part: "상체", valid: true },
  ];
  const positions = useSharedValue(listToObject(SCHEDULES));
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
          // setNewArr(arr);
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
      //후가공한 SCHEDULE 배열에서의 IDX값을 그대로 가져와 query스트링으로 추가
      let detailAPI = `app/routine/${SCHEDULE[selectedDay]}`;
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  /**각 요일별로 존재하는 루틴의 Idx 값을 반환 */
  const getRoutines = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/routine`;
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handleBottomSubmit = (data) => {
    //일단 ModalShown 변수를 false로 변경하여
    setModalShown(false);
    Keyboard.dismiss();
  };
  /**백엔드로부터 받아온 rawData를 요일요약 상단 컴퍼넌트에 렌더링하고자 숫자값만 담긴 배열로 후가공*/
  const processDayData = (rawData) => {
    let newArr = new Array(rawData.length);
    newArr[0] = rawData.monRoutineIdx;
    newArr[1] = rawData.tueRoutineIdx;
    newArr[2] = rawData.wedRoutineIdx;
    newArr[3] = rawData.thuRoutineIdx;
    newArr[4] = rawData.friRoutineIdx;
    newArr[5] = rawData.satRoutineIdx;
    newArr[6] = rawData.sunRoutineIdx;
    setSCHEDULE(newArr);
  };
  // const editNewArr = (id, type, text) => {
  //   let finalArr = newArr;
  //   finalArr[id].type = text;
  // };
  useEffect(() => {
    if (modalShown == true) {
      setSnapPoints(["34%"]);
    } else {
      setSnapPoints(["1%"]);
    }

    console.log("modalShown:", modalShown);
  }, [modalShown]);
  const onPressBottomModal = () => bottomModal.current?.present();
  useEffect(() => {
    getRoutine().then((res) => setRoutineData(res.result));
  }, [selectedDay]);
  useEffect(() => {
    onPressBottomModal();
    setSelectedDay(new Date().getDay() - 1); //오늘 요일로 초기 selectedDay설정

    /**요일별 루틴 유무를 파악하고 화면에 출력하는 과정 res.result[1][0] =={"friRoutineIdx": 0, "monRoutineIdx": 0, "satRoutineIdx": 0, "sunRoutineIdx": 0, "thuRoutineIdx": 0, "tueRoutineIdx": 3, "wedRoutineIdx": 0}*/
    getRoutines().then((res) => {
      if (res.result[1][0]) {
        //올바른 데이터 백엔드로부터 받아옴
        console.log("모든 요일에 대한 루틴들 요약:", res.result[1][0]);
        processDayData(res.result[1][0]);
      } else {
        //빈 배열이 올라옴
        console.log(SCHEDULE, "백엔드로부터 올바른 데이터 받아오지 못함");
      }
    });
    //routineData = [{"content": [[Object], [Object], [Object]], "healthCategoryIdx": 5}, {"content": [[Object], [Object], [Object]], "healthCategoryIdx": 3}]
  }, []);
  return (
    <BottomSheetModalProvider>
      <ScreenBase>
        <Header mode={mode} parentFunction={toggleMode} />
        {!mode && ( //루틴 요약내용을 확인할 수 있는 주간달력 컴퍼넌트
          <ScheduleContainer>
            <TextContainer>
              {days.map((item, id) => (
                <DayContainer
                  onPress={() => setSelectedDay(id)}
                  id
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

                  {SCHEDULE[id] != 0 && // SCHEDULE 배열의 id번째 요소는 0이 아닌 다른 숫자라면 id번째 요일에 운동이 존재한다는 것 의미
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
            }}
          >
            <ScrollPressable onPress={() => Keyboard.dismiss()}>
              {/* <ScrollPressable> */}
              <ComponentTitle
                title="요일 변경"
                subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
              />
              <ScheduleChanger
                SCHEDULES={SCHEDULE}
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
            {routineData ? (
              <FlatList
                showsVerticalScrollIndicator
                data={routineData}
                keyExtractor={(data) => data.id}
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
                {routineData /** 운동이 없는 요일을 선택했을 경우, Null값이 반환됨에 따라 
                  null을 object로 만들수 없다는 오류를 피하기 위함 */ &&
                  routineData[editingID]?.content.map((item, id) => (
                    <SetContainer id>
                      <ContentContainer id>
                        <SetsText>{id + 1}</SetsText>
                        <EditBox
                          keyboardType="numeric"
                          selectTextOnFocus={item.weight != null}
                          editable={item.weight != null}
                          onFocus={() => extendModal()}
                          // onChangeText={(text) => editNewArr(id, "rep", text)}
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
                          // onChangeText={(text) => editNewArr(id, rep, text)}
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
