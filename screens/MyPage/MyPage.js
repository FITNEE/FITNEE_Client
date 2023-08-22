import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { styled } from 'styled-components/native'
import Records from '../../components/myPage/Records'
import Analysis from '../../components/myPage/Analysis'
import { colors } from '../../colors'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import { IsDarkAtom, TabBarAtom } from '../../recoil/MyPageAtom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ScreenLayout } from '../../Shared'

const Container = styled.ScrollView`
  background-color: ${({ isDark }) => (isDark ? colors.d_background : colors.l_background)};
`
const ChoiceText = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-SemiBold;
  line-height: 25.5px;
  color: ${({ isDark }) => (isDark ? colors.grey_3 : colors.grey_6)};
`
const Choice = styled.View`
  margin-top: 10px;
  margin-left: 24px;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`
const ChoiceButton1 = styled.TouchableOpacity`
  padding-bottom: 2px;
  padding-left: 6px;
  padding-right: 6px;
`
const ChoiceButton2 = styled.TouchableOpacity`
  padding-bottom: 2px;
  padding-left: 1px;
  padding-right: 1px;
`

export default function MyPage() {
  const isFocus = useIsFocused()
  const isDark = useRecoilValue(IsDarkAtom)
  const setIsTabVisible = useSetRecoilState(TabBarAtom)

  useEffect(() => {
    isFocus && setIsTabVisible(true)
  }, [isFocus])

  const getDayHealth = async (checkedDate) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `app/mypage/exercise?date=${checkedDate}`
      const response = await axios.get(url + detailAPI)
      const checkResult = response.data
      return checkResult
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }
  const getMyPageData = async (month) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `app/mypage?month=${month}`
      const response = await axios.get(url + detailAPI)
      const dateResult = response.data
      return dateResult
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  const [weekData, setWeekData] = useState()

  const getWeekHealth = async () => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `app/mypage/record`
      const response = await axios.get(url + detailAPI)
      const weekResult = response.data
      return weekResult
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    getWeekHealth().then((weekResult) => {
      setWeekData(weekResult.result)
    })
  }, [])

  const [showRecords, SetShowRecords] = useState(true)

  const SelectedTextStyle = {
    color: isDark ? colors.white : colors.black,
  }
  const SelectedBoxStyle = {
    borderBottomWidth: 2,
    borderColor: isDark ? colors.d_main : colors.l_main,
  }

  return (
    <ScreenLayout isDark={isDark} darkBack={colors.grey_9} lightBack={colors.grey_1}>
      <Container isDark={isDark}>
        <Choice>
          <ChoiceButton1
            onPress={() => {
              SetShowRecords(true)
            }}
            style={showRecords && SelectedBoxStyle}
          >
            <ChoiceText isDark={isDark} style={showRecords && SelectedTextStyle}>
              운동 기록
            </ChoiceText>
          </ChoiceButton1>
          <ChoiceButton2
            onPress={() => {
              SetShowRecords(false)
            }}
            style={!showRecords && SelectedBoxStyle}
          >
            <ChoiceText isDark={isDark} style={!showRecords && SelectedTextStyle}>
              운동 분석 및 현황
            </ChoiceText>
          </ChoiceButton2>
        </Choice>
        {showRecords && <Records getDayHealth={getDayHealth} getMyPageData={getMyPageData} />}
        {!showRecords && <Analysis weekData={weekData} />}
      </Container>
    </ScreenLayout>
  )
}
