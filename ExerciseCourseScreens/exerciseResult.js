import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { format } from 'date-fns'
import moment from "moment/moment";


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  background: #FFF;
`;

const TextBox = styled.View`
    align-tiems: baseline;
    gap: 8px;
    height: 96px;
    width: 375px;
    margin-bottom: 64px;
`;
const ExerciseText = styled.Text`
  font-weight: 600;
  font-size: 24px;
  font-height: 140%;
  line-height: 33.6px;
`;

const ExerciseExplainText = styled.Text`
    color: #000;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
`;


const HomeButton = styled.TouchableOpacity`
    width: 327px;
    height: 52px;
    border-radius: 12px;
    justify-content: center;
    background: #BFBFBF;
`;


const ButtonText = styled.Text`
    color: #262626;
    text-align: center;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
`;

CirclesLine = styled.View`
    flexDirection: row;
    width: 256px;
    justify-content: space-around;
`;





export default function exerciseResult({ navigation }) {

    let Week = new Array('일', '월', '화', '수', '목', '금', '토');

    const now = new Date();
    const day = Week[now.getDay()];
    let formatDate = format(now, 'yyyy. MM. dd')

    const goToHome = () => navigation.navigate("registerRoutine");

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#FFF"}}>
      <Container>
        <TextBox>
            <ExerciseText>소형차 한 대 만큼의 {"\n"}무게를 들어올렸어요</ExerciseText>
            <ExerciseExplainText>{formatDate} ({day})에 분석된 운동 역량 분석 결과입니다.</ExerciseExplainText>
            </TextBox>
        

        <TextBox> 
            <ExerciseText>성장속도가 빠른 {"\n"}야망 헬린이</ExerciseText>
        </TextBox>

        <HomeButton onPress={goToHome}>
              <ButtonText>확인했어요</ButtonText>
        </HomeButton>
       

      </Container>
    </SafeAreaView>
  );
}