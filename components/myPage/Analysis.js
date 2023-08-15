import React, { useState } from "react";
import { Text, View } from "react-native";
import PercentageCircle from "react-native-progress-circle";
import { styled } from "styled-components/native";
import TotalChart from "./TotalChart";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";
import { colors } from "../../colors";

const Container = styled.View`
  width: 100%;
  margin-bottom: 50px;
`;
const Exercise = styled.View`
  padding-top: 32px;
`;
const Block = styled.View`
  padding: 8px 24px;
  align-items: center;
  flex-direction: row;
`;
const Circle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #f3f3f3;
  margin-right: 16px;
`;
const BlockContent = styled.View``;
const Data = styled.View`
  flex-direction: row;
`;

export default function Analysis(props) {
  const isDark = useRecoilValue(IsDarkAtom);
  const Title = styled.Text`
    font-size: 17px;
    font-weight: 600;
    line-height: 25.5px;
    margin: 0px 24px 16px 24px;
    color: ${isDark ? colors.white : colors.black};
  `;
  const CircleText = styled.Text`
    font-size: 24px;
    font-weight: 600;
    line-height: 33.6px;
    color: ${isDark ? colors.white : colors.black};
  `;
  const CircleMiniText = styled.Text`
    font-size: 13px;
    font-weight: 400;
    line-height: 19.5px;
    padding-top: 8px;
    color: ${isDark ? colors.white : colors.black};
  `;
  const CircleTitle = styled.Text`
    font-size: 13px;
    font-weight: 400;
    line-height: 19.5px;
    color: ${isDark ? colors.white : colors.black};
  `;

  const weekData = props.weekData;

  const weekIndex = weekData.length - 1;
  const calorie = weekData[weekIndex].weeklyCalories;
  const hour = weekData[weekIndex].weeklyExerciseTime;
  const kilometer = weekData[weekIndex].weeklyDistance;

  return (
    <Container>
      <TotalChart weekData={weekData} />
      <Exercise>
        <Title>운동 현황</Title>
        <Block>
          <Circle />
          <BlockContent>
            <Data>
              <CircleText>{calorie} </CircleText>
              <CircleMiniText>kcal</CircleMiniText>
            </Data>
            <CircleTitle>최근 일주일 간 소모한 칼로리</CircleTitle>
          </BlockContent>
        </Block>
        <Block>
          <Circle />
          <BlockContent>
            <Data>
              <CircleText>{kilometer} </CircleText>
              <CircleMiniText>km</CircleMiniText>
            </Data>
            <CircleTitle>최근 일주일 간 뛴 거리</CircleTitle>
          </BlockContent>
        </Block>
        <Block>
          <Circle />
          <BlockContent>
            <Data>
              <CircleText>{hour} </CircleText>
              <CircleMiniText>Hour</CircleMiniText>
            </Data>
            <CircleTitle>총 누적 운동 시간</CircleTitle>
          </BlockContent>
        </Block>
      </Exercise>
    </Container>
  );
}
