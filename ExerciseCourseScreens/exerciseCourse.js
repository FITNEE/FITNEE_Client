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
import ExerciseCard from "../components/ExerciseCard";
import ExerciseButton from "../components/ExerciseButton";
import CurrentExplain from "../components/CurrentExplain";
import CurrentSet from "../components/CurrentSet";
import COMMENTDATA from "./commentData";



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
  const inputRef = React.useRef();
  const duration = "3";
  const timerAnimation = React.useRef(new Animated.Value(0)).current;
  const textInputAnimation = React.useRef(new Animated.Value(3)).current;
  
  React.useEffect(()=> {
    const listener = textInputAnimation.addListener(({value}) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString()
      })
    })

    return () => {
      textInputAnimation.removeListener(listener)
      textInputAnimation.removeAllListeners();
    } 
  })
  const animation = React.useCallback(() => {

      Animated.sequence([

        Animated.parallel([
           Animated.timing(textInputAnimation, {
            toValue: 1,
            duration: 3100,
            useNativeDriver: true,
          }),

          Animated.timing(timerAnimation, {
            toValue: duration,
            duration: 100,
            useNativeDriver: true,
          }),

        
      ]),

        Animated.timing(timerAnimation, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),

        
      ]).start()}, [])


  const textOpacity = textInputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  const styles = StyleSheet.create({
    text: {
      color: "#FFF",
      textAlign: "center",
      fontSize: "80px",
      fontWeight: "600",
    }
  })

  const exerciseCardList = COMMENTDATA.map((comment) => 
    <ExerciseCard exerciseName={comment.name}>
      
    </ExerciseCard>  
  );

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#DDD"}}>

      <ExerciseCard exerciseName="사이드 레터럴 레이즈">  

          <ExerciseCircle>

          </ExerciseCircle>

          <ReplaceButton>
            <ReplaceButtonText>운동 대체하기</ReplaceButtonText>
          </ReplaceButton>
          

          <CurrentSet set="1" kg="20" num="15"/>
        
          <CurrentExplain //운동 설명
            expl1="허리를 과도하게 안으로 넣지 마세요." 
            expl2="적절한 무게로 승모근에 무리가 가지 않도록 하세요."
            expl3="안장과 바의 위치점을 올바르게 맞춰주세요."
          />
          
                
        <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  justifyContent: 'center',
                  width,
                  height,
                  opacity: timerAnimation,
                  backgroundColor: "rgba(38, 38, 38, 0.40)",
                },
          ]}/>
    
          <Animated.View style={{
              position: 'absolute',  
              justifyContent: 'center',
              alignItems: 'center',
              height: '92%',
              opacity: timerAnimation,
            }}
          >
              <TextInput ref={inputRef}
                  style={styles.text}
                  defaultValue={duration.toString()}
                  Opacity={textOpacity}
                  editable={false}
              />
          </Animated.View>


          <ExerciseButton //운동 시작 버튼
              text="운동 시작"
              disabled={false}
              onPress={animation}
          />
      
        </ExerciseCard>
    </SafeAreaView>

  );
}