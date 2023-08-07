import React, { Component } from "react";
import { days } from "./data";
import { colors } from "../../colors";
import { WithLocalSvg } from "react-native-svg";
import Exercise from "../../assets/SVGs/Exercise.svg";
import { TextContainer, DayText } from "../../components/ScheduleChanger";
import { styled } from "styled-components/native";

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

export default WeekCalendar = ({ setSelectedDay, selectedDay, SCHEDULE }) => {
  return (
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
                >
                  <WithLocalSvg width={24} height={24} asset={Exercise} />
                </Circle>
              )}
          </DayContainer>
        ))}
      </TextContainer>
    </ScheduleContainer>
  );
};
