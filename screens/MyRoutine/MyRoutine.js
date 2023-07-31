import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { FlatList, Keyboard, ScrollView } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import {
  ComponentTitle,
  Header,
} from "../../components/Shared/MyRoutine_Shared";
import { colors } from "../../colors";
import { ScreenHeight, ScreenWidth } from "../../Shared";
import { listToObject } from "../../components/Shared/MyRoutine_Shared";
import {
  DayText,
  ScheduleChanger,
  TextContainer,
} from "../../components/ScheduleChanger";
import { ExerciseItem } from "../../components/ExerciseItem";
import {
  ExerciseItem_Custom,
  ExerciseItem_Detail,
} from "../../components/ExerciseItem_Custom";
import { Alert } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import axios from "axios";

const ScreenBase = styled.SafeAreaView`
  width: 100%;
  flex: 1;
`;

const ScreenPressable = styled.Pressable`
  width: 100%;
  flex: 1;
`;
const ContentBase = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  background-color: #f3f3f3;
`;
const ScrollLayout = styled.Pressable`
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
  const SCHEDULES = [{ id: 0,valid: false,},{id: 1,part: "코어",valid: true,},{id: 2,valid: false,},{id: 3,valid: false,},{id: 4,part: "하체",valid: true,},{id: 5,valid: false,},{id: 6,part: "상체",valid: true,}];
  //prettier-ignore
  const test = [{id: 0,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 1,title: "사이드 레터럴레이션",subText: "전신 | 3세트 | 빈 봉",setsNum: [12, 5, 12],},{id: 2,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 3,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 4,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 5,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 6,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},];
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const [mode, setMode] = useState(false);
  const bottomModal = useRef();
  const [focusedItem, setFocusedItem] = useState([]);
  const [snapPoints, setSnapPoints] = useState(["1%"]);
  const [modalShown, setModalShown] = useState(false);

  const hideModal = () => {
    setSnapPoints(["1%"]);
    setModalShown(false);
    Keyboard.dismiss();
  };
  const popModal = () => {
    setSnapPoints(["34%"]);
    setModalShown(true);
  };
  const extendModal = () => {
    setSnapPoints(["60%"]);
    setModalShown(true);
  };
  const handleBottomSubmit = () => {
    hideModal();
    //setData()...
  };
  const positions = useSharedValue(listToObject(SCHEDULES));
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
          popModal();
          let newArr = test[id];
          console.log("선택된 Item:", newArr);
          setFocusedItem(newArr);
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
  const renderItem = ({ item }) => {
    return (
      <ExerciseItem
        id={item.id}
        setsNum={item.setsNum}
        title={item.title}
        subText={item.subText}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );
  };
  const getRoutine = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/routine/${4}`;
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
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
  useEffect(() => {
    onPressBottomModal();
    getRoutine().then((res) => setData(res.result));
    // getRoutines().then((result) => console.log(result));
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
            <ScrollLayout onPress={() => hideModal()}>
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
              {test.map((item) => (
                <ExerciseItem_Custom
                  id={item.id}
                  setsNum={item.setsNum}
                  title={item.title}
                  subText={item.subText}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  popMessage={() => popMessage(item.id)}
                />
              ))}
            </ScrollLayout>
          </ScrollView>
        ) : (
          <ContentBase>
            <FlatList
              showsVerticalScrollIndicator
              data={test}
              keyExtractor={(test) => test.id}
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
          <BottomSheetContainer onPress={() => popModal()}>
            <ExerciseContainer>
              <TopContainer>
                <ExerciseTitle>{data?.healthCategoryIdx}</ExerciseTitle>
                <SubmitButton onPress={() => handleBottomSubmit()}>
                  <SubmitText>완료</SubmitText>
                </SubmitButton>
              </TopContainer>
              <ExtendedContainer>
                {focusedItem?.setsNum?.map((item, id) => (
                  <SetContainer id>
                    <ContentContainer>
                      <SetsText>{id + 1}</SetsText>
                      <EditBox
                        keyboardType="numeric"
                        selectTextOnFocus
                        onFocus={() => extendModal()}
                      >
                        <EditText>-</EditText>
                      </EditBox>
                      <SetsText>kg</SetsText>
                      <EditBox
                        keyboardType="numeric"
                        selectTextOnFocus
                        onFocus={() => extendModal()}
                      >
                        <EditText>{item}</EditText>
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
