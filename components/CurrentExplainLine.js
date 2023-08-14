import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../recoil/MyPageAtom";

const CurrentExplain = styled.View`
  display: flex;
  width: 279px;
  align-items: center;
  gap: 4px;
  flex-direction: row;
`;

export default function CurrentExplainLine({ expl }) {
  const isDark = useRecoilValue(IsDarkAtom);

  const CurrentExplainCircle = styled.View`
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background: ${colors.grey_3};
  `;

  const CurrentExplainText = styled.Text`
    width: 263px;
    flex-shrink: 0;
    color: ${isDark ? colors.white : colors.black};
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
  `;

  return (
    <CurrentExplain>
      <CurrentExplainCircle />
      <CurrentExplainText>{expl}</CurrentExplainText>
    </CurrentExplain>

    //     list.map((item)=>{
    //          <CurrentExplainLine>
    //              <CurrentExplainCircle/>
    //              <CurrentExplainText>{item.explain}</CurrentExplainText>
    //          </CurrentExplainLine>
    //     })
  );
}
