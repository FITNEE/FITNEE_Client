import React, { useState } from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars'; 
import { colors } from '../colors';
import { Image, Dimensions } from 'react-native';
import DATEDATA from '../screens/DateData';

LocaleConfig.locales['ko'] = {   monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],   monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],   dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],   dayNamesShort: ['월', '화', '수', '목', '금', '토', '일']};
LocaleConfig.defaultLocale = 'ko';

export default function CalendarView(props) {
    const windowWidth = Dimensions.get('window').width;

    const [selectedDate, setSelectedDate] = useState('');

    const exerciseDay = {
        '2023-07-04': { selected: true, selectedDayBackgroundColor: colors.grey_2 },
        '2023-07-06': { selected: true, selectedDayBackgroundColor: colors.grey_2 },
        '2023-07-08': { selected: true, selectedDayBackgroundColor: colors.grey_2 },
    }
    
    return ( <Calendar
        monthFormat='yyyy.MM'
        renderArrow = { (direction) => {
            if (direction == 'left')
            return(
            <Image style={{ width: 20, height: 20, marginLeft: windowWidth / 4 - 10, backgroundColor: "pink"}}></Image>);
            if (direction == 'right')
            return(
            <Image style={{ width: 20, height: 20, marginRight: windowWidth / 4, backgroundColor: "pink"}}></Image>);
        }}
        markedDates={{
            ...exerciseDay,
            [selectedDate]: {
                ...exerciseDay[selectedDate],
                selected: true,
                selectedDayBackgroundColor: colors.grey_4
            }}}
        theme={{
            arrowColor: '#9747ff',
            todayTextColor: '#9747ff',
            locale: 'ko',
            textDayFontSize: 13,
            textDayFontWeight: 400,
            textDayStyle: {color: colors.grey_3},
            textSectionTitleColor: colors.black,
            'stylesheet.calendar.header': {
                monthText: {
                    fontSize: 15,
                    fontWeight: 600,
                    color: "black",
                    margin: 24 // default
                }
            }
        }}
        onDayPress={day => {
            props.dayFunction(day);
            setSelectedDate(day.dateString);
            //누르면 색상 변경 추가
        }}
        //hideArrows={true}
        hideExtraDays={true}
    /> );
};