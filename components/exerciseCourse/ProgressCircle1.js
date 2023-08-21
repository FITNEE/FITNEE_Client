import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import PercentageCircle from "react-native-progress-circle";
import { styled } from "styled-components/native";
import { colors } from "../../colors";

const CircleLine = styled.View`
  flex-direction: row;
  height: 20px;
  align-items: flex-end;
`;

const CircleBox = styled.View`
  justify-content: center;
  align-items: center;
`;
const CircleText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 20px;
  font-family: Pretendard-SemiBold;
`;

const CircleUnit = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 10px;
  font-family: Pretendard-SemiBold;
`;

const UnderCircle = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  text-align: center;
  font-size: 10px;
  font-family: Pretendard-Regular;
  line-height: 15px;
  margin-bottom: 31px;
  margin-top: 8px;
`;

const Bubble = styled.View`
  position: absolute;
  background: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  width: 60px;
  height: 32px;
  padding: 0px;
  border-radius: 12px;
  z-index: 1;
  align-items: center;
  bottom: 124px;
`;

const BubbleArrow = styled.View`
  position: relative;
  border-style: solid;
  border-width: 12px 8px 0px;
  border-color: ${({ isDark }) => (isDark ? colors.white : colors.black)}
    transparent;
  /* display: block; */
  width: 0;
  z-index: 1;
  top: 16px;
`;

const BubbleText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.black : colors.white)};
  font-size: 11px;
  font-family: Pretendard-Bold;
  top: 10px;
`;
export default function ProgressCircle({
  num,
  unit,
  title,
  bubbleOn,
  bubbleText,
  isDark,
}) {
  const percentage = (num / 60) * 100;

  const [shouldRender, setShouldRender] = useState(true);
  useEffect(() => {
    if (bubbleOn === false) setShouldRender(false);
    // 일정 시간(예: 5초) 후에 렌더링 여부를 false로 변경
    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 5000);
    // 컴포넌트가 언마운트되면 타이머 클리어
    return () => clearTimeout(timer);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  return (
    <CircleBox>
      {shouldRender ? (
        <Bubble isDark={isDark}>
          <BubbleText isDark={isDark}>{bubbleText}초</BubbleText>
          <BubbleArrow isDark={isDark} />
        </Bubble>
      ) : null}

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
  );
}
