import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";
import { View } from "react-native";

export default function ExerciseCard({ exerciseName, children }) {
  const isDark = useRecoilValue(IsDarkAtom);

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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingRight: 24,
        paddingLeft: 24,
        backgroundColor: isDark ? colors.grey_9 : colors.grey_2,
      }}
    >
      <ExerciseName>{exerciseName}</ExerciseName>
      {children}
    </View>
  );
}
