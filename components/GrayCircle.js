import React from "react";
import { Text } from "react-native";
import PercentageCircle from "react-native-progress-circle";
import { styled } from "styled-components/native";


const CircleBox = styled.View`
    jusitfy-content: center;
    align-items: center;
`;

const RoutineCircle = styled.View`
    width: 80px;
    height: 80px;
    background: #F3F3F3;
    border-radius: 100%;
    justify-content: center;
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


export default function GrayCircle({num, unit, title}) {

    return (
            <CircleBox>
                <RoutineCircle>
                    <CircleLine>
                        <CircleText>{num}</CircleText>
                        <CircleUnit>{unit}</CircleUnit>
                    </CircleLine>
                </RoutineCircle>

                <UnderCircle>{title}</UnderCircle>
            </CircleBox>
                     
  );
}