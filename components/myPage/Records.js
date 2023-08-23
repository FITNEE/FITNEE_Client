import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import PercentageCircle from 'react-native-progress-circle'
import { styled } from 'styled-components/native'
import CalendarView from './CalendarView'
import { colors } from '../../colors'
import Check from '../../assets/SVGs/Check.svg'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'

const Container = styled.View`
  width: 100%;
  margin-bottom: 50px;
`
const Exercise = styled.View`
  padding-top: 24px;
  gap: 32px;
  padding-bottom: 24px;
`

const Circles = styled.View`
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`

const CircleContent = styled.View`
  gap: 8px;
`

const RecTextLine = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
const Bar = styled.View`
  height: 16px;
  background-color: ${({ isDark }) => (isDark ? colors.black : colors.grey_1)};
`
const Title = styled.Text`
  font-size: 17px;
  font-family: Pretendard-SemiBold;
  line-height: 25.5px;
  margin: 0px 24px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const Circle = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ isDark }) => (isDark ? colors.grey_8 : colors.grey_1)};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
const CircleText = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: Pretendard-SemiBold;
  line-height: 32px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const CircleTitle = styled.Text`
  text-align: center;
  font-size: 10px;
  font-family: Pretendard-Regular;
  line-height: 15px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const List = styled.View`
  border-radius: 12px;
  background-color: ${({ isDark }) => (isDark ? colors.grey_8 : colors.grey_1)};
  margin: 0px 32px;
  padding: 16px;
  gap: 7px;
`
const ListText = styled.Text`
  font-size: 13px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const MiniText = styled.Text`
  font-size: 10px;
  font-style: normal;
  font-family: Pretendard-SemiBold;
  padding-top: 4px;
  line-height: 32px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const CalendarBox = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
`
export default function Records(props) {
  const isDark = useRecoilValue(IsDarkAtom)

  const [now, setNow] = useState(new Date(Date.now() + 9 * 60 * 60 * 1000))
  const date = parseInt(now.toISOString().substring(8, 10))
  const resultMonth = now.getMonth() + 1
  const [exerciseDays, setExerciseDays] = useState([])
  const [month, setMonth] = useState(now.getMonth() + 1)

  useEffect(() => {
    props.getMyPageData(month).then((dateResult) => {
      setExerciseDays(dateResult.result)
    })
  }, [month])

  const [totalExercise, setTotalExercise] = useState([])
  const [totalCalories, setTotalCalories] = useState(0)
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [totalDist, setTotalDist] = useState(0)

  useEffect(() => {
    props.getDayHealth(now.toISOString().substring(0, 10).replace(/-/g, '')).then((checkResult) => {
      checkResult.code == 709 &&
        setTotalExercise([]) & setTotalCalories(0) & setTotalWeight(0) & setTotalTime(0) & setTotalDist(0)
      checkResult.code == 1000 &&
        setTotalExercise(checkResult.result.exercise) &
          setTotalCalories(checkResult.result.totalCalories) &
          setTotalWeight(checkResult.result.totalWeight) &
          setTotalTime(checkResult.result.totalTime) &
          setTotalDist(checkResult.result.totalDist)
    })
  }, [now, month])

  const dayLoad = (text) => {
    setNow(new Date(text.dateString))
    setMonth(text.month)
  }

  const totalMinute = Math.ceil(totalTime / 60)
  const percentage = (totalMinute / 60) * 100

  const exercise = totalExercise?.map((comment) => (
    <RecTextLine>
      <ListText isDark={isDark}>{comment}</ListText>
      <Check width={20} height={20} color={colors.white} />
    </RecTextLine>
  ))

  return (
    <Container>
      <CalendarBox>
        <CalendarView dayFunction={dayLoad} exerciseDays={exerciseDays} setMonth={setMonth} />
      </CalendarBox>
      <Bar isDark={isDark} />
      <Exercise>
        <Title isDark={isDark}>
          {resultMonth}월 {date}일 완료한 운동
        </Title>
        <Circles>
          <CircleContent>
            <PercentageCircle
              percent={percentage}
              radius={40}
              borderWidth={2}
              color={isDark ? colors.d_main : colors.l_main}
              shadowColor={isDark ? colors.grey_8 : colors.grey_1}
              bgColor={isDark ? colors.grey_9 : colors.white}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CircleText isDark={isDark}>{totalMinute}</CircleText>
                <MiniText isDark={isDark}> 분</MiniText>
              </View>
            </PercentageCircle>
            <CircleTitle isDark={isDark}>소요시간</CircleTitle>
          </CircleContent>
          <CircleContent>
            <Circle isDark={isDark}>
              <CircleText isDark={isDark}>{totalWeight}</CircleText>
              <MiniText isDark={isDark}> kg</MiniText>
            </Circle>
            <CircleTitle isDark={isDark}>오늘 든 무게</CircleTitle>
          </CircleContent>
          <CircleContent>
            <Circle isDark={isDark}>
              <CircleText isDark={isDark}>{totalCalories}</CircleText>
              <MiniText isDark={isDark}> Kcal</MiniText>
            </Circle>
            <CircleTitle isDark={isDark}>소모 칼로리</CircleTitle>
          </CircleContent>
        </Circles>
        {totalExercise.length != 0 && <List isDark={isDark}>{exercise}</List>}
      </Exercise>
    </Container>
  )
}
