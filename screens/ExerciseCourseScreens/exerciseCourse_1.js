import React, { useEffect, useState } from "react";
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
import CurrentExplainLine from "../../components/CurrentExplainLine";
import NextSet from "../../components/NextSet";
import CurrentSet from "../../components/CurrentSet";
import COMMENTDATA from "./commentData";
import { colors } from "../../colors";
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'


const ExerciseCircle = styled.View`
  width: 307px;
  height: 307px;
  border-radius: 291px;
  background: #F3F3F3;
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
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

const TextBox = styled.View`
  width: 327px;
  height: 24px;
  margin: 23px 0px 5px 0px;
`;

const JustText = styled.Text`
    color: #9747FF;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    line-height: 22.5px;
    
`;

// const CurrentBox = COMMENTDATA.map((comment) => {
//   <CurrentSet set={comment.set} kg={comment.kg} num={comment.num}></CurrentSet>
// });

// const NextBox = COMMENTDATA.map((comment) => {
//   <NextSet set={comment.set} kg={comment.kg} num={comment.num}></NextSet>
// });



export default function exerciseCourse_1({ navigation }) {
        //운동 중 페이지. 나중에 운동 과정 페이지 하나에 다 넣을 예정

    const goToCompleteExercise = () => navigation.navigate("exerciseCourse_2");
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [advice, setAdvice] = React.useState("");
    const [currentId, setCurrentId] = useState(1);

    const adviceData = [
      { id: 1, content: "허리를 과도하게 안으로 넣지 마세요",
      }, 
      { id: 2, content: "적절한 무게로 승모근에 무리가 가지 않도록 하세요.",
      },
      { id: 3, content: "안장과 바의 위치점을 올바르게 맞춰주세요.",}
    ]


    useEffect(() => {
        const interval = setInterval(() => {
            // 다음 id를 계산하여 currentId를 업데이트
            const nextId = currentId + 1 > adviceData.length ? 1 : currentId + 1;
            setCurrentId(nextId);

            // 해당 id에 해당하는 데이터를 가져와 advice를 업데이트
            const data = adviceData.find(item => item.id === nextId);
            setAdvice(data.content);
          }, 3500); // 3.5초마다 데이터를 가져오도록 설정

          return () => clearInterval(interval);

      }, [currentId]);
  

    return (
        <SafeAreaView style={{flex:1, backgroundColor:"#DDD"}}>
    
          <ExerciseCard exerciseName="사이드 레터럴 레이즈">
    
          <ExerciseCircle>
          <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={20}
                    colors={"#757575"}
                    size={315}
                    strokeWidth={8}
                    trailColor={"#BFBFBF"}
                    onComplete={() => ({ shouldRepeat: false, delay: 1 })}
                    updateInterval={0.001}   
            >
            </CountdownCircleTimer>
          </ExerciseCircle>

          <SetBarLine>
            <FirstRec style={{ background: colors.grey_6}}/> 
            <LastRec style={{ background: colors.grey_3}}/>
          </SetBarLine>


              <CurrentSet set="1" kg="20" num="15"/>
            
              <NextSet set="2" kg="20" num="15"/>
              

              <TextBox>
                <JustText > 
                { advice }
              </JustText>
              </TextBox>
              
    
              <ExerciseButton //세트 완료 버튼
                  text="세트 완료"
                  disabled={false}
                  onPress={goToCompleteExercise}
              />
          
            </ExerciseCard>
        </SafeAreaView>
    
    );
}