import React, { useEffect } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { TabBarAtom, IsDarkAtom } from '../../recoil/MyPageAtom'
import { useIsFocused } from '@react-navigation/native'
import { processDayData } from '../myRoutine/Functions'
import axios from 'axios'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background: ${({ isDark }) => (isDark ? colors.grey_9 : colors.grey_1)};
`

const RoutineText = styled.Text`
  font-size: 20px;
  font-family: Pretendard-SemiBold;
  line-height: 32px;
  color: ${colors.l_main};
  padding-bottom: 10px;
`

const RoutineExplain = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
`

const NoRoutineImage = styled.Image`
  width: 125px;
  height: 125px;
  margin-bottom: 8px;
  aspect-ratio: 1;
`

export default function NoRoutine({ navigation }) {
  const isFocus = useIsFocused()
  const isDark = useRecoilValue(IsDarkAtom)
  const setIsTabVisible = useSetRecoilState(TabBarAtom)

  const now = new Date()
  let day2 = (now.getDay() + 6) % 7

  useEffect(() => {
    isFocus && setIsTabVisible(true)
  }, [isFocus, setIsTabVisible])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.grey_9 : colors.grey_1,
      }}
    >
      <Container isDark={isDark}>
        <NoRoutineImage source={require('../../assets/Imgs/noRoutine.png')} isDark={isDark} />
        <RoutineText isDark={isDark}>오늘은 운동이 없어요</RoutineText>
        <RoutineExplain isDark={isDark}>오늘 운동을 하시려면 루틴을 수정해주세요.</RoutineExplain>
      </Container>
    </SafeAreaView>
  )
}
