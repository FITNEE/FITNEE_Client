import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ExerciseCard from "../components/ExerciseCard";
import ExerciseButton from "../components/ExerciseButton";
import CurrentExplain from "../components/CurrentExplain";
import CurrentSet from "../components/CurrentSet";
import completeExercise from "./completeExercise";


const ExerciseCircle = styled.View`
  width: 291px;
  height: 291px;
  border-radius: 291px;
  background: #F3F3F3;
`;


const ReplaceButton = styled.TouchableOpacity`
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: #BFBFBF;
  margin-top: 18px;
  margin-bottom: 12px;
  margin-right: 242.5px;
`;

const ReplaceButtonText = styled.Text`
  color: #363636;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 19.5px;
`;


export default function exerciseCourse({ navigation }) {

  const goToCompleteExercise = () => navigation.navigate("completeExercise");


  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#DDD"}}>
    
      <ExerciseCard exerciseName="사이드 레터럴 레이즈">

        <ExerciseCircle/>

        <ReplaceButton>
          <ReplaceButtonText>운동 대체하기</ReplaceButtonText>
        </ReplaceButton>
        

        <CurrentSet set="1" kg="20" num="15"/>

       
        <CurrentExplain 
          expl1="허리를 과도하게 안으로 넣지 마세요." 
          expl2="적절한 무게로 승모근에 무리가 가지 않도록 하세요."
          expl3="안장과 바의 위치점을 올바르게 맞춰주세요."
          />

        
        <ExerciseButton 
            text="운동 시작"
            disabled={false}
            onPress={goToCompleteExercise}
        />
        

      </ExerciseCard>
      </SafeAreaView>
    );
}