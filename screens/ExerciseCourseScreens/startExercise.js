import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ProgressCircle from "../../components/ProgressCircle1";
import GrayCircle from "../../components/GrayCircle";
import { ScrollView } from "react-native-gesture-handler";
import COMMENTDATA from "./commentData";
import { BackButton } from '../../Shared';




const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background: #FFF;
`;

const ExerciseText = styled.Text`
  font-weight: 600;
  font-size: 24px;
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
    margin-bottom: 41px;
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

const ExerciseRec = styled.View`
  width: 311px;
  height: 175px;
  border-radius: 12px;
  background: #F3F3F3;
  margin-bottom: 12px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const RecText1 = styled.Text`
  color: #262626;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  width: 188px;
`;

const RecText2 = styled.Text`
  color: #262626;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  width: 55px;
`;

const RecText3 = styled.Text`
  color: #262626;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  width: 36px;
`;

const RecTextLine = styled.View`
  flex-Direction: row;
  width: 279px;
  margin-bottom: 4px;
`;

const CirclesLine = styled.View`
  flex-Direction: row;
  width: 256px;
  justify-content: space-around;
`;



export default function startExercise({ navigation }) {
    const goToExerciseCourse = () => navigation.navigate("exerciseCourse");

    const [min, setMin] = useState(0);
    const [sec, setSet] = useState(0);
    const [kcal, setKcal] = useState(0);


    const exerciseList = COMMENTDATA.map((comment) => 
        <RecTextLine>
          <RecText1>{comment.name}</RecText1>
          <RecText2>{comment.kg}</RecText2>
          <RecText3>{comment.set}</RecText3>
        </RecTextLine>  
    );
    
    
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#FFF"}}>
      <Container>
        <BackButton onPress={() => goBack()} />
        <ExerciseText>운동을 시작해 볼까요?</ExerciseText>
        <ExerciseExplainText>헬린이를 위한 무분할 루틴</ExerciseExplainText>

        <CirclesLine>
          <ProgressCircle num="40" unit="분" title="예상 소요시간" />
          <ProgressCircle num="30" unit="초" title="세트간 휴식" />
          <GrayCircle num="400" unit="kcal" title="소모 칼로리" />
        </CirclesLine>

        <ExerciseRec>
          <ScrollView>
            {exerciseList}
          </ScrollView>
        </ExerciseRec>

       
        <ExerciseButton onPress={goToExerciseCourse}>
                <ExerciseButtonText>시작</ExerciseButtonText>
        </ExerciseButton>
      </Container>
    </SafeAreaView>
  );
}