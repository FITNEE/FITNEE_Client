import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  Rect,
  Text as TextSVG,
  Svg,
  Line,
  WithLocalSvg,
  Circle,
} from "react-native-svg";
import { colors } from "../../colors";
import { styled } from "styled-components/native";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

const Container = styled.ScrollView``;

export default function TotalChart() {
  const isDark = useRecoilValue(IsDarkAtom);
  const BoxContainer = styled.View`
    margin: 26px 24px 0px 24px;
    background-color: ${isDark ? colors.grey_7 : colors.grey_1};
    border-radius: 20px;
    padding: 16px;
    padding-right: 0px;
  `;

  const [message, setMessage] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const chartConfig = {
    color: () => (isDark ? colors.grey_7 : colors.grey_1),
    labelColor: () => (isDark ? colors.white : colors.black),
    useShadowColorFromDataset: true,
    decimalPlaces: 0,
    fillShadowGradientFromOpacity: 0.3,
    fillShadowGradientToOpacity: 0,
    backgroundGradientFrom: isDark ? "#595F72" : "#F6F8FA",
    backgroundGradientTo: isDark ? "#595F72" : "#F6F8FA",
    propsForLabels: {
      fontSize: 11,
      fonstWeight: 600,
      lineHeight: 16.5,
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: isDark ? colors.grey_6 : colors.grey_2,
      strokeDasharray: "0",
    },
    propsForDots: {
      r: "5",
    },
  };
  const screenWidth = Dimensions.get("window").width;

  const KcalData = [200, 500, 600, 900, 400, 300, 700, 1100];
  const KcalMax = Math.max(...KcalData);
  const KmData = [4, 3, 7, 6, 2, 5, 6, 6];
  const KmMax = Math.max(...KmData);
  const calorieData = KcalData.map((value) => value / KcalMax);
  const distanceData = KmData.map((value) => value / KmMax);
  const realMax = Math.max(KmMax, KcalMax);
  const [maxData, setMaxData] = useState();
  const dataLength = KcalData.length;

  const data = {
    labels: ["7월 1주", "2주", "3주", "4주", "8월 1주", "2주", "3주", "4주"],
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

  const [unit, setUnit] = useState("kcal");
  const [render, setRender] = useState(
    (data.labels.length * screenWidth) / data.labels.length
  );

  return (
    <BoxContainer>
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
          width={
            data.labels.length > 3
              ? (data.labels.length * screenWidth) / 4
              : screenWidth
          }
          //width={screenWidth-48}
          height={230}
          chartConfig={chartConfig}
          fromZero={true}
          bezier
          withHorizontalLabels={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          style={{
            paddingRight: 0,
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
                <Line
                  x1={message.x}
                  x2={message.x}
                  y1={message.y + 5}
                  y2={189}
                  stroke={isDark ? colors.white : colors.black}
                  strokeWidth={2}
                  strokeDasharray={3}
                ></Line>
                <View
                  style={{
                    position: "absolute",
                    width: 62,
                    height: 32,
                    top: message.y - 40,
                    left: message.x === 0 ? 2 : message.x - 31,
                    backgroundColor: isDark ? colors.white : colors.black,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: isDark ? colors.black : colors.white,
                      textAlign: "center",
                    }}
                  >
                    {message.value * maxData}
                  </Text>
                  {
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: isDark ? colors.black : colors.white,
                        textAlign: "center",
                      }}
                    >
                      {unit}
                    </Text>
                  }
                </View>
              </>
            ) : null;
          }}
          onDataPointClick={(data) => {
            data.dataset.data === calorieData
              ? setUnit(" kcal")
              : setUnit(" km");
            data.dataset.data === calorieData
              ? setMaxData(KcalMax)
              : setMaxData(KmMax);
            data.dataset.data.length > 3
              ? setRender(data.x - screenWidth + 94)
              : "";
            let isSamePoint = message.x === data.x && message.y === data.y;
            isSamePoint
              ? setMessage((previousState) => {
                  return {
                    ...previousState,
                    value: data.value,
                    visible: !previousState.visible,
                  };
                })
              : setMessage({
                  x: data.x,
                  value: data.value,
                  y: data.y,
                  visible: true,
                });
          }}
        />
      </Container>
    </BoxContainer>
  );
}
