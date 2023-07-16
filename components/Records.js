import React, { useState } from "react";
import { Text, View } from "react-native";
import PercentageCircle from "react-native-progress-circle";
import { styled } from "styled-components/native";
import CalendarView from "./CalendarView";

    const Container = styled.View`
        width: 100%;
        margin-bottom: 50px;
    `;
    const Bar = styled.View`
        height: 16px;
        background-color: #f3f3f3;
    `;
    const Exercise = styled.View`
        padding-top: 24px;
        gap: 32px;
    `;
    const Title = styled.Text`
        font-size: 17px;
        font-weight: 600;
        line-height: 25.5px;
        margin: 0px 24px;
    `;
    const Circles = styled.View`
        justify-content: center;
        flex-direction: row;
        gap: 8px;
    `;
    const Circle = styled.View`
        width: 80px;
        height: 80px;
        border-radius: 40px;
        background-color: #f3f3f3;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    `;
    const CircleText = styled.Text`
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        line-height: 32px;
    `
    // width 화면 width 가져오기..
    const CircleContent = styled.View`
        gap: 8px;
    `;
    const CircleTitle = styled.Text`
        text-align: center;
        font-size: 10px;
        font-weight: 400;
        line-height: 15px;
    `;
    const List = styled.View`
        border-radius: 12px;
        background-color: #f3f3f3;
        margin: 0px 32px 49px 32px;
        padding: 16px;
        gap: 14px;
    `;
    const ListText = styled.Text`
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 19.5px;
    `;
    const MiniText = styled.Text`
        font-size: 10px;
        font-style: normal;
        font-weight: 600;
        padding-top: 4px;
        line-height: 32px;
    `;
    
export default function Records() {

    const minute = useState(31);
    const kilogram = useState(3300);
    const calorie = useState(400);
    
    const now = new Date();
    const month = now.getMonth()+1;
    const date = now.getDate();

    return (
    <Container>
    <CalendarView/>
    <Bar />
    <Exercise>
        <Title>{month}월 {date}일 완료한 운동</Title>
        <Circles>
            <CircleContent>
                <PercentageCircle
                percent={31/60*100} radius={40} borderWidth={2} color="#9747FF" shadowColor="#F3F3F3" bgColor="#FFF">
                    <View style={{flexDirection: "row", alignItems: "center"}}><CircleText>{minute}</CircleText><MiniText>분</MiniText></View>
                </PercentageCircle>
                <CircleTitle>소요시간</CircleTitle>
            </CircleContent>
            <CircleContent>
                <Circle><CircleText>{kilogram}</CircleText><MiniText>kg</MiniText></Circle>
                <CircleTitle>들어올린 무게</CircleTitle>
            </CircleContent>
            <CircleContent>
                <Circle><CircleText>{calorie}</CircleText><MiniText>Kcal</MiniText></Circle>
                <CircleTitle>소모 칼로리</CircleTitle>
            </CircleContent>
        </Circles>
        <List>
            <ListText>{'데드리프트'}</ListText>
            <ListText>{'덤벨프레스'}</ListText>
            <ListText>{'바벨 로우'}</ListText>
            <ListText>{'사이드 레터럴 레이즈'}</ListText>
            <ListText>{'레그프레스'}</ListText>
            <ListText>{'크런치'}</ListText>
        </List>
    </Exercise>
    </Container>

  );
}