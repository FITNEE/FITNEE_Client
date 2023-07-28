import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
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

const ScreenBase = styled.SafeAreaView`
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
const ScreenLayout = styled.View`
  width: 100%;
`;
const FlatListContainer = styled.View`
  width: 100%;
  height: 100%;
`;
const DayBase = styled.View`
  margin-top: 40px;
  width: ${ScreenWidth - 48}px;
  margin-left: 24px;
  flex-direction: column;
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

const MyRoutine = ({ route, navigation }) => {
  //prettier-ignore
  const SCHEDULES = [{ id: 0,valid: false,},{id: 1,part: "코어",valid: true,},{id: 2,valid: false,},{id: 3,valid: false,},{id: 4,part: "하체",valid: true,},{id: 5,valid: false,},{id: 6,part: "상체",valid: true,}];
  //prettier-ignore
  const test = [{id: 1,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 2,title: "사이드 레터럴레이션",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 3,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 4,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 5,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 6,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},{id: 7,title: "데드리프트",subText: "전신 | 3세트 | 빈 봉",setsNum: [15, 15, 15],},];
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState(false);
  const positions = useSharedValue(listToObject(SCHEDULES));
  const today = 4;
  const routine = [false, true, false, false, true, true, false];
  const toggleMode = () => {
    setMode(!mode);
  };

  const renderItem = ({ item }) => {
    return (
      <>
        {mode ? (
          <>
            <ExerciseItem_Custom
              id={item.id}
              setsNum={item.setsNum}
              title={item.title}
              subText={item.subText}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </>
        ) : (
          <ExerciseItem
            id={item.id}
            setsNum={item.setsNum}
            title={item.title}
            subText={item.subText}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        )}
      </>
    );
  };
  return (
    <ScreenBase>
      <Header mode={mode} parentFunction={toggleMode} />
      {mode ? (
        <DayBase>
          <ComponentTitle
            title="요일변경"
            subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
          />
          <ScheduleChanger
            SCHEDULES={SCHEDULES}
            days={days}
            positions={positions}
            isCustom={mode}
          />
        </DayBase>
      ) : (
        <ScheduleContainer>
          <TextContainer>
            {days.map((item, id) => (
              <DayContainer
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

      <ContentBase>
        <ScreenLayout>
          <FlatListContainer>
            <FlatList
              showsVerticalScrollIndicator
              data={test}
              keyExtractor={(test) => test.id}
              renderItem={renderItem}
            />
          </FlatListContainer>
        </ScreenLayout>
      </ContentBase>
    </ScreenBase>
  );
};

export default MyRoutine;
