import React, { useState } from "react";
import { Text, View } from "react-native";
import { styled } from "styled-components/native";
import Records from "../components/Records";
import Analysis from "../components/Analysis";


export default function MyPage({navigation}) {
    const [showRecords,SetShowRecords] = useState(true);

    const Container = styled.ScrollView`
        background-color: #fff;
    `;
    const SettingBtn = styled.TouchableOpacity`
    `;
    const Header = styled.View`
        display: flex;
        width: 375px;
        height: 56px;
        padding: 16px 24px 16px 327px;
        justify-content: flex-end;
        align-items: center;
    
    `;
    const Choice = styled.View`
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
    <Container>
        <Header>
            <SettingBtn onPress={() => navigation.navigate("Setting")}><Text style={{
                textAlign: "right"
            }}>설정</Text></SettingBtn>
        </Header>
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
  );
}