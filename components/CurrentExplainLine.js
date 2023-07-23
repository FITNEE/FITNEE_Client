import React from "react";
import styled from "styled-components/native";



const CurrentExplainCircle = styled.View`
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background: #D9D9D9;
`;

const CurrentExplain = styled.View`
    display: flex;
    width: 279px;
    align-items: center;
    gap: 4px;
    flex-Direction: row;
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




export default function CurrentExplainLine({ expl }) {
  return (

        <CurrentExplain>
            <CurrentExplainCircle/>
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
