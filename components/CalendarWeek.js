import React, { useState } from 'react';
import {CalendarProvider, LocaleConfig, WeekCalendar} from 'react-native-calendars'; 
import { colors } from '../colors';

LocaleConfig.locales['ko'] = {   monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],   monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],   dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],   dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']};
LocaleConfig.defaultLocale = 'ko';

export default function CalendarWeek(props) {
    
    const exerciseDay = {
        '2023-07-23': { marked: true },
        '2023-07-25': { marked: true },
        '2023-07-26': { marked: true },
    }

    return ( <CalendarProvider date={new Date().toISOString()}>
        <WeekCalendar
        markedDates={exerciseDay}
        theme={{
            dotColor: colors.grey_6,
            selectedDayBackgroundColor: colors.grey_6,
            todayTextColor: '#9747ff',
            locale: 'ko',
            textDayFontSize: 13,
            textDayFontWeight: 400,
            textDayStyle: {color: colors.black},
            textSectionTitleColor: colors.grey_7,
        }}
        onDayPress={day => {
            //props.dayFunction(day);
            console.log(day);
        }}
        />
        </CalendarProvider> );
};