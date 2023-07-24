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

const TitleText = styled.Text`
    color: #000;
    font-size: 17px;
    font-weight: 500;
    line-height: 25.5px;
`;

const ContentText = styled.Text`
    color: #5A5A5A;
    font-size: 13px;
    font-weight: 400;
    line-height: 19.5px;
`;

const ResultBox = styled.View`
    height: 94px;
    width: 298px;
    margin-bottom: 32px;
`;



export default function exerciseResult({ navigation }) {

    let Week = new Array('일', '월', '화', '수', '목', '금', '토');

    const now = new Date();
    const day = Week[now.getDay()];
    let formatDate = format(now, 'yyyy. MM. dd')

    const goToHome = () => navigation.navigate("registerRoutine");

    const data = [
        {id: "1", title: "운동 시간이 단축되었어요", content: "페이스가 다른 이용자보다 빠른 편이에요. 운동 시간이 단축되었다면 무게 혹은 횟수 등의 난이도를 높여보세요.",},
        {id: "2", title: "3일 연속 운동했어요", content: "근력운동은 연속으로 운동하는 것 보다, 격일로 운동했을 때 효과가 좋아요. 매일 운동하고싶다면 유산소 운동과 병행하는 것을 추천드릴게요.",},
    ]

    const resultList = data.map((item) => {
        <ResultBox>
            <TitleText>{item.title}</TitleText>
            {/* <ContentText>{item.content}</ContentText> */}
        </ResultBox>
        
    })


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

                {resultList}

                <HomeButton onPress={goToHome}>
                    <ButtonText>확인했어요</ButtonText>
                </HomeButton>
        
            </Container>
        </ScrollView>
    </SafeAreaView>
  );
}