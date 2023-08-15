import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background: ${colors.grey_1};
`;

const ExerciseCircle = styled.View`
  width: 307px;
  height: 307px;
  border-radius: 291px;
  background: ${colors.white};
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
`;

export default function Loading({ navigation }) {
  const goToStartExercise = () => navigation.navigate("StartExercise");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey_1 }}>
      <Container>
        <ExerciseCircle />
      </Container>
    </SafeAreaView>
  );
}
