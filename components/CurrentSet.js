import React from "react";
import styled from "styled-components/native";


const Container = styled.View`
    width: 327px;
    height: 56px;
    border-radius: 12px;
    background: #F3F3F3;
    flexDirection: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
`;


const CurrentText= styled.Text`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
`;

const CurrentUnit = styled.Text`
    color: #000;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
`;

const TextSet = styled.Text`
    justify-content: flex-end;
`;


export default function CurrentSet({ set, kg, num }) {
  return (
    <Container>
        <CurrentText>{set}</CurrentText>
        <CurrentUnit>세트</CurrentUnit>
        <CurrentText>{kg}</CurrentText>
        <CurrentUnit>kg</CurrentUnit>
        <CurrentText>{num}</CurrentText>
        <CurrentUnit>회</CurrentUnit>
    </Container>
);
   
}