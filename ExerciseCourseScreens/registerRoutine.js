import React from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import styled from "styled-components/native";


const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 40px;
`;

const RoutineText = styled.Text`
  font-weight: 600;
  font-size: 24px;
  font-height: 140%;
  text-align: center;
  line-height: 33.6px;
`;

const RoutineExplain = styled.View`
    align-items: center;
    justify-content: center;
    width: 327px;
`;

const RoutineExplainText = styled.Text`
    color: #262626;
    padding: 8px;
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
`;

const CreateRoutine = styled.TouchableOpacity`
  width: 343px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #BFBFBF;
  justify-content: center;
`;

const CreateRoutineText = styled.Text`
    color: #000;
    text-align: center;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
`;


export default function registerRoutine({ navigation }) {
    const goToStartExercise = () => navigation.navigate("startExercise");
  return <Container>
        <RoutineText>루틴을 생성해 주세요!</RoutineText>
        <RoutineExplain>
            <RoutineExplainText>
            회원님께 딱 맞는 루틴으로 {"\n"}
            간편하게 운동하고 결과를 분석해보세요.
            </RoutineExplainText>
        </RoutineExplain>
        
        <CreateRoutine onPress={goToStartExercise}>
            <CreateRoutineText>루틴 등록하기</CreateRoutineText>
        </CreateRoutine>
  </Container>
}