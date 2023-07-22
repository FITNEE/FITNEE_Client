import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";


const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background: #F3F3F3;
`;

const RoutineText = styled.Text`
  font-weight: 600;
  font-size: 24px;
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
  margin-bottom: 21px;
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

const CircleBox1 = styled.View`
  justify-content: space-between;
  flex-Direction: row;
`;

const CircleBox2 = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const RoutineCircle = styled.View`
  width: 80px;
  height: 80px;
  background: #DDD;
  border-radius: 100%;
  margin-bottom: 8px;
`;

const UnderCircle = styled.View`
  background : #DDD;
  height: 15px;
  width: 55px;
  margin-bottom: 19px;
`;

const RoutineRec = styled.View`
  width: 311px;
  height: 175px;
  border-radius: 12px;
  background: #DDD;
  margin-bottom: 40px;
`;

export default function registerRoutine({ navigation }) {
    const goToStartExercise = () => navigation.navigate("startExercise");
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#F3F3F3",}}>
        <Container>
          <RoutineText>루틴을 생성해 주세요!</RoutineText>
          <RoutineExplain>
              <RoutineExplainText>
              회원님께 딱 맞는 루틴으로 {"\n"}
              간편하게 운동하고 결과를 분석해보세요.
              </RoutineExplainText>
          </RoutineExplain>

          <CircleBox1>
            <CircleBox2>
              <RoutineCircle/>
              <UnderCircle/>
            </CircleBox2>

            <CircleBox2>
              <RoutineCircle/>
              <UnderCircle/>
            </CircleBox2>

            <CircleBox2>
              <RoutineCircle/>
              <UnderCircle/>
            </CircleBox2>
          </CircleBox1>
        
          
          <RoutineRec />
          <CreateRoutine onPress={goToStartExercise}>
              <CreateRoutineText>루틴 등록하기</CreateRoutineText>
          </CreateRoutine>
      </Container>
    </SafeAreaView>
  );
}