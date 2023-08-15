import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

const Button = styled.TouchableOpacity`
  width: 247px;
  height: 52px;
  border-radius: 120px;
  background: ${colors.l_main};
  justify-content: center;
  margin-top: 19px;
  position: relative;
`;
export default function ExerciseButton({ onPress, disabled, text }) {
  const isDark = useRecoilValue(IsDarkAtom);

  const ButtonText = styled.Text`
    color: ${isDark ? colors.black : colors.white};
    text-align: center;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 25.5px;
  `;
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
