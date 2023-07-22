import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars'; 
import { colors } from '../colors';

LocaleConfig.locales['ko'] = {   monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],   monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],   dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],   dayNamesShort: ['월', '화', '수', '목', '금', '토', '일']};
LocaleConfig.defaultLocale = 'ko';

export default function CalendarView(props) {

    const exerciseDay = {
        '2023-07-04': { selected: true },
        '2023-07-06': { selected: true },
        '2023-07-08': { selected: true },
    }
    
    return ( <Calendar
        monthFormat='yyyy.MM'
        
        markedDates={exerciseDay}
        theme={{
            selectedDayBackgroundColor: colors.grey_4,
            arrowColor: '#9747ff',
            todayTextColor: '#9747ff',
            locale: 'ko',
            textDayFontSize: 13,
            textDayFontWeight: 400,
            textDayStyle: {color: colors.grey_3},
            textSectionTitleColor: colors.black,
        }}
        onDayPress={day => {
            props.dayFunction(day);
            //누르면 색상 변경 추가
        }}
        hideArrows={true}
        hideExtraDays={true}
    /> );
};