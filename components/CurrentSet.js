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

const TextLine = styled.View`
    flexDirection: row;
    heignt: 20px;
    align-items: flex-end;
    padding-top:4px;
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

        <Box1/>
         
        <CurrentText>{kg}</CurrentText>
        <TextLine>
            <CurrentUnit>kg</CurrentUnit>
        </TextLine>
    
        <Box2/>

        <CurrentText>{num}</CurrentText>
        <TextLine>
            <CurrentUnit>회</CurrentUnit>
        </TextLine>
        
    </Container>
);
   
}