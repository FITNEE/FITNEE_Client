import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

const CurrentExplain = styled.View`
  display: flex;
  width: 279px;
  align-items: center;
  gap: 4px;
  flex-direction: row;
`;

const CurrentExplainCircle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: ${colors.grey_3};
`;

const CurrentExplainText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 12px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
`;
export default function CurrentExplainLine({ expl }) {
  const isDark = useRecoilValue(IsDarkAtom);

  return (
    <CurrentExplain>
      <CurrentExplainCircle />
      <CurrentExplainText isDark={isDark}>{expl}</CurrentExplainText>
    </CurrentExplain>
  );
}
