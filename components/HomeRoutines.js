import React from "react";
import { View, Text } from "react-native";
import { styled } from "styled-components/native";
import { colors } from "../colors";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
    width: 100%;
`;
const TitleBlock = styled.View`
    width: 100%;
    margin-top: 66px;
    margin-bottom: 40px;
    padding: 0px 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Title = styled.Text`
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 33.6px;
`;
const Day = styled.View`
    width: 64px;
    height: 64px;
    border-radius: 100px;
    background-color: ${colors.grey_3};
    justify-content: center;
    align-items: center;
`;
const DayText = styled.Text`
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 22.5px;
`;
const SectionBlock = styled.View`
    margin: 0px 24px;
    padding: 7px 20px;
    gap: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${colors.grey_2};
    border-radius: 10px;
`;

const Section = styled.View`
    align-items: center;
    width: ${windowWidth/2-44}px;
`;
const SectionText = styled.Text`
`;
const Bar = styled.View`
    width: 1px;
    height: 26px;
    background-color: ${colors.grey_4};
`;
const Cards = styled.ScrollView`
    margin-top: 16px;
    width: auto;
    padding: 0px 16px;
`;
const Card = styled.View`
    width: 188px;
    height: 188px;
    border-radius: 20px;
    background-color: ${colors.grey_3};
    margin: 0px 8px;
    align-items: center;
`;
const ExerciseView = styled.Image`
    width: 128px;
    height: 128px;
    border-radius: 100px;
    background-color: ${colors.white};
    margin: 16px 0px 10px 0px;
`;
const ExerciseName = styled.Text`
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 22.5px;
`;

export default function HomeRoutines() {

    const COMMENTDATA = [
        {
            "id": 1,
            "name": "데드리프트"
        }
    ]
    
    return(
        <Container>
            <TitleBlock>
                <Title>오늘 예정된{"\n"}운동 루틴이 있어요</Title>
                <Day>
                    <DayText>DAY3</DayText>
                </Day>
            </TitleBlock>
            <SectionBlock>
                <Section>
                    <SectionText>{'하체, 코어'}</SectionText>
                </Section>
                <Bar/>
                <Section>
                    <SectionText>{6}개의 운동</SectionText>
                </Section>
            </SectionBlock>
            <Cards horizontal={true} showsHorizontalScrollIndicator={false}>
                <Card>
                    <ExerciseView/>
                    <ExerciseName>{COMMENTDATA.name}데드리프트</ExerciseName>
                </Card>
                <Card>
                    <ExerciseView/>
                    <ExerciseName>{COMMENTDATA.name}</ExerciseName>
                </Card>
                <Card>
                    <ExerciseView/>
                    <ExerciseName>{COMMENTDATA.name}</ExerciseName>
                </Card>
                <Card>
                    <ExerciseView/>
                    <ExerciseName>{COMMENTDATA.name}</ExerciseName>
                </Card>
                <Card>
                    <ExerciseView/>
                    <ExerciseName>{COMMENTDATA.name}</ExerciseName>
                </Card>
                <Card>
                    <ExerciseView/>
                    <ExerciseName>{COMMENTDATA.name}</ExerciseName>
                </Card>
            </Cards>
        </Container>
    );
} ;