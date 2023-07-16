import React, { useState } from "react";
import { Text, View } from "react-native";
import PercentageCircle from "react-native-progress-circle";
import { styled } from "styled-components/native";


    const Container = styled.View`
        width: 100%;
        margin-bottom: 50px;
    `;
    const Pictogram = styled.View`
        height: 240px;
        margin: 0px 24px;
        border-radius: 20px;
        background-color: #f3f3f3;
    `;
    const Exercise = styled.View`
        padding-top: 32px;
    `;
    const Title = styled.Text`
        font-size: 17px;
        font-weight: 600;
        line-height: 25.5px;
        margin: 0px 24px 16px 24px;
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
    const BlockContent = styled.View`
    `;
    const Data = styled.View`
        flex-direction: row;
    `;
    const CircleText = styled.Text`
        font-size: 24px;
        font-weight: 600;
        line-height: 33.6px;
    `;
    const CircleMiniText = styled.Text`
        font-size: 13px;
        font-weight: 400;
        line-height: 19.5px;
        padding-top: 8px;
    `;
    const CircleTitle = styled.Text`
        font-size: 13px;
        font-weight: 400;
        line-height: 19.5px;
    `;

export default function Analysis() {

    const calorie = useState('1280');
    const kilometer = useState('244');
    const hour = useState('43')

    return (
    <Container>
    <Pictogram/>
    <Exercise>
        <Title>운동 현황</Title>
        <Block>
            <Circle/>
            <BlockContent>
                <Data><CircleText>{calorie} </CircleText><CircleMiniText>kcal</CircleMiniText></Data>
                <CircleTitle>최근 일주일 간 소모한 칼로리</CircleTitle>
            </BlockContent>
        </Block>
        <Block>
            <Circle/>
            <BlockContent>
                <Data><CircleText>{kilometer} </CircleText><CircleMiniText>km</CircleMiniText></Data>
                <CircleTitle>최근 일주일 간 뛴 거리</CircleTitle>
            </BlockContent>
        </Block>
        <Block>
            <Circle/>
            <BlockContent>
                <Data><CircleText>{hour} </CircleText><CircleMiniText>Hour</CircleMiniText></Data>
                <CircleTitle>총 누적 운동 시간</CircleTitle>
            </BlockContent>
        </Block>
    </Exercise>
    </Container>
  );
}