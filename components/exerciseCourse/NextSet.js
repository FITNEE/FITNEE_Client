import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components/native";
import { IsDarkAtom } from "../../recoil/MyPageAtom";
import { colors } from "../../colors";
import Check_disabled from "../../assets/SVGs/Check_Disabled.svg";

const TextLine = styled.View`
  flex-direction: row;
  height: 32px;
  align-items: center;
`;

const Box1 = styled.View`
  width: 130px;
  flex-direction: row;
  align-items: center;
  justify-content: baseline;
  height: 32px;
`;

const Box2 = styled.View`
  width: 84px;
  flex-direction: row;
  align-items: center;
  justify-content: baseline;
  height: 32px;
`;

const Box3 = styled.View`
  width: 49px;
  flex-direction: row;
  align-items: center;
  justify-content: baseline;
  height: 32px;
`;

const Container = styled.View`
  width: 327px;
  height: 56px;
  border-radius: 12px;
  background: ${({ isDark }) => (isDark ? colors.grey_8 : colors.grey_1)};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CurrentText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : "#858687")};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

const CurrentUnit = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : "#858687")};
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
`;

export default function NextSet({ set, kg, num, isDark }) {
  return (
    <Container isDark={isDark}>
      <Box1>
        <CurrentText isDark={isDark}>{set}</CurrentText>

        <CurrentUnit isDark={isDark}>세트</CurrentUnit>
      </Box1>

      <Box2>
        {kg !== "null" ? <CurrentText isDark={isDark}>{kg}</CurrentText> : null}
        {kg !== "null" ? <CurrentUnit isDark={isDark}>kg</CurrentUnit> : null}
      </Box2>

      <Box3>
        <TextLine>
          <CurrentText isDark={isDark}>{num}</CurrentText>
          <CurrentUnit isDark={isDark}>회</CurrentUnit>
        </TextLine>
      </Box3>

      <Check_disabled width={24} height={24} />
    </Container>
  );
}
