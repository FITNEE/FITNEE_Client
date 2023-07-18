import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ProgressCircle from "../components/ProgressCircle1";
import GrayCircle from "../components/GrayCircle";


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
    margin-bottom: 41px;
`;

const ResultButton = styled.TouchableOpacity`
    width: 327px;
    height: 52px;
    border-radius: 12px;
    background: #BFBFBF;
    justify-content: center;
    margin-bottom: 8px;
`;

const HomeButton = styled.TouchableOpacity`
    width: 327px;
    height: 52px;
    border-radius: 12px;
    background: #F3F3F3;
    justify-content: center;
`;


const ButtonText = styled.Text`
    color: #262626;
    text-align: center;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
`;

const ExerciseRec = styled.View`
    width: 311px;
    height: 175px;
    border-radius: 12px;
    background: #F3F3F3;
    margin-bottom: 68px;
`;

CirclesLine = styled.View`
  flexDirection: row;
  width: 256px;
  justify-content: space-around;
`;

const Bubble = styled.View`
  position: absolute;
  background: #DDD;
  width: 60px;
  height: 32px;
  padding: 0px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  top: 204px;
`;

const BubbleArrow = styled.View`
  position: absolute;
  border-style: solid;
  border-width: 12px 8px 0px;
  border-color: #DDD transparent;
  display: block;
  width: 0;
  z-index: 1;
  top: 30px;
  left: 22px;
`;

const BubbleText = styled.Text`
    color: #FF8181;
    font-size: 11px;
    font-weight: 400;
`;



export default function completeExercise({ navigation }) {

    const goToHome = () => navigation.navigate("registerRoutine");
    const goToResult = () => navigation.navigate("exerciseResult");

    const [shouldRender, setShouldRender] = useState(true);
    useEffect(() => {
        // 일정 시간(예: 5초) 후에 렌더링 여부를 false로 변경
        const timer = setTimeout(() => {
            setShouldRender(false);
        }, 3000); // 5초

        // 컴포넌트가 언마운트되면 타이머 클리어
        return () => clearTimeout(timer);
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행


  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#FFF"}}>
      <Container>
        <ExerciseText>운동을 완료했어요!</ExerciseText>
        <ExerciseExplainText>중량 정보를 업데이트 했어요</ExerciseExplainText>

        {shouldRender ? (
         <Bubble>
            <BubbleText>{`+100Kg`}</BubbleText>
            <BubbleArrow />
        </Bubble>
        ) : null}
        
        <CirclesLine>
          <ProgressCircle num="31" unit="분" title="소요시간"/>
          <GrayCircle num="3300" unit="kg" title="오늘 든 무게"/>
          
          <GrayCircle num = "400" unit="kcal" title="소모 칼로리" />
        </CirclesLine>

        <ExerciseRec/>

        <ResultButton onPress={goToResult}>
              <ButtonText>결과 자세히 보기</ButtonText>
        </ResultButton>

          <HomeButton onPress={goToHome}>
              <ButtonText>홈으로 돌아가기</ButtonText>
        </HomeButton>

      </Container>
    </SafeAreaView>
  );
}