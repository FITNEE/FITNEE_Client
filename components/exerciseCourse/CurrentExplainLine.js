import React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'

const CurrentExplain = styled.View`
  width: 277px;
  align-items: flex-start;
  margin-bottom: 4px;
  flex-direction: row;
`

const CurrentExplainCircle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: ${colors.grey_3};
`

const CurrentExplainNumber = styled.Text`
  color: ${colors.l_main};
  text-align: center;
  font-family: Pretendard-Regular;
  font-size: 13px;
  line-height: 19.5px;
  margin-right: 16px;
  width: 10px;
`

const CurrentExplainText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  width: 261px;
  word-break: keep-all;
`
export default function CurrentExplainLine({ expl, num }) {
  const isDark = useRecoilValue(IsDarkAtom)

  return (
    <CurrentExplain>
      <CurrentExplainNumber>{num}</CurrentExplainNumber>
      <CurrentExplainText numberOfLines={2} ellipsizeMode="tail" isDark={isDark}>
        {expl}
      </CurrentExplainText>
    </CurrentExplain>
  )
}
