import React from 'react'
import { styled } from 'styled-components/native'
import { colors } from '../colors'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import noRoutine from '../assets/Imgs/noRoutine.png'

const Container = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`
const EmptyImage = styled.Image`
  width: 125px;
  height: 125px;
  margin-left: auto;
  margin-right: auto;
`
const TitleBlock = styled.View`
  margin-top: 16px;
  margin-bottom: 42px;
`
const Title = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 33.6px;
  height: 32px;
  text-align: center;
  margin-bottom: 10px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const SubText = styled.Text`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px;
  text-align: center;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const Button = styled.TouchableOpacity`
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  height: 52px;
  background-color: ${colors.l_main};
`
const ButtonText = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 25.5px;
  color: ${(props) => (props.isDark ? colors.black : colors.white)};
`

export default function NotHomeRoutine({ isDark }) {
  const COMMENTDATA = [
    {
      id: 1,
      name: '데드리프트',
    },
  ]
  const navigation = useNavigation()
  const navigateToCreateRoutine = () => {
    navigation.navigate('createRoutine')
  }

  return (
    <Container>
      <EmptyImage source={noRoutine} isDark={isDark} />
      <TitleBlock>
        <Title isDark={isDark}>등록된 운동루틴이 없어요</Title>
        <SubText isDark={isDark}>간단한 질문에 답변하여{'\n'}나만의 루틴을 만들어보세요!</SubText>
      </TitleBlock>
      <Button onPress={navigateToCreateRoutine}>
        <ButtonText isDark={isDark}>AI 루틴 생성하기</ButtonText>
      </Button>
    </Container>
  )
}
