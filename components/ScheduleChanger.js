import { MovableSchedule } from "../components/MovableSchedule";
import styled from "styled-components/native";

export const TextContainer = styled.View`
  flex-direction: row;
  margin-top: 6px;
  width: 100%;
  justify-content: space-between;
`;
export const DayText = styled.Text`
  width: 45px;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
`;

const DaysContainer = styled.View`
  padding: 6px;
  border-radius: 12px;
  margin-top: 8px;
  background-color: white;
`;

const ScheduleContainer = styled.SafeAreaView`
  margin-top: 12px;
  height: 64px;
  width: 100%;
`;
export const ScheduleChanger = (props) => {
  return (
    <DaysContainer>
      <TextContainer>
        {props.days.map((item) => (
          <DayText>{item}</DayText>
        ))}
      </TextContainer>
      <ScheduleContainer>
        {props.SCHEDULES.map((sche) => (
          <MovableSchedule
            key={sche.id}
            id={sche.id}
            day={sche.day}
            valid={sche.valid}
            part={sche.part}
            positions={props.positions}
            songsCount={props.SCHEDULES.length}
          />
        ))}
      </ScheduleContainer>
    </DaysContainer>
  );
};
