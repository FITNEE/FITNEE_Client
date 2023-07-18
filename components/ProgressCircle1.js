import React, { useState } from "react";
import { Text } from "react-native";
import PercentageCircle from "react-native-progress-circle";
import { styled } from "styled-components/native";


const CircleBox = styled.View`
    jusitfy-content: center;
    align-items: center;
`;
 
const UnderCircle = styled.Text`
    color: #000;
    text-align: center;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px;
    margin-bottom: 31px;
    margin-top: 8px; 
`;

const CircleText= styled.Text`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
`;

const CircleUnit = styled.Text`
    color: #000;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
`;

const CircleLine = styled.View`
    flexDirection: row;
    height: 20px;
    align-items: flex-end;
`;

export default function ProgressCircle({num, unit, title}) {

    const percentage = num/60*100;

    return (
            <CircleBox>
                <PercentageCircle
                    percent={percentage}
                    radius={40} 
                    borderWidth={2}
                    color="#9747FF" 
                    shadowColor="#F3F3F3" 
                    bgColor="#FFF"
                >             
                <CircleLine>
                    <CircleText>{num}</CircleText>
                    <CircleUnit>{unit}</CircleUnit>
                </CircleLine>
                
                </PercentageCircle>
                <UnderCircle>{title}</UnderCircle>
            </CircleBox>
                     
  );
}