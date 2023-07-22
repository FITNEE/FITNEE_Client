import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import {
  TextInput,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import styled from "styled-components/native";
import ExerciseCard from "../../components/ExerciseCard";
import ExerciseButton from "../../components/ExerciseButton";
import CurrentExplain from "../../components/CurrentExplain";
import CurrentSet from "../../components/CurrentSet";
import COMMENTDATA from "./commentData";
import { colors } from "../../colors";



const ExerciseCircle = styled.View`
  width: 291px;
  height: 291px;
  border-radius: 291px;
  background: #F3F3F3;
  margin-bottom: 24px;
`;

const FirstRec = styled.View`
    width: 20px;
    height: 6px;
    background-color: ${colors.grey_7};
`;


const LastRec = styled.View`
    width: 20px;
    height: 6px;
    border-radius: 0px 10px 10px 0px;
    background-color: ${colors.grey_4};
    margin-left: 4px;
`;

const SetBarLine = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 36px;
`;

const JustText = styled.Text`
    color: #9747FF;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    line-height: 22.5px;
    margin: 23px 0px 5px 0px;
`;



export default function exerciseCourse_1({ navigation }) {
        //운동 중 페이지. 나중에 운동 과정 페이지 하나에 다 넣을 예정

    const goToCompleteExercise = () => navigation.navigate("exerciseCourse_2");

    return (
        <SafeAreaView style={{flex:1, backgroundColor:"#DDD"}}>
    
          <ExerciseCard exerciseName="사이드 레터럴 레이즈">  
    
          <ExerciseCircle/>

          <SetBarLine>
            <FirstRec style={{ background: colors.grey_6}}/> 
            <LastRec style={{ background: colors.grey_3}}/>
          </SetBarLine>


              <CurrentSet set="1" kg="20" num="15"/>
            
              <CurrentSet set="1" kg="20" num="15"/>
              

              <JustText >허리를 과도하게 안으로 넣지 마세요. </JustText>
    
              <ExerciseButton //세트 완료 버튼
                  text="세트 완료"
                  disabled={false}
                  onPress={goToCompleteExercise}
              />
          
            </ExerciseCard>
        </SafeAreaView>
    
    );
}