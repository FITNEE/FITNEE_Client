import React from "react";
import styled from "styled-components/native";


const Button = styled.TouchableOpacity`
    width: 247px;
    height: 52px;
    border-radius: 120px;
    background: #BFBFBF;
    justify-content: center;
    margin-top: 19px;
`;

const ButtonText = styled.Text`
    color: #262626;
    text-align: center;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 25.5px;
`;

export default function ExerciseButton({ onPress, disabled, text }) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}