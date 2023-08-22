import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { useIsFocused, useNavigationState } from '@react-navigation/native'
import CreateRoutineHeader from '../components/CreateRoutineHeader'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CreateRoutineAtom } from '../recoil/CreateRoutineAtom'
import { colors } from '../colors'
import { IsDarkAtom, TabBarAtom } from '../recoil/MyPageAtom'
import { StatusBar } from 'react-native'
import Home from '../assets/SVGs/CreateRoutine/Home.svg'
import Gym from '../assets/SVGs/CreateRoutine/Gym.svg'

export default function CreateRoutine_1({ navigation }) {
  const [home, SetHome] = useState(false)
  const [fitness, SetFitness] = useState(false)
  const [select, SetSelect] = useState(false)
  const index = useNavigationState((state) => state.index)
  const [routine, setRoutine] = useRecoilState(CreateRoutineAtom)
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)
  const isDark = useRecoilValue(IsDarkAtom)
  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])
  useEffect(() => {
    navigation.setOptions({
      header: () => <CreateRoutineHeader title="루틴 등록" index={index} />,
    })
  }, [])
  useEffect(() => {
    // console.log("atom : ", routine);
  }, [routine])
  const homePress = () => {
    SetHome(!home)
    if (fitness) {
      SetFitness(!fitness)
    }
  }
  const fitnessPress = () => {
    SetFitness(!fitness)
    if (home) {
      SetHome(!home)
    }
  }
  const nextButton = () => {
    setRoutine((prev) => ({
      ...prev,
      place: home ? 'home' : 'gym',
    }))
    console.log('atom : ', routine)
    navigation.push('CreateRoutine_2')
  }
  useEffect(() => {
    SetSelect(home || fitness)
  }, [home, fitness])
  return (
    <Container isDark={isDark}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <TitleContainer>
        <Title isDark={isDark}>운동하는 곳을 선택해주세요.</Title>
        <SubTitle isDark={isDark}>장소에 맞게 운동을 추천해 드릴게요.</SubTitle>
      </TitleContainer>
      <SpaceContainer>
        <SpaceItem
          isDark={isDark}
          isActive={home}
          onPress={homePress}
          style={{
            borderColor: home ? `${colors.d_main}` : 'transparent',
          }}
        >
          <SpaceImage>
            <Home width={117} height={117} />
          </SpaceImage>
          <SpaceName isDark={isDark} isActive={home}>
            집
          </SpaceName>
        </SpaceItem>
        <SpaceItem
          isDark={isDark}
          isActive={fitness}
          onPress={fitnessPress}
          style={{
            borderColor: fitness ? `${colors.d_main}` : 'transparent',
          }}
        >
          <SpaceImage>
            <Gym width={117} height={117} />
          </SpaceImage>
          <SpaceName isDark={isDark} isActive={fitness}>
            헬스장
          </SpaceName>
        </SpaceItem>
      </SpaceContainer>
      <NextButton isDark={isDark} isActive={select} onPress={nextButton} disabled={!select}>
        <ButtonText isDark={isDark} isActive={select}>
          다음
        </ButtonText>
      </NextButton>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;

  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
`
const TitleContainer = styled.View`
  width: 90%;
  margin-bottom: 121px;
`
const Title = styled.Text`
  font-size: 24px;
  font-family: Pretendard-SemiBold;
  line-height: 33.6px; /*  */
  margin-top: 52px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const SubTitle = styled.Text`
  font-size: 13px;
  margin-top: 8px;
  line-height: 19.5px; /* 19.5px */
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const SpaceContainer = styled.View`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
`
const SpaceItem = styled.TouchableOpacity`
  width: 157px;
  height: 192px;
  background-color: ${(props) =>
    props.isActive ? (props.isDark ? '#1E1B29' : colors.l_sub_2) : props.isDark ? colors.grey_8 : colors.white};
  border-radius: 10px;
  align-items: center;
  border: 1px;
  /* border: ${(props) => (props.isActive ? '1px' : 0)};
    border-color: ${(props) => (props.isActive ? colors.l_main : colors.white)}; */
`
const SpaceImage = styled.View`
  width: 117px;
  height: 117px;
  background-color: ${colors.grey_7};
  border-radius: 500px;
  margin-top: 24px;
`
const SpaceName = styled.Text`
  margin-top: 9px;
  font-family: Pretendard-SemiBold;
  font-size: 17px;
  line-height: 25.5px; /*  */
  color: ${(props) => (props.isActive ? colors.l_main : props.isDark ? colors.white : colors.black)};
`
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  margin-top: 165px;
  background-color: ${(props) => (props.isActive ? colors.l_main : props.isDark ? colors.grey_7 : colors.grey_3)};
  border-radius: 10px;
`
const ButtonText = styled.Text`
  font-size: 17px;
  font-family: Pretendard-SemiBold;
  color: ${(props) =>
    props.isActive ? (props.isDark ? colors.black : colors.white) : props.isDark ? colors.white : colors.black};
`
