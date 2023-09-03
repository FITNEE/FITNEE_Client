import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { useNavigationState } from '@react-navigation/native'
import CreateRoutineHeader from '../../components/CreateRoutine/CreateRoutineHeader'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CreateRoutineAtom } from '../../recoil/CreateRoutineAtom'
import axios from 'axios'
import { colors } from '../../colors'
// import creatingRoutine
import CreateRoutineError from '../../components/CreateRoutine/CreateRoutineError'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { imagePath } from '../../imagePath'
import { Animated } from 'react-native'

export default function CreateRoutine_4({ navigation }) {
  const [select, SetSelect] = useState(false)
  const [allDay, SetAllDay] = useState(false)
  const [loading, SetLoading] = useState(false)
  const [error, SetError] = useState(false)
  const [routine, setRoutine] = useRecoilState(CreateRoutineAtom)
  const isDark = useRecoilValue(IsDarkAtom)
  const [opacity] = useState(new Animated.Value(0)) // 초기값은 0
  const [days, setDays] = useState([
    { id: 1, name: '일', selected: false, ename: 'Sunday' },
    { id: 2, name: '월', selected: false, ename: 'Monday' },
    { id: 3, name: '화', selected: false, ename: 'Tuesday' },
    { id: 4, name: '수', selected: false, ename: 'Wednesday' },
    { id: 5, name: '목', selected: false, ename: 'Thursday' },
    { id: 6, name: '금', selected: false, ename: 'Friday' },
    { id: 7, name: '토', selected: false, ename: 'Saturday' },
  ])
  const index = useNavigationState((state) => state.index)
  const startOpacityAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  const LoadingTexts = [
    '트레이닝 루틴을 생성 중입니다',
    '루틴 생성에는 1-2분 정도가 소요됩니다',
    '생성 도중 화면을 나가면 오류가 생길 수 있습니다',
  ]
  const [loadingTextIndex, setLoadingTextIndex] = useState(0)
  const [loadingText, setLoadingText] = useState(LoadingTexts[0])
  useEffect(() => {
    if (loading) {
      navigation.setOptions({
        header: () => <CreateRoutineHeader title="루틴 등록" index={4} />,
      })
    } else {
      navigation.setOptions({
        header: () => <CreateRoutineHeader title="루틴 등록" index={index} />,
      })
    }
  }, [loading])
  // useEffect(() => {
  //   console.log("atom4 : ", routine);
  // }, [routine]);
  useEffect(() => {
    if (loading) startOpacityAnimation()
  }, [loading])

  useEffect(() => {
    if (loading) {
      handleSubmit()
    }
  }, [routine])
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingTextIndex((prevIndex) => (prevIndex + 1) % LoadingTexts.length)
      }, 8000)

      return () => {
        clearInterval(interval) // 컴포넌트가 언마운트될 때 인터벌 정리
      }
    }
  }, [loading])
  useEffect(() => {
    if (loading) {
      setLoadingText(LoadingTexts[loadingTextIndex])
    }
  }, [loadingTextIndex])

  const nextPress = () => {
    const selectedDays = days.filter((day) => day.selected).map((day) => day.ename)
    setRoutine((prev) => ({
      ...prev,
      dayOfWeeks: selectedDays,
    }))
    SetLoading(true)
  }
  const retryPress = () => {
    handleSubmit()
    SetError(false)
  }

  const handleSubmit = async () => {
    try {
      console.log('test : ', routine)
      const response = await axios.post('https://gpthealth.shop/app/routine', routine, {
        headers: { 'Content-Type': `application/json` },
      })
      console.log('Response:', response.data)
      if (response.data.isSuccess) {
        SetLoading(false)
        navigation.push('CreateRoutine_5', {
          responseData: response.data.result,
        })
      } else {
        console.log('Error :', response.data)
        SetError(true)
      }
    } catch (error) {
      console.error('Error:', error)
      SetError(true)
    }
  }

  const onDayPress = (id) => {
    setDays((prevDays) => prevDays.map((day) => (day.id === id ? { ...day, selected: !day.selected } : day)))
  }
  useEffect(() => {
    SetSelect(
      days[0].selected ||
        days[1].selected ||
        days[2].selected ||
        days[3].selected ||
        days[4].selected ||
        days[5].selected ||
        days[6].selected,
    )
    SetAllDay(
      days[0].selected &&
        days[1].selected &&
        days[2].selected &&
        days[3].selected &&
        days[4].selected &&
        days[5].selected &&
        days[6].selected,
    )
  }, [days])
  const AllDayPress = () => {
    SetAllDay(!allDay)
    setDays((prevDays) => prevDays.map((day) => (!allDay ? { ...day, selected: true } : { ...day, selected: false })))
  }

  return (
    <Container isDark={isDark}>
      {error ? (
        <CreateRoutineError isDark={isDark} retryPress={retryPress} navigation={navigation} />
      ) : loading ? (
        <LoadingContainer isDark={isDark}>
          <Loading source={imagePath.path[25]} />
          <Animated.Text style={{ opacity, color: isDark ? colors.white : colors.black }}>{loadingText}</Animated.Text>

          {/* <LoadingText isDark={isDark}>{loadingText}</LoadingText> */}
        </LoadingContainer>
      ) : (
        <Container isDark={isDark}>
          <TitleContainer>
            <Title isDark={isDark}>운동할 요일을 선택해주세요.</Title>
            <SubTitle isDark={isDark}>마이루틴에서 언제든지 변경할 수 있어요.</SubTitle>
          </TitleContainer>
          <DayContainer>
            {days.map((day) => (
              <DayItem
                key={day.id}
                onPress={() => onDayPress(day.id)}
                style={{
                  backgroundColor: allDay
                    ? isDark
                      ? '#1E1B29'
                      : colors.l_sub_2
                    : day.selected
                    ? colors.l_main
                    : isDark
                    ? colors.grey_9
                    : colors.white,
                  borderWidth: allDay ? 1 : 0,
                  borderColor: allDay ? colors.l_main : day.selected ? colors.l_main : colors.white,
                }}
              >
                <DayName
                  style={{
                    color: allDay ? colors.l_main : isDark ? colors.white : day.selected ? colors.white : colors.black,
                  }}
                >
                  {day.name}
                </DayName>
              </DayItem>
            ))}
          </DayContainer>
          <AllDayButton isDark={isDark} isActive={allDay} onPress={AllDayPress}>
            <AllDayText isDark={isDark} isActive={allDay}>
              매일 운동할래요
            </AllDayText>
          </AllDayButton>
          <NextButton isDark={isDark} isActive={select} disabled={!select} onPress={nextPress}>
            <ButtonText isDark={isDark} isActive={select}>
              선택 완료
            </ButtonText>
          </NextButton>
        </Container>
      )}
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
  margin-top: 52px;
  margin-bottom: 150px;
`
const Title = styled.Text`
  font-size: 24px;
  font-family: Pretendard-SemiBold;
  line-height: 33.6px; /* 33.6px */
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const SubTitle = styled.Text`
  font-size: 13px;
  line-height: 19.5px; /* 19.5px */
  margin-top: 8px;
  font-family: Pretendard-Regular;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const DayContainer = styled.View`
  flex-direction: row;
  width: 327px;
  height: 43px;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
`
const DayItem = styled.TouchableOpacity`
  width: 43px;
  height: 43px;
  background-color: white;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`
const DayName = styled.Text`
  font-size: 17px;
  font-family: Pretendard-Medium;
`
const AllDayButton = styled.TouchableOpacity`
  width: 110px;
  height: 40px;
  background-color: ${(props) => (props.isActive ? colors.l_main : props.isDark ? colors.grey_7 : colors.grey_3)};
  margin-top: 141px;
  margin-bottom: 104px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`
const AllDayText = styled.Text`
  font-size: 13px;
  font-family: Pretendard-SemiBold;
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
const LoadingContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
`

const Loading = styled.Image`
  width: 306px;
  height: 306px;
  background-color: white;
  border-radius: 153px;
  margin-bottom: 24px;
  background-color: ${(props) => (props.isDark ? colors.grey_9 : colors.white)};
`
const LoadingText = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Regular;
  margin-top: 24px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
