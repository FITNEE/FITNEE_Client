import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../recoil/MyPageAtom";

export default function ExerciseCard({ exerciseName, children }) {
  const isDark = useRecoilValue(IsDarkAtom);

  const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 0px 24px;
    background: ${isDark ? colors.grey_9 : colors.grey_2};
  `;

  const ExerciseName = styled.Text`
    color: ${isDark ? colors.white : colors.black};
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
    width: 327px;
    margin: 16px 24px 32px 24px;
  `;

  return (
    <Container>
      <ExerciseName>{exerciseName}</ExerciseName>
      {children}
    </Container>
  );
}
