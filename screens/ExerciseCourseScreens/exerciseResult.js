import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { format } from 'date-fns'
import moment from "moment/moment";
import { ScrollView } from "react-native-gesture-handler";


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 24px 24px;
  background: #FFF;
`;

const TextBox = styled.View`
    align-items: baseline;
    gap: 8px;
    height: 96px;
    width: 375px;
`;

const ExerciseText = styled.Text`
  font-weight: 600;
  font-size: 24px;

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
    margin-top: 191px;
`;


const ButtonText = styled.Text`
    color: #262626;
    text-align: center;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
`;


const JustCircle = styled.View`
    border-radius: 100%;
    width: 160px;
    height: 160px;
    border-radius: 120px;
    background:#DDD;
    margin-top: 64px;
`;

const JustText = styled.Text`
    color: #000;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
    margin: 16px 0px 94px 0px;
`;

const BlankBox = styled.View`
     margin-top: 132px;
`;



export default function exerciseResult({ navigation }) {

    let Week = new Array('일', '월', '화', '수', '목', '금', '토');

    const now = new Date();
    const day = Week[now.getDay()];
    let formatDate = format(now, 'yyyy. MM. dd')

    const goToHome = () => navigation.navigate("registerRoutine");

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#FFF"}}>
        <ScrollView>
            <Container>
                <BlankBox/>
                <TextBox>
                    <ExerciseText>소형차 한 대 만큼의 {"\n"}무게를 들어올렸어요</ExerciseText>
                    <ExerciseExplainText>{formatDate} ({day})에 분석된 운동 역량 분석 결과입니다.</ExerciseExplainText>
                    </TextBox>
                
                <JustCircle/>
                <JustText>3300kg</JustText>

                <TextBox> 
                    <ExerciseText>성장속도가 빠른 {"\n"}야망 헬린이</ExerciseText>
                </TextBox>

                <HomeButton onPress={goToHome}>
                    <ButtonText>확인했어요</ButtonText>
                </HomeButton>
        
            </Container>
        </ScrollView>
    </SafeAreaView>
  );
}