import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 40px;
`;

const ExerciseText = styled.Text`
  font-weight: 600;
  font-size: 24px;
  font-height: 140%;
  text-align: center;
  line-height: 33.6px;
`;

const ExerciseExplainText = styled.Text`
    padding: 8px;
    color: #9747FF;
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
`;

const ExerciseButton = styled.TouchableOpacity`
    width: 111px;
    height: 111px;
    flex-shrink: 0;
    border-radius: 55.5px;
    background: #757575;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ExerciseButtonText = styled.Text`
    color: #FFF;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 33.6px;
`;

export default function startExercise({ navigation }) {
    const goToExerciseCourse = () => navigation.navigate("exerciseCourse");

  return <Container>
    <ExerciseText>운동을 시작해 볼까요?</ExerciseText>
    <ExerciseExplainText>헬린이를 위한 무분할 루틴</ExerciseExplainText>

    <ExerciseButton onPress={goToExerciseCourse}>
            <ExerciseButtonText>시작</ExerciseButtonText>
    </ExerciseButton>
  </Container>
}