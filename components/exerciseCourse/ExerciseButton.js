import React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'

const Button = styled.TouchableOpacity`
    width: 247px;
    height: 52px;
    border-radius: 120px;
    background: ${colors.l_main};
    justify-content: center;
    margin-top: 19px;
    position: relative;
`
const ButtonText = styled.Text`
    color: ${({ isDark }) => (isDark ? colors.black : colors.white)};
    text-align: center;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 25.5px;
`
export default function ExerciseButton({ onPress, disabled, text, isDark }) {
    return (
        <Button disabled={disabled} onPress={onPress}>
            <ButtonText isDark={isDark}>{text}</ButtonText>
        </Button>
    )
}
