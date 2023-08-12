import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PercentageCircle from "react-native-progress-circle";
import { styled } from "styled-components/native";
import CalendarView from "./CalendarView";
import { colors } from "../../colors";
import COMMENTDATA from "../../screens/MyPage/COMMENTDATA";
import { Image } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import Check from "../../assets/SVGs/Check.svg";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

const Container = styled.View`
  width: 100%;
  margin-bottom: 50px;
`;
const Exercise = styled.View`
  padding-top: 24px;
  gap: 32px;
`;

const Circles = styled.View`
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`;

const CircleContent = styled.View`
  gap: 8px;
`;

const RecTextLine = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export default function Records(props) {
  const isDark = useRecoilValue(IsDarkAtom);

  const Bar = styled.View`
    height: 16px;
    background-color: ${isDark ? colors.black : colors.grey_1};
  `;
  const Title = styled.Text`
    font-size: 17px;
    font-weight: 600;
    line-height: 25.5px;
    margin: 0px 24px;
    color: ${isDark ? colors.white : colors.black};
  `;
  const Circle = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: ${isDark ? colors.grey_7 : colors.grey_1};
    align-items: center;
    justify-content: center;
    flex-direction: row;
  `;
  const CircleText = styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
    color: ${isDark ? colors.white : colors.black};
  `;
  const CircleTitle = styled.Text`
    text-align: center;
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
    color: ${isDark ? colors.white : colors.black};
  `;
  const List = styled.View`
    border-radius: 12px;
    background-color: ${isDark ? colors.grey_7 : colors.grey_1};
    margin: 0px 32px 49px 32px;
    padding: 16px;
    gap: 7px;
  `;
  const ListText = styled.Text`
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
    color: ${isDark ? colors.white : colors.black};
  `;
  const MiniText = styled.Text`
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    padding-top: 4px;
    line-height: 32px;
    color: ${isDark ? colors.white : colors.black};
  `;

  const [now, setNow] = useState(new Date());
  const exerciseDays = props.exerciseDays;
  const month = props.month;
  const date = now.getDate();

  // now date에 해당하는 값 가져오기
  const [minute, setMinute] = useState(31);
  const kilogram = useState(3300);
  const calorie = useState(400);

  const percentage = (minute / 60) * 100;

  const dayLoad = (text) => {
    setNow(new Date(text.dateString));
  };

  const exercise = COMMENTDATA.map((comment) => (
    <RecTextLine>
      <ListText>{comment.name}</ListText>
      <WithLocalSvg width={20} height={20} asset={Check} />
    </RecTextLine>
  ));

  return (
    <Container>
      <CalendarView exerciseDays={exerciseDays} dayFunction={dayLoad} />
      <Bar />
      <Exercise>
        <Title>
          {month}월 {date}일 완료한 운동
        </Title>
        <Circles>
          <CircleContent>
            <PercentageCircle
              percent={percentage}
              radius={40}
              borderWidth={2}
              color={isDark ? colors.d_main : colors.l_main}
              shadowColor={isDark ? colors.grey_8 : colors.grey_1}
              bgColor={isDark ? colors.grey_9 : colors.white}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CircleText>{minute}</CircleText>
                <MiniText>분</MiniText>
              </View>
            </PercentageCircle>
            <CircleTitle>소요시간</CircleTitle>
          </CircleContent>
          <CircleContent>
            <Circle>
              <CircleText>{kilogram}</CircleText>
              <MiniText>kg</MiniText>
            </Circle>
            <CircleTitle>들어올린 무게</CircleTitle>
          </CircleContent>
          <CircleContent>
            <Circle>
              <CircleText>{calorie}</CircleText>
              <MiniText>Kcal</MiniText>
            </Circle>
            <CircleTitle>소모 칼로리</CircleTitle>
          </CircleContent>
        </Circles>
        <List>
          {1 ? exercise : <Text>해당 날짜에 완료한 운동이 없습니다.</Text>}
        </List>
      </Exercise>
    </Container>
  );
}
