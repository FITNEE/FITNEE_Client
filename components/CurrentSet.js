import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
  width: 327px;
  height: 56px;
  border-radius: 12px;
  background: ${colors.grey_1};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const CurrentText = styled.Text`
  color: ${colors.black};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

const CurrentUnit = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
`;

const TextLine = styled.View`
  flex-direction: row;
  height: 20px;
  align-items: flex-end;
`;

const Box1 = styled.View`
  width: 94px;
`;

const Box2 = styled.View`
  width: 42px;
`;

export default function CurrentSet({ set, kg, num }) {
  return (
    <Container>
      <CurrentText>{set}</CurrentText>
      <TextLine>
        <CurrentUnit>세트</CurrentUnit>
      </TextLine>

      <Box1 />

      {kg !== "null" ? <CurrentText>{kg}</CurrentText> : null}
      {kg !== "null" ? (
        <TextLine>
          <CurrentUnit>kg</CurrentUnit>
        </TextLine>
      ) : null}

      <Box2 />

      <CurrentText>{num}</CurrentText>
      <TextLine>
        <CurrentUnit>회</CurrentUnit>
      </TextLine>
    </Container>
  );
}
