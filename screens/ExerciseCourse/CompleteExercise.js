import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import ProgressCircle from '../../components/exerciseCourse/ProgressCircle1'
import GrayCircle from '../../components/exerciseCourse/GrayCircle'
import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '../../colors'
import Check from '../../assets/SVGs/Check.svg'
import Check_disabled from '../../assets/SVGs/Check_Disabled.svg'
import axios from 'axios'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { useRecoilValue } from 'recoil'
import { useRoute, StackActions } from '@react-navigation/native'

const ExerciseExplainText = styled.Text`
  padding: 8px;
  color: ${colors.l_main};
  text-align: center;
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  margin-bottom: 41px;
`
const ResultButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  border-radius: 12px;
  background: ${colors.l_main};
  justify-content: center;
  margin-bottom: 8px;
`

const CirclesLine = styled.View`
  flex-direction: row;
  width: 256px;
  justify-content: space-around;
`

const RecTextLine = styled.View`
  flex-direction: row;
  width: 279px;
  margin-bottom: 4px;
  justify-content: space-between;
`
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background-color: ${({ isDark }) => (isDark ? colors.grey_9 : colors.white)};
`

const ExerciseText = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 24px;
  text-align: center;
  line-height: 33.6px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const HomeButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  border-radius: 12px;
  background: ${({ isDark }) => (isDark ? colors.grey_8 : colors.grey_1)};
  justify-content: center;
`

const ButtonText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.black : colors.white)};
  text-align: center;
  font-size: 17px;
  font-family: Pretendard-SemiBold;
`

const ButtonText2 = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  text-align: center;
  font-size: 17px;
  font-family: Pretendard-SemiBold;
`

const ExerciseRec = styled.View`
  width: 311px;
  height: 175px;
  border-radius: 12px;
  background: ${({ isDark }) => (isDark ? colors.grey_8 : colors.grey_1)};
  margin-bottom: 68px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const RecText1 = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.grey_9)};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  width: 188px;
`

export default function CompleteExercise({ navigation }) {
  const isDark = useRecoilValue(IsDarkAtom)

  const goToHome = () => {
    const replaceAction = StackActions.replace('HomeNav')
    navigation.dispatch(replaceAction)
  }
  const goToResult = () =>
    navigation.navigate('ExerciseResult', {
      timeChange: detailData.exerciseTimeChange,
      totalCount: resultData.monthCountHealth,
      totalWeight: resultData.todayTotalWeight,
    })

  const route = useRoute()
  const dataList = route.params.dataList
  const routineIdx = route.params.routineIdx
  console.log(routineIdx)
  const totalTime = route.params.totalTime * -1

  const [shouldRender, setShouldRender] = useState(true)
  useEffect(() => {
    // 일정 시간(예: 5초) 후에 렌더링 여부를 false로 변경
    const timer = setTimeout(() => {
      setShouldRender(false)
    }, 5000)

    // 컴포넌트가 언마운트되면 타이머 클리어
    return () => clearTimeout(timer)
  }, []) // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  const Week = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat')

  const now = new Date()
  let day = Week[now.getDay()]
  const [resultData, setResultData] = useState([])
  const [detailData, setDetailData] = useState([])

  const getResultData = async (routineIdx) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `/app/process/end?routineIdx=${routineIdx}`

      const response = await axios.get(url + detailAPI, {})
      const result = response.data
      console.log(result)
      return result
    } catch (error) {
      console.error('Error', error)
    }
  }

  useEffect(() => {
    getResultData(routineIdx).then((response) => {
      setResultData(response.result)
      setDetailData(response.result.getComparison)
      console.log(detailData)
    })
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.grey_9 : colors.white,
      }}
    >
      <Container isDark={isDark}>
        <ExerciseText isDark={isDark}>운동을 완료했어요!</ExerciseText>

        {shouldRender ? (
          <ExerciseExplainText isDark={isDark}>중량 정보를 업데이트 했어요</ExerciseExplainText>
        ) : (
          <ExerciseExplainText isDark={isDark}>
            한달동안 루틴을 {resultData.monthCountHealth}회 완료했어요
          </ExerciseExplainText>
        )}

        <CirclesLine>
          <ProgressCircle num={Math.ceil(totalTime / 60)} unit="분" title="소요시간" isDark={isDark} />
          <GrayCircle
            // num={resultData.todayTotalWeight}
            num={90}
            unit="kg"
            title="오늘 든 무게"
            bubbleOn={true}
            bubbleText={detailData.weightChange}
            isDark={isDark}
          />
          <GrayCircle
            num={resultData.todayTotalCalories}
            unit="kcal"
            title="소모 칼로리"
            bubbleOn={false}
            isDark={isDark}
          />
        </CirclesLine>

        <ExerciseRec isDark={isDark}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {dataList.map((item) => (
              <RecTextLine key={item.exerciseInfo.healthCategoryIdx}>
                <RecText1 isDark={isDark}>{item.exerciseInfo.exerciseName}</RecText1>
                {item.skip === 1 ? (
                  <Check_disabled width={20} height={20} />
                ) : (
                  <Check color={isDark ? colors.black : colors.white} width={20} height={20} />
                )}
              </RecTextLine>
            ))}
          </ScrollView>
        </ExerciseRec>

        <ResultButton isDark={isDark} onPress={goToResult}>
          <ButtonText isDark={isDark}>결과 자세히 보기</ButtonText>
        </ResultButton>

        <HomeButton isDark={isDark} onPress={goToHome}>
          <ButtonText2 isDark={isDark}>홈으로 돌아가기</ButtonText2>
        </HomeButton>
      </Container>
    </SafeAreaView>
  )
}
