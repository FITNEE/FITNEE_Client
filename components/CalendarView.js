import React, { useState } from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars'; 
import { colors } from '../colors';
import { Image, Dimensions } from 'react-native';

LocaleConfig.locales['ko'] = {   monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],   monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],   dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],   dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']};
LocaleConfig.defaultLocale = 'ko';

export default function CalendarView(props) {
    const windowWidth = Dimensions.get('window').width;

    const [selectedDate, setSelectedDate] = useState('');

    const exerciseDay = {
        '2023-07-04': { selected: true },
        '2023-07-06': { selected: true },
        '2023-07-08': { selected: true },
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
                selectedColor: colors.l_main,
                selectedTextColor: colors.white,
            }}}
        theme={{
            todayTextColor: colors.black,
            locale: 'ko',
            textDayFontSize: 13,
            textDayFontWeight: 400,
            textDayStyle: {color: colors.grey_7},
            textSectionTitleColor: colors.grey_7,
            'stylesheet.calendar.header': {
                monthText: {
                    fontSize: 15,
                    fontWeight: 600,
                    color: colors.black,
                    margin: 24 // default
                }
            },
            selectedDayBackgroundColor: colors.l_sub_2,
            selectedDayTextColor: colors.l_main,
        }}
        onDayPress={day => {
            props.dayFunction(day);
            setSelectedDate(day.dateString);
        }}
        //hideArrows={true}
        hideExtraDays={true}
    /> );
};