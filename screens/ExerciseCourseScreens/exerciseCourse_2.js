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
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'



const ExerciseCircle = styled.View`
  width: 291px;
  height: 291px;
  border-radius: 291px;
  background: #F3F3F3;
  margin-bottom: 24px;
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

const UnderLine = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 36px;
    width: 375px;
    height: 100px;
    background-color: ${colors.grey_4};
    position: absolute;
    bottom: 0;
`;



export default function exerciseCourse_2({ navigation }) {
    //휴식페이지. 나중에 운동 과정 페이지 하나에 다 넣을 예정

    const goToCompleteExercise = () => navigation.navigate("completeExercise");

    return (
        <SafeAreaView style={{flex:1, backgroundColor:"#DDD"}}>
    
          <ExerciseCard exerciseName="사이드 레터럴 레이즈">  


          <ReplaceButton>
            <ReplaceButtonText>운동 대체하기</ReplaceButtonText>
          </ReplaceButton>

          <CurrentSet set="1" kg="20" num="15"/>

          <UnderLine>


            <ReplaceButton onPress={goToCompleteExercise}>
                <ReplaceButtonText>바로 시작하기</ReplaceButtonText>
            </ReplaceButton>

          </UnderLine>

            </ExerciseCard>
        </SafeAreaView>
    
    );
}