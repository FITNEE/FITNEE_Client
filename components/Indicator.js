import React, { useState } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

const NumberView = styled.View`
  width: 69px;
  height: 31px;
  border-radius: 100px;
  background-color: ${colors.grey_3};
  justify-content: center;
  margin-bottom: 22px;
  padding: 4px 12px;
`;

const NumberText = styled.Text`
  color: ${colors.grey_8};
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  line-height: 22.5px;
`;

export default PageIndicator = ({ totalPages, currentPage }) => {
  return (
    <NumberView>
      <NumberText>
        {currentPage}/{totalPages}
      </NumberText>
    </NumberView>
  );
};
