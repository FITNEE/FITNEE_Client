import React, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { colors } from "../../colors";
import { Image, Dimensions } from "react-native";
import { format } from "date-fns";
import { WithLocalSvg } from "react-native-svg";
import Left from "../../assets/SVGs/Left.svg";
import Right from "../../assets/SVGs/Right.svg";

LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};
LocaleConfig.defaultLocale = "ko";

export default function CalendarView(props) {
  const windowWidth = Dimensions.get("window").width;
  const today = format(new Date(), "yyyy-MM-dd");
  const days = props.exerciseDays.map((day) =>
    format(new Date(day.day), "yyyy-MM-dd")
  );
  const exerciseDay = days.reduce((acc, current) => {
    const formattedDate = format(new Date(current), "yyyy-MM-dd");
    acc[formattedDate] = { selected: true };
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState("");

  return (
    <Calendar
      monthFormat="yyyy.MM"
      renderArrow={(direction) => {
        if (direction == "left")
          return (
            <WithLocalSvg
              style={{ marginLeft: windowWidth / 4 - 10 }}
              width={20}
              height={20}
              asset={Left}
            />
          );
        if (direction == "right")
          return (
            <WithLocalSvg
              style={{ marginRight: windowWidth / 4 }}
              width={20}
              height={20}
              asset={Right}
            />
          );
      }}
      markedDates={{
        ...exerciseDay,
        [today]: {
          selected: true,
          selectedColor: colors.grey_2,
          selectedTextColor: colors.black,
        },
        [selectedDate]: {
          ...exerciseDay[selectedDate],
          selected: true,
          selectedColor: colors.l_main,
          selectedTextColor: colors.white,
        },
      }}
      theme={{
        locale: "ko",
        textDayFontSize: 13,
        textDayFontWeight: 400,
        textDayStyle: { color: colors.grey_4 },
        textSectionTitleColor: colors.grey_7,
        "stylesheet.calendar.header": {
          monthText: {
            fontSize: 15,
            fontWeight: 600,
            color: colors.black,
            margin: 24,
          },
        },
        selectedDayTextColor: colors.black,
        selectedDayBackgroundColor: "transparent",
      }}
      onDayPress={(pressDay) => {
        props.dayFunction(pressDay);
        setSelectedDate(pressDay.dateString);
      }}
      //onPressArrowLeft={() => console.log("left")}
      //onPressArrowRight={() => console.log("right")}
      hideExtraDays={true}
    />
  );
}
