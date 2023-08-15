import React, { useState } from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useRecoilState } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

const NumberView = styled.View`
  width: 69px;
  height: 31px;
  border-radius: 100px;
  background-color: ${({ DarkMode }) =>
    DarkMode ? colors.grey_8 : colors.grey_3};
  justify-content: center;
  margin-bottom: 22px;
  padding: 4px 12px 4px 12px;
`;

const NumberText = styled.Text`
  color: ${({ DarkMode }) => (DarkMode ? colors.grey_2 : colors.grey_8)};
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  line-height: 22.5px;
`;

export default PageIndicator = ({ totalPages, currentPage, isDark }) => {
  return (
    <NumberView DarkMode={isDark}>
      <NumberText DarkMode={isDark}>
        {currentPage}/{totalPages}
      </NumberText>
    </NumberView>
  );
};
