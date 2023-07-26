import { useState } from "react";
import styled from "styled-components/native";

export default function RoutineItem({
  day,
  parts,
  exercises,
  onPress,
  select,
}) {
  return (
    <Container>
      <Item onPress={onPress}>
        <ItemTitle>{day}</ItemTitle>
        <ItemSubTitle>{parts}</ItemSubTitle>
      </Item>
      {select ? (
        <ExerciseContainer>
          {exercises.map((exercise) => (
            <ExerciseItem key={exercise.id}>
              <ExerciseName>{exercise.name}</ExerciseName>
              <ExerciseSet>{exercise.set}</ExerciseSet>
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
  height: 58px;
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
  margin: 20px;
`;
const ExerciseItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
`;
const ExerciseName = styled.Text`
  color: #757575;
`;
const ExerciseSet = styled.Text`
  color: #757575;
`;
