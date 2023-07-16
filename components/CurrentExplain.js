import React from "react";
import styled from "styled-components/native";

const CurrentExplain = styled.View`
    width: 327px;
    height: 108px;
    border-radius: 12px;
    background: #F3F3F3;
`;

const CurrentExplainCircle = styled.View`
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background: #D9D9D9;
`;

const CurrentExplainLine = styled.View`
    display: flex;
    width: 279px;
    align-items: center;
    gap: 4px;
    flexDirection: row;
`;

const CurrentExplainText = styled.Text`
    width: 263px;
    flex-shrink: 0;
    color: #262626;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
`;




export default function currentExplain({ expl }) {
  return (
    <CurrentExplain>
        <CurrentExplainLine>
            <CurrentExplainCircle/>
            <CurrentExplainText>{expl}</CurrentExplainText>
        </CurrentExplainLine>
    </CurrentExplain>
  );
}
