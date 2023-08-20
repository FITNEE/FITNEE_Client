import React, { useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { BarChart, LineChart } from 'react-native-chart-kit'
import { Text as TextSVG, Line, Circle } from 'react-native-svg'
import { colors } from '../../colors'
import { styled } from 'styled-components/native'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { processFontFamily } from 'expo-font'

const Container = styled.ScrollView``
const BoxContainer = styled.View`
    margin: 26px 24px 0px 24px;
    background-color: ${({ isDark }) => (isDark ? colors.grey_7 : colors.grey_1)};
    border-radius: 20px;
    padding: 16px 16px 10px 16px;
`
const NoneChartText = styled.Text`
    padding: 112px 0px;
    font-size: 11px;
    font-style: normal;
    font-family: Pretendard-SemiBold;
    line-height: 16.5px;
    opacity: 0.6;
    text-align: center;
    color: ${({ isDark }) => (isDark ? colors.grey_2 : colors.grey_7)};
`

export default function TotalChart(props) {
    const isDark = useRecoilValue(IsDarkAtom)

    const [message, setMessage] = useState({
        x: 0,
        y: 0,
        visible: false,
        value: 0,
    })

    const chartConfig = {
        color: () => (isDark ? colors.grey_7 : colors.grey_1),
        labelColor: () => (isDark ? colors.grey_2 : colors.grey_7),
        useShadowColorFromDataset: true,
        decimalPlaces: 0,
        fillShadowGradientFromOpacity: 0.3,
        fillShadowGradientToOpacity: 0,
        backgroundGradientFrom: isDark ? '#595F72' : '#F6F8FA',
        backgroundGradientTo: isDark ? '#595F72' : '#F6F8FA',
        propsForLabels: {
            fontSize: 11,
            fontFamily: processFontFamily('Pretendard-SemiBold'),
        },
        propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: isDark ? colors.grey_6 : colors.grey_2,
            strokeDasharray: '0',
        },
        propsForDots: {
            r: '5',
        },
    }

    const screenWidth = Dimensions.get('window').width

    const weekData = props.weekData
    const LabelData = weekData.map((result) => result.weekNumber)
    const KcalData = weekData.map((result) => result.weeklyCalories)
    const KmData = weekData.map((result) => result.weeklyDistance)
    console.log(LabelData)
    console.log(KcalData)
    console.log(KmData)
    const isFirstWeek = weekData.map((result) => result.ifWeek1)
    console.log(isFirstWeek)
    console.log(typeof weekData[0].numberOfWeeks === 'string')
    function getWeeksInMonth(year, month) {
        const firstDayOfMonth = new Date(year, month - 1, 1)
        const lastDayOfMonth = new Date(year, month, 0)
        const daysInMonth = lastDayOfMonth.getDate()
        const firstWeekDays = 7 - firstDayOfMonth.getDay() // 첫 주에서 마지막 주의 일 수
        const lastWeekDays = lastDayOfMonth.getDay() + 1 // 마지막 주에서 첫 주의 일 수
        let fullWeeks = Math.floor((daysInMonth - firstWeekDays - lastWeekDays) / 7) // 첫 주와 마지막 주를 제외한 전체 주 수
        if (firstWeekDays >= 6) {
            // 첫 주에서 6일 이상 이전 달의 날짜가 포함된 경우 fullWeeks가 1 감소하므로 보정
            fullWeeks += 1
        }
        if (lastWeekDays >= 6) {
            // 마지막 주에서 6일 이상 다음 달의 날짜가 포함된 경우 fullWeeks가 1 증가하므로 보정
            fullWeeks += 1
        }
        return fullWeeks + 2 // 첫 주와 마지막 주를 합하여 리턴
    }
    function getWeeksInYear() {
        const now = new Date()
        const year = now.getFullYear()
        const weeksInYear = {}
        for (let month = 1; month <= 12; month++) {
            const numberOfWeeks = getWeeksInMonth(year, month)
            weeksInYear[month] = numberOfWeeks
        }
        return weeksInYear
    }
    // 각 월마다 몇 주까지 있는지
    const weeksInYear = getWeeksInYear()
    console.log(weeksInYear)
    console.log(weekData)
    function combineWeek(isFirstWeek, LabelData, KmData, KcalData, weeksInYear) {
        const LabelArray = []
        const KcalArray = []
        const KmArray = []

        for (let i = 0; i < isFirstWeek.length; i++) {
            if (i === isFirstWeek.length - 1) {
                LabelArray.push('이번주'), KcalArray.push(`${KcalData[i]}`), KmArray.push(`${KmData[i]}`)
            } else {
                let month = parseInt(LabelData[i].split('')[0])
                if (typeof weekData[0].numberOfWeeks === 'string') {
                    if (LabelData[i].includes('5째 주')) {
                        const year = new Date().getFullYear()
                        let date = new Date(year, month + 1, 1)
                        const dayOfWeek = date.getDay()
                        if (weeksInYear[`${month}`] == 5)
                            if (dayOfWeek != 1) {
                                LabelArray.push(`5주/${LabelData[i + 1].replace(/째 /g, '')}`)
                                KcalArray.push(`${KcalData[i] + KcalData[i + 1]}`)
                                KmArray.push(`${KmData[i] + KcalData[i + 1]}`)
                                i = i + 1
                            } else {
                                LabelArray.push(`${LabelData[i].replace(/째 /g, '')}`)
                                KcalArray.push(`${KcalData[i]}`)
                                KmArray.push(`${KmData[i]}`)
                            }
                        else {
                            LabelArray.push(`${LabelData[i].replace(/째 /g, '')}`)
                            KcalArray.push(`${KcalData[i]}`)
                            KmArray.push(`${KmData[i]}`)
                        }
                    } else if (LabelData[i].includes('6째 주')) {
                        const year = new Date().getFullYear()
                        let date = new Date(year, month + 1, 1)
                        const dayOfWeek = date.getDay()
                        if (weeksInYear[`${month}`] == 6)
                            if (dayOfWeek != 1) {
                                LabelArray.push(`6주/${LabelData[i + 1].replace(/째 /g, '')}`)
                                KcalArray.push(`${KcalData[i] + KcalData[i + 1]}`)
                                KmArray.push(`${KmData[i] + KcalData[i + 1]}`)
                                i = i + 1
                            }
                    } else {
                        LabelArray.push(`${LabelData[i].replace(/째 /g, '')}`)
                        KcalArray.push(`${KcalData[i]}`)
                        KmArray.push(`${KmData[i]}`)
                    }
                } else {
                    if (LabelData[i].includes('5째 주')) {
                        const year = new Date().getFullYear()
                        let date = new Date(year, month + 1, 1)
                        const dayOfWeek = date.getDay()
                        if (weeksInYear[`${month}`] == 5)
                            if (dayOfWeek != 1) {
                                LabelArray.push(`5주/${LabelData[i + 2].replace(/째 /g, '')}`)
                                KcalArray.push(`${KcalData[i] + KcalData[i + 2]}`)
                                KmArray.push(`${KmData[i] + KcalData[i + 2]}`)
                                i = i + 2
                            } else {
                                LabelArray.push(`${LabelData[i].replace(/째 /g, '')}`)
                                KcalArray.push(`${KcalData[i]}`)
                                KmArray.push(`${KmData[i]}`)
                                i = i + 1
                            }
                        else {
                            LabelArray.push(`${LabelData[i].replace(/째 /g, '')}`)
                            KcalArray.push(`${KcalData[i]}`)
                            KmArray.push(`${KmData[i]}`)
                        }
                    } else if (LabelData[i].includes('6째 주')) {
                        const year = new Date().getFullYear()
                        let date = new Date(year, month + 1, 1)
                        const dayOfWeek = date.getDay()
                        if (weeksInYear[`${month}`] == 6)
                            if (dayOfWeek != 1) {
                                LabelArray.push(`6주/${LabelData[i + 1].replace(/째 /g, '')}`)
                                KcalArray.push(`${KcalData[i] + KcalData[i + 1]}`)
                                KmArray.push(`${KmData[i] + KcalData[i + 1]}`)
                                i = i + 1
                            }
                    } else {
                        LabelArray.push(`${LabelData[i].replace(/째 /g, '')}`)
                        KcalArray.push(`${KcalData[i]}`)
                        KmArray.push(`${KmData[i]}`)
                    }
                }
            }
        }
        const total = [
            {
                kmdata: KmArray,
                kcaldata: KcalArray,
                label: LabelArray,
            },
        ]
        return total
    }
    const totalArray = combineWeek(isFirstWeek, LabelData, KmData, KcalData, weeksInYear)
    console.log(totalArray)

    const LabelArray = []
    for (let i = 0; i < LabelData.length; i++) {
        if (LabelData[i].length > 7) {
            if (LabelData[i].includes('1째 주')) {
                LabelArray.push(`${LabelData[i].subString(0, 2)}월 1주`)
            } else {
                LabelArray.push(`${LabelData[i].split('')[4]}주`)
            }
        } else {
            if (LabelData[i].includes('1째 주')) {
                LabelArray.push(`${LabelData[i].split('')[0]}월 1주`)
            } else {
                LabelArray.push(`${LabelData[i].split('')[3]}주`)
            }
        }
    }

    const KcalMax = Math.max(...KcalData)
    const KmMax = Math.max(...KmData)
    const calorieData = KcalMax != 0 ? KcalData.map((value) => value / KcalMax) : KcalData.map((value) => value)
    const distanceData = KmMax != 0 ? KmData.map((value) => value / KmMax) : KmData.map((value) => value)
    const [maxData, setMaxData] = useState()

    const data = {
        labels: LabelArray,
        datasets: [
            {
                data: calorieData,
                color: () => colors.l_main,
                strokeWidth: 2,
            },
            {
                data: distanceData,
                color: () => colors.green,
                strokeWidth: 2,
            },
            {
                data: [1.2],
                color: () => 'transparent',
                withDots: false,
            },
            {
                data: [0],
                color: () => 'transparent',
                withDots: false,
            },
        ],
    }

    /* 테스트 데이터
  const KcalData = [200, 500, 600, 900, 400, 0, 50];
  const KcalMax = Math.max(...KcalData);
  const KmData = [4, 3, 7, 6, 2, 0, 2];
  const KmMax = Math.max(...KmData);
  const calorieData = KcalData.map((value) => value / KcalMax);
  const distanceData = KmData.map((value) => value / KmMax);
  const realMax = Math.max(KmMax, KcalMax);
  const [maxData, setMaxData] = useState();
  const dataLength = KcalData.length;

  const data = {
    labels: ["7월 1주", "2주", "3주", "4주", "8월 1주", "2주", "3주"],
    datasets: [
      {
        data: calorieData,
        color: () => colors.l_main,
        strokeWidth: 2,
      },
      {
        data: distanceData,
        color: () => colors.green,
        strokeWidth: 2,
      },
      {
        data: [1.2],
        color: () => "transparent",
      },
      {
        data: [0],
        color: () => "transparent",
      },
    ],
    //legend: ["kcal", "km"],
  };
  */

    const [unit, setUnit] = useState('kcal')

    const [render, setRender] = useState(
        data.labels.length > 4 ? (data.labels.length * screenWidth) / 4 - screenWidth + 18 : 0,
    )

    return (
        <BoxContainer isDark={isDark}>
            {data.labels.length < 2 && <NoneChartText isDark={isDark}>아직 데이터가 충분하지 않아요</NoneChartText>}
            {data.labels.length > 1 && (
                <Container
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentOffset={{
                        x: render,
                        y: 0,
                    }}
                >
                    <LineChart
                        data={data}
                        width={data.labels.length > 4 ? (data.labels.length * screenWidth) / 4 : screenWidth}
                        //width={screenWidth-48}
                        height={230}
                        chartConfig={chartConfig}
                        fromZero={true}
                        bezier
                        withHorizontalLabels={false}
                        withVerticalLines={false}
                        withHorizontalLines={true}
                        style={{
                            paddingRight: 7,
                        }}
                        decorator={() => {
                            return message.visible ? (
                                <>
                                    <Circle
                                        cx={message.x}
                                        cy={message.y}
                                        r={3}
                                        fill={isDark ? colors.grey_7 : colors.white}
                                    />
                                    {message.value != 0 ? (
                                        <Line
                                            x1={message.x}
                                            x2={message.x}
                                            y1={message.y + 5}
                                            y2={189}
                                            stroke={isDark ? colors.white : colors.black}
                                            strokeWidth={2}
                                            strokeDasharray={3}
                                        ></Line>
                                    ) : (
                                        ''
                                    )}
                                    <View
                                        style={{
                                            position: 'absolute',
                                            width: 62,
                                            height: 32,
                                            top: message.y - 40,
                                            left: message.x === 7 ? 7 : message.x - 31,
                                            backgroundColor: isDark ? colors.white : colors.black,
                                            borderRadius: 12,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                fontFamily: 'Pretendard-Bold',
                                                color: isDark ? colors.black : colors.white,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {message.value * maxData}
                                        </Text>
                                        {
                                            <Text
                                                style={{
                                                    fontSize: 11,
                                                    fontFamily: 'Pretendard-Medium',
                                                    color: isDark ? colors.black : colors.white,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {unit}
                                            </Text>
                                        }
                                    </View>
                                </>
                            ) : null
                        }}
                        onDataPointClick={(data) => {
                            data.dataset.data === calorieData ? setUnit(' kcal') : setUnit(' km')
                            data.dataset.data === calorieData ? setMaxData(KcalMax) : setMaxData(KmMax)
                            data.dataset.data.length > 3 ? setRender(data.x - screenWidth + 111) : ''
                            let isSamePoint = message.x === data.x && message.y === data.y
                            isSamePoint
                                ? setMessage((previousState) => {
                                      return {
                                          ...previousState,
                                          value: data.value,
                                          visible: !previousState.visible,
                                      }
                                  })
                                : setMessage({
                                      x: data.x,
                                      value: data.value,
                                      y: data.y,
                                      visible: true,
                                  })
                        }}
                    />
                </Container>
            )}
        </BoxContainer>
    )
}
