import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Picker, DatePicker } from 'react-native-wheel-pick'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { useNavigationState } from '@react-navigation/native'
import CreateRoutineHeader from '../components/CreateRoutineHeader'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CreateRoutineAtom } from '../recoil/CreateRoutineAtom'
import { colors } from '../colors'
import { IsDarkAtom } from '../recoil/MyPageAtom'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function CreateRoutine_2({ navigation }) {
  const [shouldRender, setShouldRender] = useState(false)
  const [dontKnow, setDontKnow] = useState(false)
  const [value, setValue] = useState(0)
  const [bubble, setBubble] = useState(false)
  const [routine, setRoutine] = useRecoilState(CreateRoutineAtom)
  const index = useNavigationState((state) => state.index)
  const isDark = useRecoilValue(IsDarkAtom)
  useEffect(() => {
    navigation.setOptions({
      header: () => <CreateRoutineHeader title="루틴 등록" index={index} />,
    })
  }, [])
  useEffect(() => {
    console.log(value)
  }, [value])
  useEffect(() => {
    console.log('atom2 : ', routine)
  }, [routine])
  const nextButton = () => {
    if (dontKnow) {
      setRoutine((prev) => ({
        ...prev,
        RM: 0,
      }))
    } else {
      setRoutine((prev) => ({
        ...prev,
        RM: value.label,
      }))
    }

    navigation.push('CreateRoutine_3')
  }
  const handleDontKnow = () => {
    setDontKnow(!dontKnow)
  }
  // useEffect(() => {
  //   // 일정 시간(예: 5초) 후에 렌더링 여부를 false로 변경
  //   const timer = setTimeout(() => {
  //     setShouldRender(false)
  //   }, 5000) // 5초

  //   // 컴포넌트가 언마운트되면 타이머 클리어
  //   return () => clearTimeout(timer)
  // }, [])

  let data = []
  for (var i = 0; i < 201; i += 5) {
    data.push(i)
  }
  const handleBubble = () => {
    setShouldRender(!shouldRender)
  }
  return (
    <Container isDark={isDark}>
      <TitleContainer>
        <TitleBox>
          <Title isDark={isDark}>나의 예상 스쿼트 1RM은?</Title>
          <Icon onPress={handleBubble}>
            <Ionicons name="help-circle" size={24} color={'#595F72'}></Ionicons>
          </Icon>
        </TitleBox>
        {shouldRender ? (
          <Bubble isDark={isDark}>
            <BubbleText isDark={isDark}>{`정확한 동작으로 한 번 들어 올릴 
수 있는 무게를 의미해요.`}</BubbleText>
            <BubbleArrow isDark={isDark} />
          </Bubble>
        ) : null}
        <SubTitle isDark={isDark}>
          {`회원님의 답변을 바탕으로
정확한 트레이닝 중량을 추천해 드릴게요.`}
        </SubTitle>
      </TitleContainer>
      {Platform.OS === 'android' ? (
        <PickerContainer>
          <WheelPickerExpo
            height={200}
            width={288}
            initialSelectedIndex={8}
            items={data.map((num) => ({ label: num, value: '' }))}
            onChange={({ index, item }) => setValue(item)}
            backgroundColor={isDark ? colors.grey_8 : colors.white}
            selectedStyle={{ borderColor: '#E8EBF0', borderWidth: StyleSheet.hairlineWidth }}
            renderItem={(props) => (
              <Text
                style={{
                  fontFamily: 'Pretendard-Regular',
                  fontSize: 20,
                  color: isDark ? colors.white : colors.black,
                }}
              >
                {props.label}
              </Text>
            )}
          />
        </PickerContainer>
      ) : (
        <Picker
          textColor={isDark ? colors.white : colors.black}
          style={{
            backgroundColor: isDark ? colors.grey_8 : colors.white,
            width: 288,
            height: 200,
            borderRadius: 20,
          }}
          selectedValue="40"
          pickerData={data}
          onValueChange={(value) => {
            setValue(value)
            console.log(value)
          }}
        />
      )}
      {/* items={CITIES.map((name) => ({ label: name, value: '' }))} */}
      <DontKnowButton isDark={isDark} isActive={dontKnow} onPress={handleDontKnow}>
        <DontKnowText isDark={isDark} isActive={dontKnow}>
          잘 모르겠어요
        </DontKnowText>
      </DontKnowButton>
      <NextButton isDark={isDark} onPress={nextButton}>
        <ButtonText isDark={isDark}>다음</ButtonText>
      </NextButton>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  /* justify-content: space-evenly; */
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
`
const Bubble = styled.View`
  position: absolute;
  width: 164px;
  height: 53px;
  padding: 0px;
  background: ${(props) => (props.isDark ? colors.white : colors.grey_9)};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  top: 50px;
  left: 180px;
  z-index: 1;
`

const BubbleArrow = styled.View`
  position: absolute;
  border-style: solid;
  border-width: 0 8px 10px;
  border-color: ${(props) => (props.isDark ? colors.white : colors.grey_9)} transparent;
  /* display: block; */
  width: 0;
  z-index: 1;
  top: -10px;
  left: 16px;
`
const BubbleText = styled.Text`
  font-size: 11px;
  color: ${(props) => (props.isDark ? colors.black : colors.white)};
`
const TitleContainer = styled.View`
  width: 90%;
  margin-top: 52px;
  margin-bottom: 92px;
  /* margin-bottom: 60px; */
`
const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
`
const Icon = styled.TouchableOpacity``
const PickerContainer = styled.View`
  border-radius: 20px;
  overflow: hidden;
`
const Title = styled.Text`
  font-size: 24px;
  font-family: Pretendard-SemiBold;
  line-height: 33.6px; /* 33.6px */
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
  margin-right: 8px;
`
const SubTitle = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Regular;
  margin-top: 8px;
  line-height: 19.5px; /* 19.5px */
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const DontKnowButton = styled.TouchableOpacity`
  width: 99px;
  height: 40px;
  margin-top: 22px;
  background-color: ${(props) => (props.isActive ? colors.d_main : props.isDark ? colors.grey_7 : colors.grey_3)};
  margin-bottom: 104px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`
const DontKnowText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? colors.white : props.isActive ? colors.white : colors.black)};
`
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.l_main};
  border-radius: 10px;
`
const ButtonText = styled.Text`
  font-size: 17px;
  font-family: Pretendard-SemiBold;
  color: ${(props) => (props.isDark ? colors.black : colors.white)};
`
