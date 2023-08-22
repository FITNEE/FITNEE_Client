import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import PercentageCircle from 'react-native-progress-circle'
import { styled } from 'styled-components/native'
import { colors } from '../../colors'

const CircleLine = styled.View`
  flex-direction: row;
  line-height: 32px;
  align-items: baseline;
`

const CircleBox = styled.View`
  justify-content: center;
  align-items: center;
`
const CircleText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 20px;
  font-family: Pretendard-SemiBold;
`

const CircleUnit = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 10px;
  font-family: Pretendard-SemiBold;
`

const UnderCircle = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  text-align: center;
  font-size: 10px;
  font-family: Pretendard-Regular;
  line-height: 15px;
  margin-bottom: 31px;
  margin-top: 8px;
`

export default function ProgressCircle({ num, unit, title, isDark }) {
  const percentage = (num / 60) * 100

  return (
    <CircleBox>
      <PercentageCircle
        percent={percentage}
        radius={40}
        borderWidth={2}
        color={colors.d_main}
        shadowColor={isDark ? colors.grey_8 : colors.grey_1}
        bgColor={isDark ? colors.grey_9 : colors.white}
      >
        <CircleLine>
          <CircleText isDark={isDark}>{num}</CircleText>
          <CircleUnit isDark={isDark}>{unit}</CircleUnit>
        </CircleLine>
      </PercentageCircle>
      <UnderCircle isDark={isDark}>{title}</UnderCircle>
    </CircleBox>
  )
}
