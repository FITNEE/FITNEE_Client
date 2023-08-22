import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { useNavigationState } from '@react-navigation/native'
import CreateRoutineHeader from '../components/CreateRoutineHeader'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CreateRoutineAtom } from '../recoil/CreateRoutineAtom'
import { colors } from '../colors'
import { GenderAtom, IsDarkAtom } from '../recoil/MyPageAtom'
import Home from '../assets/SVGs/CreateRoutine/Home.svg'
import Gym from '../assets/SVGs/CreateRoutine/Gym.svg'

export default function CreateRoutine_3({ navigation }) {
  const [select, SetSelect] = useState(false)
  const [allPart, SetAllPart] = useState(false)
  const [routine, setRoutine] = useRecoilState(CreateRoutineAtom)
  const isDark = useRecoilValue(IsDarkAtom)
  const gender = useRecoilValue(GenderAtom)
  const [parts, setParts] = useState([
    { id: 1, name: '가슴', selected: false, ename: 'chest' },
    { id: 2, name: '등', selected: false, ename: 'back' },
    { id: 3, name: '어깨', selected: false, ename: 'shoulder' },
    { id: 4, name: '팔', selected: false, ename: 'arm' },
    { id: 5, name: '코어', selected: false, ename: 'core' },
    { id: 6, name: '하체', selected: false, ename: 'lower body' },
  ])
  const index = useNavigationState((state) => state.index)
  useEffect(() => {
    navigation.setOptions({
      header: () => <CreateRoutineHeader title="루틴 등록" index={index} />,
    })
  }, [])
  useEffect(() => {
    console.log('atom3 : ', routine)
  }, [routine])
  const onPartPress = (id) => {
    setParts((prevParts) => prevParts.map((part) => (part.id === id ? { ...part, selected: !part.selected } : part)))
  }
  const nextButton = () => {
    const selectedTargets = parts.filter((part) => part.selected).map((part) => part.ename)
    setRoutine((prev) => ({
      ...prev,
      targets: selectedTargets,
    }))
    navigation.push('CreateRoutine_4')
  }
  useEffect(() => {
    SetSelect(
      parts[0].selected ||
        parts[1].selected ||
        parts[2].selected ||
        parts[3].selected ||
        parts[4].selected ||
        parts[5].selected,
    )
    SetAllPart(
      parts[0].selected &&
        parts[1].selected &&
        parts[2].selected &&
        parts[3].selected &&
        parts[4].selected &&
        parts[5].selected,
    )
  }, [parts])
  const AllPartPress = () => {
    SetAllPart(!allPart)
    setParts((prevParts) =>
      prevParts.map((part) => (!allPart ? { ...part, selected: true } : { ...part, selected: false })),
    )
  }

  return (
    <Container isDark={isDark}>
      <TitleContainer>
        <Title isDark={isDark}>{`운동할 부위를
모두 선택하세요.`}</Title>
      </TitleContainer>
      <PartContainer>
        {parts.map((part) => (
          <PartItem
            key={part.id}
            onPress={() => onPartPress(part.id)}
            style={{
              backgroundColor: allPart
                ? isDark
                  ? '#1E1B29'
                  : colors.l_sub_2
                : part.selected
                ? colors.l_main
                : isDark
                ? colors.grey_9
                : colors.white,
              borderWidth: 1,
              borderColor: allPart ? colors.l_main : 'transparent',
            }}
          >
            <PartImage source={require('../assets/Imgs/splash_dark.png')} />
            <PartName
              style={{
                color: allPart ? colors.l_main : isDark ? colors.white : part.selected ? colors.white : colors.black,
              }}
            >
              {part.name}
            </PartName>
          </PartItem>
        ))}
      </PartContainer>
      <AllButton isDark={isDark} isActive={allPart} onPress={AllPartPress}>
        <AllText isDark={isDark} isActive={allPart}>
          모든 부위를 운동할래요
        </AllText>
      </AllButton>
      <NextButton isDark={isDark} isActive={select} disabled={!select} onPress={nextButton}>
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
  margin-bottom: 32px;
  margin-top: 52px;
`
const Title = styled.Text`
  font-size: 24px;
  font-family: Pretendard-SemiBold;
  line-height: 33.6px; /* 33.6px */
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const PartContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  /* width: 85%; */
  width: 332px;
`
const PartItem = styled.TouchableOpacity`
  width: 101px;
  height: 124px;
  border-radius: 12px;
  align-items: center;

  margin-top: 12px;
`
const PartImage = styled.Image`
  width: 85px;
  height: 85px;
  margin-top: 8px;
  background-color: ${colors.grey_7};
  border-radius: 300px;
`
const PartName = styled.Text`
  font-size: 17px;
  font-family: Pretendard-Medium;
  margin-top: 2px;
  line-height: 25.5px; /* 25.5px */
`
const AllButton = styled.TouchableOpacity`
  width: 147px;
  height: 40px;
  background-color: ${(props) => (props.isActive ? colors.l_main : props.isDark ? colors.grey_7 : colors.grey_3)};
  margin-top: 24px;
  margin-bottom: 104px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  /* border: 1px;
  border-color: ${(props) => (props.isActive ? colors.l_main : colors.l_sub_2)}; */
`
const AllText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? colors.white : props.isDark ? colors.white : colors.black)};
`
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isActive ? colors.l_main : props.isDark ? colors.grey_8 : colors.grey_3)};
  border-radius: 10px;
`
const ButtonText = styled.Text`
  font-size: 17px;
  font-family: Pretendard-SemiBold;
  color: ${(props) =>
    props.isActive ? (props.isDark ? colors.black : colors.white) : props.isDark ? colors.white : colors.black};
`
