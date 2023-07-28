import React from "react";
import { View, Text } from "react-native";
import { styled } from "styled-components/native";
import { colors } from "../colors";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
    width: 100%;
`;
const EmptyImage = styled.Image`
    margin-top: ${windowHeight/6};
    width: 125px;
    height: 125px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 62.5px;
    background-color: ${colors.white};
`;
const TitleBlock = styled.View`
    margin-top: 16px;
    margin-bottom: 40px;
`;
const Title = styled.Text`
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 33.6px;
    height: 32px;
    text-align: center;
    margin-bottom: 10px;
`;
const SubText = styled.Text`
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
    text-align: center;
`;
const Button = styled.TouchableOpacity`
    margin-left: 16px;
    margin-right: 16px;
    margin-bottom: 8px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    height: 52px;
    background-color: ${colors.l_main};
`;
const ButtonText = styled.Text`
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 25.5px;
    color: ${colors.white};
`;

export default function NotHomeRoutine() {

    const COMMENTDATA = [
        {
            "id": 1,
            "name": "데드리프트"
        }
    ]
    
    return(
        <Container>
            <EmptyImage/>
            <TitleBlock>
                <Title>등록된 운동루틴이 없어요</Title>
                <SubText>간단한 질문에 답변하여{"\n"}나만의 루틴을 만들어보세요!</SubText>
            </TitleBlock>
           
            <Button>
                <ButtonText>AI 루틴 생성하기</ButtonText>
            </Button>
        </Container>
    );
} ;