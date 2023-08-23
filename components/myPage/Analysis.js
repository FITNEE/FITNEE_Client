import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components/native'
import TotalChart from './TotalChart'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { colors } from '../../colors'
import Mini_dumbbell from '../../assets/SVGs/Mini_dumbbell.svg'
import Mini_shoes from '../../assets/SVGs/Mini_shoes.svg'
import Mini_timer from '../../assets/SVGs/Mini_timer.svg'

const Container = styled.View`
  width: 100%;
  margin-bottom: 50px;
`
const Exercise = styled.View`
  padding-top: 24px;
`
const Block = styled.View`
  padding: 10px 24px;
  align-items: center;
  flex-direction: row;
`
const BlockContent = styled.View``
const Data = styled.View`
  flex-direction: row;
`
const Title = styled.Text`
  font-size: 20px;
  font-family: Pretendard-SemiBold;
  line-height: 32px;
  margin: 0px 24px 16px 24px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const CircleText = styled.Text`
  font-size: 24px;
  font-family: Pretendard-SemiBold;
  line-height: 33.6px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const CircleMiniText = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  padding-top: 10px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const CircleTitle = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`

export default function Analysis(props) {
  const isDark = useRecoilValue(IsDarkAtom)

  const weekData = props.weekData

  // 오늘이 몇주차인지
  const date = new Date(Date.now() + 9 * 60 * 60 * 1000)
  const weekday = date.getDay() == 0 ? 7 : date.getDay()
  const dateOfMonth = date.getDate()
  const weeksOfMonth = Math.ceil((dateOfMonth + 7 - weekday) / 7)
  /*
  console.log(
    `${date.getMonth() + 1}월 ${date.getDate()}일
    => ${date.getMonth() + 1}월의 ${weeksOfMonth}번째 주`
  );
  */

  const firstMonth = weekData.startAndEndExercise[0].firstMonth
  const firstWeek = weekData.startAndEndExercise[0].firstWeek
  const lastMonth = date.getMonth() + 1
  const lastWeek = weeksOfMonth

  // 범위 자르기
  const startWeekString = `${firstMonth}월 ${firstWeek}째 주`
  const endWeekString = `${lastMonth}월 ${lastWeek}째 주`

  const startIndex = weekData.formattedRows.findIndex((item) => item.weekNumber === startWeekString)
  const endIndex = weekData.formattedRows.findIndex((item) => item.weekNumber === endWeekString)

  const slicedWeekData = weekData.formattedRows.slice(startIndex, endIndex + 1)

  const [calorie, setCalorie] = useState(0)
  const [kilometer, setKilometer] = useState(0)
  const [TimeData, setTimedata] = useState([0])

  useEffect(() => {
    slicedWeekData.length != 0 &&
      (setCalorie(slicedWeekData[slicedWeekData.length - 1].weeklyCalories),
      setKilometer(slicedWeekData[slicedWeekData.length - 1].weeklyDistance),
      setTimedata(slicedWeekData.map((value) => value.weeklyExerciseTime)))
  }, [])

  let sum = 0
  for (let i = 0; i < TimeData.length; i++) {
    sum += TimeData[i]
  }
  const hour = (sum / 3600).toFixed(1)

  return (
    <Container>
      <TotalChart weekData={slicedWeekData} />
      <Exercise>
        <Title isDark={isDark}>운동 현황</Title>
        <Block>
          <Mini_dumbbell
            style={{ marginRight: 16 }}
            width={40}
            height={40}
            color={isDark ? colors.grey_8 : colors.grey_1}
          />
          <BlockContent>
            <Data>
              <CircleText isDark={isDark}>{calorie} </CircleText>
              <CircleMiniText isDark={isDark}>kcal</CircleMiniText>
            </Data>
            <CircleTitle isDark={isDark}>최근 일주일 간 소모한 칼로리</CircleTitle>
          </BlockContent>
        </Block>
        <Block>
          <Mini_shoes
            style={{ marginRight: 16 }}
            width={40}
            height={40}
            color={isDark ? colors.grey_8 : colors.grey_1}
          />
          <BlockContent>
            <Data>
              <CircleText isDark={isDark}>{kilometer} </CircleText>
              <CircleMiniText isDark={isDark}>km</CircleMiniText>
            </Data>
            <CircleTitle isDark={isDark}>최근 일주일 간 뛴 거리</CircleTitle>
          </BlockContent>
        </Block>
        <Block>
          <Mini_timer
            style={{ marginRight: 16 }}
            width={40}
            height={40}
            color={isDark ? colors.grey_8 : colors.grey_1}
          />
          <BlockContent>
            <Data>
              <CircleText isDark={isDark}>{hour} </CircleText>
              <CircleMiniText isDark={isDark}>Hour</CircleMiniText>
            </Data>
            <CircleTitle isDark={isDark}>총 누적 운동 시간</CircleTitle>
          </BlockContent>
        </Block>
      </Exercise>
    </Container>
  )
}
