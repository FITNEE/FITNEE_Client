import React from 'react'
import { styled } from 'styled-components/native'
import { colors } from '../../colors'

const PremiumContainer = styled.View`
    padding: 6px 12px 6px 6px;
    gap: 4px;
    border-radius: 100px;
    flex-direction: row;
    background-color: ${(props) => (props.isDark ? colors.grey_7 : colors.grey_3)};
    align-items: center;
`
const Circle = styled.View`
    width: 20px;
    height: 20px;
    background-color: ${colors.green};
    border-radius: 20px;
`
const PremiumText = styled.Text`
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.5px;
    color: ${(props) => (props.isDark ? colors.white : colors.black)};
`

export const Premium = ({ isDark }) => {
    return (
        <PremiumContainer isDark={isDark}>
            <Circle />
            <PremiumText isDark={isDark}>PREMIUM</PremiumText>
        </PremiumContainer>
    )
}
