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
    const isFirstWeek = weekData.map((result) => result.ifWeek1)

    function calculateWeeksInMonth(month) {
        const now = new Date()
        const year = now.getFullYear()
        const daysInMonth = new Date(year, month, 0).getDate() // 해당 달의 마지막 날짜

        const firstDay = new Date(year, month - 1, 1).getDay() // 해당 달의 첫 번째 날짜의 요일
        const lastDay = new Date(year, month - 1, daysInMonth).getDay() // 해당 달의 마지막 날짜의 요일

        if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
            // 31일
            if (firstDay === 0 || firstDay === 6) {
                return 6 // 1일이 토요일 또는 일요일인 경우 6주
            } else {
                return 5 // 그 외의 경우 5주
            }
        } else if ([4, 6, 9, 11].includes(month)) {
            // 30일
            if (firstDay === 0) {
                return 6 // 1일이 일요일인 경우 6주
            } else {
                return 5 // 그 외의 경우 5주
            }
        } else if (month === 2) {
            // 2월
            if (firstDay === 1) {
                return 4 // 1일이 월요일인 경우 4주
            } else {
                return 5 // 그 외의 경우 5주
            }
        }
    }

    function combineWeek(isFirstWeek, LabelData, KmData, KcalData, weeksInYear) {
        const LabelArray = []
        const KcalArray = []
        const KmArray = []

        for (let i = 0; i < isFirstWeek.length; i++) {
            if (i === isFirstWeek.length - 1) {
                LabelArray.push('이번주'), KcalArray.push(`${KcalData[i]}`), KmArray.push(`${KmData[i]}`)
            } else {
                const monthIndex = LabelData[i].indexOf('월')
                let month = parseInt(LabelData[i].slice(0, monthIndex))
                const year = new Date().getFullYear()
                let date = new Date(year, month, 1)
                const dayOfWeek = date.getDay()
                if (typeof weekData[i].numberOfWeeks === 'string') {
                    if (LabelData[i].includes('5째 주')) {
                        if (calculateWeeksInMonth(month) == 5)
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
                        if (calculateWeeksInMonth(month) == 6)
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
                        if (calculateWeeksInMonth(month) == 5)
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
                        if (calculateWeeksInMonth(month) == 6)
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
    const totalArray = combineWeek(isFirstWeek, LabelData, KmData, KcalData)

    const LabelArray = []
    for (let i = 0; i < totalArray[0].label.length; i++) {
        if (i == totalArray[0].label.length - 1) {
            LabelArray.push('이번주')
        } else if (totalArray[0].label[i].includes('1주')) {
            LabelArray.push(`${totalArray[0].label[i]}`)
        } else {
            LabelArray.push(`${totalArray[0].label[i].slice(-2)}`)
        }
    }
    const KcalArray = totalArray[0].kcaldata
    const KmArray = totalArray[0].kmdata

    const KcalMax = Math.max(...KcalArray)
    const KmMax = Math.max(...KmArray)
    const calorieData = KcalMax != 0 ? KcalArray.map((value) => value / KcalMax) : KcalArray.map((value) => value)
    const distanceData = KmMax != 0 ? KmArray.map((value) => value / KmMax) : KmArray.map((value) => value)
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
