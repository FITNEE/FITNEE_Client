import { MovableSchedule } from "./myRoutine/MovableSchedule";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useSharedValue } from "react-native-reanimated";
import { listToObject } from "./Shared/MyRoutine_Shared";
import React from "react";

export const TextContainer = styled.View`
  flex-direction: row;
  margin-top: 6px;
  width: 100%;
  justify-content: space-between;
`;
export const DayText = styled.Text`
  font-family: Pretendard-Regular;
  width: 45px;
  text-align: center;
  font-size: 13px;
`;
const DaysContainer = styled.View`
  padding: 6px;
  border-radius: 12px;
  margin-top: 8px;
`;
const ScheduleContainer = styled.SafeAreaView`
  margin-top: 12px;
  height: 64px;
  width: 100%;
`;
export const ScheduleChanger = ({ SCHEDULE, days, isDark, setNewSCHE }) => {
  /**여기다가 positions 값은 별도로 빼놓아야한다. 이유는 잘 모르겠음.*/
  //후가공된 요일 데이터가 초기값이 된다.
  const positions = useSharedValue(listToObject(SCHEDULE));
  return (
    <DaysContainer
      style={{ backgroundColor: isDark ? colors.grey_8 : colors.white }}
    >
      <TextContainer>
        {days.map(
          (
            item,
            index //각 위치에 해당하는 요일들을 렌더링하기 위해서 요일들을 정적으로 렌더링
          ) => (
            <DayText
              style={{ color: isDark ? colors.white : colors.black }}
              key={index}
            >
              {item}
            </DayText>
          )
        )}
      </TextContainer>
      <ScheduleContainer
        style={{ backgroundColor: isDark ? colors.grey_9 : colors.grey_1 }}
      >
        {SCHEDULE.map(
          (
            sche //동적으로 변경되는 SCHDULES 데이터를 기반으로 MoveableSchedule 렌더
          ) => (
            <MovableSchedule
              id={sche.id}
              key={sche.id}
              isDark={isDark}
              positions={positions}
              routineId={sche.routineId}
              SCHEDULE={SCHEDULE}
              setNewSCHE={setNewSCHE}
            />
          )
        )}
      </ScheduleContainer>
    </DaysContainer>
  );
};
