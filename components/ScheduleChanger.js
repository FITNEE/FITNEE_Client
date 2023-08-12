import { MovableSchedule } from "./myRoutine/MovableSchedule";
import styled from "styled-components/native";
import { useSharedValue } from "react-native-reanimated";
import { listToObject } from "./Shared/MyRoutine_Shared";

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
  background-color: #f6f8fa;
`;
export const ScheduleChanger = ({ SCHEDULE, days, setNewSCHE }) => {
  /**여기다가 positions 값은 별도로 빼놓아야한다. 이유는 잘 모르겠음.*/
  const positions = useSharedValue(listToObject(SCHEDULE));

  // useEffect(() => {
  //   //얕은 복사 해당 방법으로 newArr 변수를 생성하고 제어하면, SCHEDULE 배열 또한 변경되어 요일표시 컴퍼넌트가 원활하게 작동안함
  //   //해당 컴퍼넌트는 SCHEDULE 배열을 기준으로 위치가 제어되기 때문에.
  //   // let newArr = SCHEDULE; 따라서 JSON stringify 및 parse로 참조를 모두 끊어내어야한다.
  //   let newArr = JSON.parse(JSON.stringify(SCHEDULE));
  //   for (let i = 0; i < SCHEDULE.length; i++) {
  //     newArr[i].id = tempSche[i];
  //   }
  //   setNewSCHE(newArr);
  // }, [tempSche]);
  return (
    <DaysContainer>
      <TextContainer>
        {days.map(
          (
            item,
            index //각 위치에 해당하는 요일들을 렌더링하기 위해서 요일들을 정적으로 렌더링
          ) => (
            <DayText key={index}>{item}</DayText>
          )
        )}
      </TextContainer>
      <ScheduleContainer>
        {SCHEDULE.map(
          (
            sche //동적으로 변경되는 SCHDULES 데이터를 기반으로 MoveableSchedule 렌더
          ) => (
            <MovableSchedule
              id={sche.id}
              key={sche.id}
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
