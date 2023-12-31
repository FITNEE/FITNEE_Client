import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import ProgressCircle from '../../components/exerciseCourse/ProgressCircle1'
import GrayCircle from '../../components/exerciseCourse/GrayCircle'
import { ScrollView } from 'react-native-gesture-handler'
import { BackButton } from '../../Shared'
import { colors } from '../../colors'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { StackActions, useIsFocused } from '@react-navigation/native'
import { processDayData } from '../../components/myRoutine/Functions'
import { TabBarAtom, IsDarkAtom } from '../../recoil/MyPageAtom'
import Left from '../../assets/SVGs/Left.svg'
import Loading from '../../components/exerciseCourse/Loading'
import NoRoutine from '../../components/exerciseCourse/NoRoutine'

const RecTextLine = styled.View`
  flex-direction: row;
  width: 279px;
  margin-bottom: 4px;
`

const CirclesLine = styled.View`
  flex-direction: row;
  width: 256px;
  justify-content: space-around;
`

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 24px;
  background: ${({ isDark }) => (isDark ? colors.d_background : colors.white)};
`

const ExerciseButton = styled.TouchableOpacity`
  width: 111px;
  height: 111px;
  border-radius: 60px;
  background: ${({ isDark }) => (isDark ? colors.d_main : colors.l_main)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ExerciseText = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 24px;
  text-align: center;
  line-height: 33.6px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`

const ExerciseRec = styled.View`
  width: 311px;
  height: 175px;
  border-radius: 12px;
  background: ${({ isDark }) => (isDark ? colors.grey_8 : colors.grey_1)};
  margin-bottom: 33px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const RecText1 = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.grey_3 : colors.grey_7)};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  width: 188px;
`

const RecText2 = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.grey_3 : colors.grey_7)};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  width: 55px;
`

const RecText3 = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.grey_3 : colors.grey_7)};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  width: 36px;
`

const ExerciseButtonText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.black : colors.white)};
  text-align: center;
  font-size: 24px;
  font-family: Pretendard-SemiBold;
  line-height: 33.6px;
`

const ExerciseExplainText = styled.Text`
  padding: 8px;
  color: ${colors.l_main};
  text-align: center;
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  margin-bottom: 41px;
`

const BackIcon = styled.TouchableOpacity`
  position: absolute;
  left: 24px;
  top: 16px;
`

export default function StartExercise({ navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)
  const isDark = useRecoilValue(IsDarkAtom)

  const Week = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat')

  const now = new Date()
  let day = Week[now.getDay()]

  const goToExerciseCourse = () =>
    navigation.navigate('ExerciseCourse', {
      dataList: dataList,
      listIndex: 0,
      routineIdx: routineIdx,
      totalTime: 0,
    })

  const [dataList, setDataList] = useState([])
  const [circleList, setCircleList] = useState([])

  const getExerciseData = async (day) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `/app/process/`

      const response = await axios.get(url + detailAPI, {
        params: {
          dayOfWeek: day,
        },
      })
      const result = response.data
      return result
    } catch (error) {
      console.error('Error', error)
    }
  }

  const [isLoading, setIsLoading] = useState(true)
  const [isNoRoutine, setIsNoRoutine] = useState(false)

  const getRoutineData = async () => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `/app/routine/calendar`

      const response = await axios.get(url + detailAPI)
      const result = response.data
      return result
    } catch (error) {
      console.error('Error', error)
    }
  }

  //fri,mon,sat,sun,thu,tue,wed
  let day2 = (now.getDay() + 6) % 7

  useEffect(() => {
    setIsLoading(true)

    async function fetchData() {
      const routineData = await getRoutineData()

      if (routineData.isSuccess === false) {
        navigation.dispatch(StackActions.replace('RegisterRoutine'))
        return
      } else {
        const dayRoutineArr = processDayData(routineData.result)
        const dayRoutineIdx = dayRoutineArr[day2].routineId
        console.log(`routineIDX : ${dayRoutineIdx}`)
        if (dayRoutineIdx === 0) {
          setIsNoRoutine(true)
          setIsLoading(false)
          return
        } else {
          setIsNoRoutine(false)
          isFocused && setIsTabVisible(false)
          getExerciseData(day).then((response) => {
            setDataList(response.result.routineDetails)
            setCircleList(response.result)
          })
        }
      }
      setIsLoading(false)
    }
    fetchData()
  }, [isFocused, navigation, setIsTabVisible])

  const routineIdx = circleList?.routineIdx

  const exerciseList = dataList.map((result) => (
    <RecTextLine key={result.exerciseInfo.healthCategoryIdx}>
      <RecText1 isDark={isDark}>{result.exerciseInfo.exerciseName}</RecText1>
      <RecText2 isDark={isDark} />
      <RecText3 isDark={isDark}>{result.totalSets}세트</RecText3>
    </RecTextLine>
  ))

  if (isLoading) {
    return <Loading />
  } else if (isNoRoutine) {
    return <NoRoutine />
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDark ? colors.d_background : colors.white,
        }}
      >
        <Container isDark={isDark}>
          <BackIcon onPress={() => navigation.goBack()}>
            <Left width={24} height={24} color={isDark ? colors.white : colors.black} />
          </BackIcon>
          <ExerciseText isDark={isDark}>운동을 시작해 볼까요?</ExerciseText>
          <ExerciseExplainText isDark={isDark}> </ExerciseExplainText>

          <CirclesLine>
            <ProgressCircle
              num={Math.ceil(circleList?.totalTime / 60)}
              unit="분"
              title="예상 소요시간"
              isDark={isDark}
            />
            <ProgressCircle num="30" unit="초" title="세트간 휴식" isDark={isDark} />

            <GrayCircle
              num={circleList?.totalCalories}
              unit="kcal"
              title="소모 칼로리"
              bubbleOn={false}
              isDark={isDark}
            />
          </CirclesLine>

          <ExerciseRec isDark={isDark}>
            <ScrollView showsVerticalScrollIndicator={false}>{exerciseList}</ScrollView>
          </ExerciseRec>

          <ExerciseButton isDark={isDark} onPress={goToExerciseCourse}>
            <ExerciseButtonText isDark={isDark}>시작</ExerciseButtonText>
          </ExerciseButton>
        </Container>
      </SafeAreaView>
    )
  }
}
