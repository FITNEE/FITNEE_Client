import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { styled } from "styled-components/native";
import Records from "../components/Records";
import Analysis from "../components/Analysis";


export default function MyPage() {
    const [showRecords,SetShowRecords] = useState(true);

    const Container = styled.ScrollView`
        background-color: #fff;
    `;
    const Choice = styled.View`
        margin-top: 10px;
        margin-left: 24px;
        flex-direction: row;
        align-items: center;
        gap: 16px;
    `;
    const ChoiceText = styled.Text`
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: 25.5px;
        color: #bfbfbf;
    `;
    const ChoiceButton = styled.TouchableOpacity`
        height: 26px;
        display: block;
        margin-bottom: 20px;
    `;
    const SelectedTextStyle = {
        color: "black"
    };
    const SelectedBoxStyle = {
        borderBottomWidth: 2,
        border: "#757575"
    };

    return (
    <SafeAreaView>
    <Container>
        <Choice>
            <ChoiceButton onPress={() => {SetShowRecords(true);}} style={showRecords&& SelectedBoxStyle}>
                <ChoiceText
                    style={showRecords&& SelectedTextStyle}
                >운동 기록</ChoiceText></ChoiceButton>
            <ChoiceButton onPress={() => {SetShowRecords(false);}} style={!showRecords&& SelectedBoxStyle}>
                <ChoiceText style={!showRecords&& SelectedTextStyle}>운동 분석 및 현황</ChoiceText></ChoiceButton>
        </Choice>
        {showRecords && <Records/>}
        {!showRecords && <Analysis/>}
    </Container>
    </SafeAreaView>
  );
}