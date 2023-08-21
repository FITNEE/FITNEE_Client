import React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'

const ExerciseName = styled.Text`
    color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
    text-align: center;
    font-size: 20px;
    font-family: Pretendard-SemiBold;
    line-height: 32px;
    width: 327px;
    margin: 16px 24px 32px 24px;
`

const Container = styled.View`
    flex: 1;
    align-items: center;
    padding-right: 24px;
    padding-left: 24px;
    background-color: ${({ isDark }) => (isDark ? colors.grey_9 : colors.grey_2)};
`

export default function ExerciseCard({ exerciseName, children, isDark }) {
    return (
        <Container isDark={isDark}>
            <ExerciseName isDark={isDark}>{exerciseName}</ExerciseName>
            {children}
        </Container>
    )
}
