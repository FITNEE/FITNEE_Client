import { useEffect, useState } from "react";
import styled from "styled-components/native";

export default function RoutineItem({
  day,
  parts,
  exercises,
  onPress,
  select,
}) {
  const [kday, setKday] = useState("");
  useEffect(() => {
    switch (day) {
      case "Sunday":
        setKday("일");
        break;
      case "Monday":
        setKday("월");
        break;
      case "Tuesday":
        setKday("화");
        break;
      case "Wednesday":
        setKday("수");
        break;
      case "Thursday":
        setKday("목");
        break;
      case "Friday":
        setKday("금");
        break;
      case "Saturday":
        setKday("토");
        break;

      default:
        break;
    }
  }, [day]);
  return (
    <Container>
      <Item onPress={onPress}>
        <ItemTitle>{kday}</ItemTitle>
        <ItemSubTitle>{parts}</ItemSubTitle>
      </Item>
      {select ? (
        <ExerciseContainer>
          {exercises.map((exercise) => (
            <ExerciseItem key={exercise.healthCategoryIdx}>
              <ExerciseName>{exercise.name}</ExerciseName>
              <ExerciseSet>{exercise.set} set</ExerciseSet>
            </ExerciseItem>
          ))}
        </ExerciseContainer>
      ) : null}
    </Container>
  );
}
const Container = styled.View``;
const Item = styled.TouchableOpacity`
  flex-direction: row;
  width: 303px;
  height: 45px;
  background-color: #f3f3f3;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  margin-left: 15px;
`;
const ItemSubTitle = styled.Text`
  margin-right: 15px;
  color: #757575;
`;
const ExerciseContainer = styled.View`
  margin: 1px 20px;
`;
const ExerciseItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 3px;
`;
const ExerciseName = styled.Text`
  color: #757575;
`;
const ExerciseSet = styled.Text`
  color: #757575;
`;
