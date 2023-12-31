import React, { useCallback, useEffect, useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { colors } from '../../colors'
import { Image, Dimensions } from 'react-native'
import { format } from 'date-fns'
import Left from '../../assets/SVGs/Left.svg'
import Right from '../../assets/SVGs/Right.svg'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { processFontFamily } from 'expo-font'
import { StyleSheet } from 'react-native'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
}
LocaleConfig.defaultLocale = 'ko'

export default function CalendarView(props) {
  const isDark = props.isDark
  const [key, setKey] = useState(0)
  const windowWidth = Dimensions.get('window').width

  useFocusEffect(
    useCallback(() => {
      setKey((prevKey) => prevKey + 1)
    }, []),
  )

  const today = format(new Date(), 'yyyy-MM-dd')
  const days = props.exerciseDays.map((day) => format(new Date(day.day), 'yyyy-MM-dd'))
  const exerciseDay = days.reduce((acc, current) => {
    const formattedDate = format(new Date(current), 'yyyy-MM-dd')
    acc[formattedDate] = { selected: true }
    return acc
  }, {})

  const [selectedDate, setSelectedDate] = useState('')

  return (
    <Calendar
      key={key}
      monthFormat="yyyy. MM"
      renderArrow={(direction) => {
        if (direction == 'left')
          return <Left style={{ marginLeft: windowWidth / 4 - 30 }} width={20} height={20} color={colors.grey_5} />
        if (direction == 'right')
          return <Right style={{ marginRight: windowWidth / 4 - 21 }} width={20} height={20} color={colors.grey_5} />
      }}
      onMonthChange={(month) => props.setMonth(month.month)}
      markedDates={{
        ...exerciseDay,
        [today]: {
          selected: true,
          selectedColor: isDark ? colors.grey_7 : colors.grey_2,
          selectedTextColor: isDark ? colors.white : colors.grey_9,
        },
        [selectedDate]: {
          ...exerciseDay[selectedDate],
          selected: true,
          selectedColor: isDark ? colors.d_main : colors.l_main,
          selectedTextColor: isDark ? colors.grey_9 : colors.white,
        },
      }}
      theme={{
        locale: 'ko',
        calendarBackground: isDark ? colors.grey_9 : colors.white,
        textDayHeaderFontFamily: 'Pretendard-Regular',
        textDayFontSize: 13,
        textDayFontFamily: 'Pretendard-Regular',
        textDayStyle: {
          color: isDark ? colors.grey_5 : colors.grey_4,
        },
        textSectionTitleColor: isDark ? colors.grey_2 : colors.grey_7,
        'stylesheet.calendar.header': {
          monthText: {
            fontFamily: 'Pretendard-SemiBold',
            fontSize: 15,
            color: isDark ? colors.white : colors.black,
            margin: 24,
          },
        },
        selectedDayTextColor: isDark ? colors.white : colors.grey_9,
        selectedDayBackgroundColor: 'transparent',
        selectedDayFontFamily: 'Pretendard-SemiBold',
      }}
      onDayPress={(pressDay) => {
        props.dayFunction(pressDay)
        setSelectedDate(pressDay.dateString)
      }}
      hideExtraDays={true}
    />
  )
}
