import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ExerciseCard from "../components/ExerciseCard";
import ExerciseButton from "../components/ExerciseButton";
import CurrentExplain from "../components/CurrentExplain";
import CurrentSet from "../components/CurrentSet";




export default function exerciseCourse({ navigation }) {

  return (
      <ExerciseCard exerciseName="사이드 레터럴 레이즈">

        <CurrentSet set="1" kg="20" num="15"/>

        <CurrentExplain expl="허리를 과도하게 안으로 넣지 마세요. " />
        
        <ExerciseButton 
            text="운동 시작"
            disabled={false}
            onPress={null}
        />
        

      </ExerciseCard>
    );
}