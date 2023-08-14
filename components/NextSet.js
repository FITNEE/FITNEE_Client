import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components/native";
import { IsDarkAtom } from "../recoil/MyPageAtom";
import { colors } from "../colors";

const TextLine = styled.View`
  flex-direction: row;
  height: 20px;
  align-items: flex-end;
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

export default function NextSet({ set, kg, num }) {
  const isDark = useRecoilState(IsDarkAtom);

  const Container = styled.View`
    width: 327px;
    height: 56px;
    border-radius: 12px;
    background: ${isDark ? colors.grey_8 : colors.grey_1};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  `;

  const CurrentText = styled.Text`
    color: ${isDark ? colors.white : rgba(0, 0, 0, 0.5)};
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
  `;

  const CurrentUnit = styled.Text`
    color: ${isDark ? colors.white : rgba(0, 0, 0, 0.5)};
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
  `;

  return (
    <Container>
      <Box1>
        <CurrentText>{set}</CurrentText>
        <TextLine>
          <CurrentUnit>세트</CurrentUnit>
        </TextLine>
      </Box1>

      <Box2>
        {kg !== "null" ? <CurrentText>{kg}</CurrentText> : null}
        {kg !== "null" ? (
          <TextLine>
            <CurrentUnit>kg</CurrentUnit>
          </TextLine>
        ) : null}
      </Box2>

      <CurrentText>{num}</CurrentText>
      <TextLine>
        <CurrentUnit>회</CurrentUnit>
      </TextLine>
    </Container>
  );
}
