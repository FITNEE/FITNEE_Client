import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { TextInput, Dimensions, Animated, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')
import styled from 'styled-components/native'
import ExerciseCard from '../../components/exerciseCourse/ExerciseCard'
import ExerciseButton from '../../components/exerciseCourse/ExerciseButton'
import { colors } from '../../colors'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { FlatList } from 'react-native-gesture-handler'
import Indicator from '../../components/exerciseCourse/Indicator'
import { Alert } from 'react-native'
import { useRoute, StackActions, useIsFocused, useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import Check from '../../assets/SVGs/Check.svg'
import Check_disabled from '../../assets/SVGs/Check_Disabled.svg'
import Close from '../../assets/SVGs/Close.svg'
import ExerciseCourse_2 from './ExerciseCourse_2'
import ExerciseCourse_2_2 from './ExerciseCourse2_2'
import * as Haptics from 'expo-haptics'

const TextBox = styled.View`
  width: 327px;
  height: 24px;
  margin: 23px 0px 5px 0px;
`

const JustText = styled.Text`
  color: ${colors.d_main};
  text-align: center;
  font-size: 15px;
  font-family: Pretendard-Regular;
  line-height: 22.5px;
`

const BoxList = styled.View`
  height: 120px;
  padding-bottom: 1px;
`

const Container = styled.View`
  width: 327px;
  height: 56px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 24px;
`

const CurrentText = styled.Text`
  font-size: 20px;
  font-family: Pretendard-SemiBold;
`

const CurrentText2 = styled.Text`
  font-size: 15px;
  font-family: Pretendard-SemiBold;
`

const CurrentUnit = styled.Text`
  font-size: 15px;
  font-family: Pretendard-SemiBold;
`

const Box1 = styled.View`
  width: 130px;
  flex-direction: row;
  align-items: baseline;
  height: 32px;
  padding-top: 3px;
`

const Box2 = styled.View`
  width: 84px;
  flex-direction: row;
  align-items: baseline;
  height: 32px;
  padding-top: 3px;
`

const Box3 = styled.View`
  width: 49px;
  flex-direction: row;
  align-items: baseline;
  height: 32px;
  padding-top: 3px;
`

const SkipExercrise = styled.TouchableOpacity`
  width: 85px;
  height: 20px;
  position: relative;
  margin-top: 16px;
`

const StopExercise = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  right: 24px;
`

const SkipExercriseText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.grey_2 : colors.grey_8)};
  text-align: center;
  font-size: 13px;
  font-family: Pretendard-SemiBold;
  line-height: 19.5px;
  text-decoration-line: underline;
  width: 100px;
`

const ExerciseCircle = styled.View`
  width: 307px;
  height: 307px;
  border-radius: 291px;
  background-color: rgba(0, 0, 0, 0);
  margin-bottom: 14px;
  justify-content: center;
  align-items: center;
`

const ExerciseImage = styled.Image`
  height: 307px;
  aspect-ratio: 1;
  border-radius: 999px;
`

const ComponentWrapper = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  z-index: ${(props) => props.zIndex};
`

export default function ExerciseCourse_1({ navigation }) {
  const isDark = useRecoilValue(IsDarkAtom)

  const goToStartExercise = () => {
    navigation.navigate('StartExercise')
  }

  const [isPlaying, setIsPlaying] = useState(true)
  const [currentId, setCurrentId] = useState(0)
  //const [oneDuration, setOneDuration] = useState(setData[0]?.duration);
  const [key, setKey] = useState(0)
  const flatListRef = useRef()
  const [boxNumber, setBoxNumber] = useState(1)
  const [indicatorNum, setIndicatorNum] = useState(1)
  //시간 재는 용
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [totalTime, setTotalTime] = useState(0)

  //data route
  const route = useRoute()
  const dataList = route.params.dataList
  const listIndex = route.params.listIndex
  const routineIdx = route.params.routineIdx
  const realTotalTime = route.params.totalTime

  let adviceData = dataList[listIndex].exerciseInfo.caution

  const [exerciseData, setExerciseData] = useState([])
  const [advice, setAdvice] = useState(adviceData[0])
  const [setId, setSetId] = useState(0)

  const scrollPosition = useRef(0)

  const [checkedSets, setCheckedSets] = useState(Array(dataList[listIndex].totalSets).fill(false))
  const [showExerciseCourse2, setShowExerciseCourse2] = useState(false)
  const [showExerciseCourse2_2, setShowExerciseCourse2_2] = useState(false)
  const isFocused = useIsFocused()

  const goToNextExercise = async () => {
    //스킵
    let modifiedDataList = [...dataList]
    modifiedDataList[listIndex] = {
      ...modifiedDataList[listIndex],
      skip: 1,
    }

    const count = modifiedDataList.reduce((sum, elem) => sum + (elem.skip !== undefined ? 1 : 0), 0)

    if (listIndex + 1 >= dataList.length) {
      if (count == modifiedDataList.length) {
        navigation.dispatch(StackActions.replace('StartExercise'))
      } else {
        postTotalData(routineIdx, -1 * totalTime, modifiedDataList),
          // 조건이 충족되면 원하는 화면(FinalScreen)으로 이동합니다.
          navigation.dispatch(
            StackActions.replace('CompleteExercise', {
              dataList: modifiedDataList,
              totalTime: realTotalTime,
              routineIdx: routineIdx,
            }),
          )
      }
    } else {
      navigation.dispatch(
        StackActions.replace('ExerciseCourse', {
          dataList: modifiedDataList,
          listIndex: listIndex + 1,
          routineIdx: routineIdx,
          totalTime: realTotalTime,
        }),
      )
    }
  }

  const goToCompleteExercise = async () => {
    if (listIndex + 1 >= dataList.length) {
      await postTotalData(routineIdx, -1 * (totalTime + realTotalTime), dataList)
      // 조건이 충족되면 원하는 화면(FinalScreen)으로 이동합니다.
      navigation.dispatch(
        StackActions.replace('CompleteExercise', {
          dataList: dataList,
          totalTime: totalTime + realTotalTime,
          routineIdx: routineIdx,
        }),
      )
    }
  }

  const postTotalData = async (routineIdx, totalExerciseTime, routineDetails) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `/app/process/end`

      const response = await axios.post(url + detailAPI, {
        originRoutineIdx: routineIdx,
        totalExerciseTime: totalExerciseTime,
        routineDetails: routineDetails,
      })

      const result = response.data
      console.log(result)
      return result
    } catch (error) {
      console.error('Error', error)
    }
  }

  const OpenConfirm = () => {
    Alert.alert('현재 진행중인 운동루틴을 중단하시겠습니까?', '현재까지 운동하신 내용은 저장되지 않습니다.', [
      { text: '취소', onPress: () => console.log('Cancel Stop') },
      {
        text: '운동 중단하기',
        onPress: goToStartExercise,
        style: 'destructive',
      },
    ])
  }
  const OpenConfirm2 = () => {
    Alert.alert('운동을 건너뛰겠습니까?', '건너뛴 이후에는 다시 실행할 수 없습니다.', [
      { text: '취소', onPress: () => console.log(' Stop') },
      {
        text: '건너뛰기',
        onPress: goToNextExercise,
        style: 'destructive',
      },
    ])
  }

  useEffect(() => {
    const newExerciseData = [
      ...dataList[listIndex].sets,
      {
        set: dataList[listIndex].sets.length,
        rep: 0,
        weight: 0,
      },
    ]
    setExerciseData(newExerciseData)
    console.log(exerciseData)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // 다음에 나올 Id를 currentId로 업데이트
      const nextId = currentId + 1 > adviceData.length - 1 ? 0 : currentId + 1
      setCurrentId(nextId)
      setAdvice(adviceData[nextId])
    }, 8000) // 3.5초마다 데이터를 가져오도록 설정

    return () => clearInterval(interval)
  }, [currentId])

  const renderItem = ({ item }) => {
    let backgroundColor = ''
    let textColor = ''

    if (item.set === dataList[listIndex].totalSets) {
      backgroundColor = 'rgba(0, 0, 0, 0)'
      textColor = 'rgba(0, 0, 0, 0)'
    } else {
      backgroundColor =
        item.set + 1 === boxNumber ? (isDark ? colors.grey_8 : colors.white) : isDark ? colors.grey_8 : colors.grey_1
      textColor =
        item.set + 1 === boxNumber ? (isDark ? colors.white : colors.black) : isDark ? '#858687' : 'rgba(0, 0, 0, 0.50)'
    }

    return (
      <Container style={{ backgroundColor: backgroundColor }}>
        <Box1>
          <CurrentText style={{ color: textColor }}>{item.set + 1}</CurrentText>
          <CurrentUnit style={{ color: textColor }}>세트</CurrentUnit>
        </Box1>

        <Box2>
          {item.weight !== 'null' ? (
            <CurrentText style={{ color: textColor }}>{item.weight}</CurrentText>
          ) : (
            <CurrentText2 style={{ color: colors.grey_7 }}>빈 봉</CurrentText2>
          )}
          {item.weight !== 'null' ? <CurrentUnit style={{ color: textColor }}>kg</CurrentUnit> : null}
        </Box2>
        <Box3>
          <CurrentText style={{ color: textColor }}>{item.rep}</CurrentText>
          <CurrentUnit style={{ color: textColor }}>회</CurrentUnit>
        </Box3>
        {item.set === dataList[listIndex].totalSets ? null : checkedSets[item.set] ? (
          <Check width={24} height={24} color={isDark ? colors.black : colors.white} />
        ) : (
          <Check_disabled width={24} height={24} />
        )}
      </Container>
    )
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const scrollBox = () => {
    const next = boxNumber >= dataList[listIndex].totalSets ? boxNumber : boxNumber + 1
    const next2 = indicatorNum > dataList[listIndex].totalSets ? indicatorNum : indicatorNum + 1
    if (boxNumber === dataList[listIndex].totalSets - 1) setIsPlaying(false)
    setBoxNumber(next)
    setIndicatorNum(next2)
    setIsTimerRunning(false)

    setTotalTime((prevTotal) => prevTotal + timeInSeconds)
    console.log(timeInSeconds, totalTime)
    setTimeInSeconds(0)

    //delay 동안 쉬도록
    setIsPlaying(false)
    setKey((prevKey) => prevKey + 1) //타이머 리셋
    setIsTimerRunning(true) //타이머 켜기
    setTimeout(() => {
      setIsPlaying(true)
    }, 300)

    const newCheckedSets = [...checkedSets]
    newCheckedSets[boxNumber - 1] = true
    setCheckedSets(newCheckedSets)

    setIsButtonDisabled(true)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: boxNumber,
        })
        scrollPosition.current = boxNumber
        console.log('scroll', scrollPosition)
      }
    }, 1200)

    if (boxNumber < dataList[listIndex].totalSets) {
      setTimeout(() => {
        setSetId(boxNumber)
        setIsButtonDisabled(false)

        setShowExerciseCourse2_2(true)
        console.log('show', showExerciseCourse2_2)
      }, 2000)
    } else if (boxNumber === dataList[listIndex].totalSets && listIndex + 1 !== dataList.length) {
      setTimeout(() => {
        setShowExerciseCourse2(true)
        setIsButtonDisabled(false)
        console.log('show', showExerciseCourse2)
      }, 2000)
    }
  }

  const getItemLayout = (_, index) => {
    const itemHeight = 64
    return {
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }
  }

  useEffect(() => {
    let timerId

    if (isTimerRunning) {
      timerId = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1)
      }, 1000)
    }

    return () => {
      clearInterval(timerId)
    }
  }, [isTimerRunning])

  const getImage = [
    null,
    require('../../assets/GIFs/1.gif'),
    require('../../assets/GIFs/2.gif'),
    require('../../assets/GIFs/3.gif'),
    require('../../assets/GIFs/4.gif'),
    require('../../assets/GIFs/5.gif'),
    require('../../assets/GIFs/6.gif'),
    require('../../assets/GIFs/7.gif'),
    require('../../assets/GIFs/8.gif'),
    require('../../assets/GIFs/9.gif'),
    require('../../assets/GIFs/10.gif'),
    require('../../assets/GIFs/11.gif'),
    require('../../assets/GIFs/12.gif'),
    require('../../assets/GIFs/13.gif'),
    require('../../assets/GIFs/14.gif'),
    require('../../assets/GIFs/15.gif'),
    require('../../assets/GIFs/16.gif'),
    require('../../assets/GIFs/17.gif'),
    require('../../assets/GIFs/18.gif'),
    require('../../assets/GIFs/19.gif'),
    require('../../assets/GIFs/20.gif'),
    require('../../assets/GIFs/21.gif'),
    require('../../assets/GIFs/22.gif'),
    require('../../assets/GIFs/23.gif'),
    require('../../assets/GIFs/24.gif'),
    require('../../assets/GIFs/25.gif'),
  ]
  if (showExerciseCourse2_2)
    return (
      <ExerciseCourse_2_2
        navigation={navigation}
        dataList={dataList}
        listIndex={listIndex}
        totalTime={totalTime}
        routineIdx={routineIdx}
        setId={setId}
        toggleShowExerciseCourse2_2={() => setShowExerciseCourse2_2(false)} // toggle 함수 추가
      />
    )
  if (showExerciseCourse2)
    return (
      <ExerciseCourse_2
        navigation={navigation}
        dataList={dataList}
        listIndex={listIndex}
        totalTime={totalTime}
        routineIdx={routineIdx}
      />
    )
  else
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDark ? colors.grey_9 : colors.grey_2,
        }}
      >
        <ExerciseCard exerciseName={dataList[listIndex].exerciseInfo.exerciseName} isDark={isDark}>
          <StopExercise onPress={() => OpenConfirm()}>
            <Close width={24} height={24} color={isDark ? colors.white : colors.black} />
          </StopExercise>

          <ExerciseCircle>
            <ComponentWrapper zIndex={1}>
              <ExerciseImage
                source={getImage[dataList[listIndex].exerciseInfo.healthCategoryIdx]}
                resizeMode="contain"
              />
            </ComponentWrapper>
            <ComponentWrapper zIndex={2}>
              <CountdownCircleTimer
                key={key}
                isPlaying={isPlaying}
                duration={35}
                colors={colors.l_main}
                size={315}
                strokeWidth={8}
                trailColor={isDark ? colors.grey_7 : colors.grey_3}
                onComplete={() => ({ shouldRepeat: true })}
                updateInterval={0.001}
                isGrowing={true}
                rotation={'counterclockwise'}
              />
            </ComponentWrapper>
          </ExerciseCircle>

          <Indicator totalPages={dataList[listIndex].totalSets} currentPage={indicatorNum - 1} isDark={isDark} />

          <BoxList>
            <FlatList
              data={exerciseData}
              renderItem={renderItem}
              keyExtractor={(item) => item.set}
              showsVerticalScrollIndicator={false}
              ref={flatListRef}
              onEndReached={goToCompleteExercise}
              scrollEnabled={false}
              getItemLayout={getItemLayout}
              initialScrollIndex={scrollPosition.current}
            />
          </BoxList>

          <TextBox>
            <JustText>{advice}</JustText>
          </TextBox>

          <ExerciseButton //세트 완료 버튼
            text="세트 완료"
            disabled={isButtonDisabled}
            onPress={scrollBox}
            isDark={isDark}
          />

          <SkipExercrise onPress={() => OpenConfirm2()}>
            <SkipExercriseText isDark={isDark}>이 운동 건너뛰기</SkipExercriseText>
          </SkipExercrise>
        </ExerciseCard>
      </SafeAreaView>
    )
}
