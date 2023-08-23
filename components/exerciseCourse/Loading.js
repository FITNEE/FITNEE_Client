import React from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background: ${({ isDark }) => (isDark ? colors.grey_9 : colors.grey_1)};
`

const ExerciseCircle = styled.View`
  width: 307px;
  height: 307px;
  border-radius: 291px;
  background: ${({ isDark }) => (isDark ? colors.black : colors.white)};
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
`

export default function Loading({ navigation }) {
  const isDark = useRecoilValue(IsDarkAtom)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? colors.grey_9 : colors.grey_1 }}>
      <Container isDark={isDark}>
        <ExerciseCircle isDark={isDark} />
      </Container>
    </SafeAreaView>
  )
}
