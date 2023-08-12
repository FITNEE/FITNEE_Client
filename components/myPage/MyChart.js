import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg, Line } from "react-native-svg";
import { colors } from "../../colors";
import { styled } from "styled-components/native";
import WrappedText from "react-native-wrapped-text";
import { divide } from "react-native-reanimated";
import PureChart from "react-native-pure-chart";

const BoxContainer = styled.View`
  margin: 26px 24px 0px 24px;
  background-color: ${colors.grey_1};
  border-radius: 20px;
  padding: 16px;
  padding-right: 0px;
`;
const Container = styled.ScrollView``;

export default function MyChart() {
  const screenWidth = Dimensions.get("window").width;

  /*
    const [message, setMessage] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  

  const chartConfig = {
    color: () => colors.grey_2,
    labelColor: () => colors.black,
    useShadowColorFromDataset: true,
    fillShadowGradientFromOpacity: 0.3,
    fillShadowGradientToOpacity: 0,

    backgroundGradientFrom: colors.grey_1,
    backgroundGradientTo: colors.grey_1,
    propsForLabels: {
      fontSize: 11,
      fonstWeight: 600,
      lineHeight: 16.5,
    },
    propsForDots: {
      r: "5",
    },
  };
  const screenWidth = Dimensions.get("window").width;

  //dataArray 비율 바꾸고, 범위 비슷하도록... 값/max*1.2정도 // 값 받아올때는 값*max/1.2를 하고.... y값 받아올 수 있으면 message default값으로 넣어서 좋은디....
  // l_main 쪽은 kcal값을 받아오고.. green 쪽은 km 값을 받아오기!! => 단위도 변경해야함..

  function divideArrayByMax(arr) {
    if (arr.length === 0) {
      return [];
    }
    const max = Math.max(...arr);
    const dividedArray = arr.map((value) => value / max);
    return dividedArray;
  }

  const KcalData = [4, 3, 7, 6, 2, 5, 6, 9];
  const KcalMax = Math.max(...KcalData);
  const KmData = [2, 5, 6, 9, 4, 3, 7, 6];
  const KmMax = Math.max(...KmData);
  const calorieData = KcalData.map((value) => value / KcalMax);
  const distanceData = KmData.map((value) => value / KmMax);

  //console.log(calorieData);
  //console.log(distanceData);

  const data = {
    labels: ["7월 1주", "2주", "3주", "4주", "8월 1주", "2주", "3주", "4주"],
    datasets: [
      {
        seriesName: 
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
        data: [1],
      },
      {
        data: [0],
      },
    ],
    //legend: ["kcal", "km"],
  };

  const lastDataIndex = data.labels.length - 1;
  const valueDataset0 = data.datasets[0].data[lastDataIndex];
  const valueDataset1 = data.datasets[1].data[lastDataIndex];
  const maxValue = Math.max(valueDataset0, valueDataset1);
  const isDataset0Larger = maxValue === valueDataset0;

  
  const getDataPointPositions = () => {
    return data.datasets[0].data.map((value, index) => ({
      x: (index * screenWidth) / (data.labels.length - 1),
      y: 230 - (230 * value) / 25, // Adjust this value based on your chart's data range
      value: value,
    }));
  };

  const dataPointPositions = getDataPointPositions();
  const lastDataPoint = dataPointPositions[dataPointPositions.length - 1];
 
  const [message, setMessage] = useState({
    x: lastDataPoint.x,
    y: lastDataPoint.y,
    visible: true,
    value: lastDataPoint.value,
  });
  */
  var data = [
    {
      seriesName: "calorie",
      data: [
        { x: "7월 1주", y: 30 },
        { x: "2주", y: 50 },
        { x: "3주", y: 30 },
        { x: "4주", y: 40 },
        { x: "8월 1주", y: 20 },
        { x: "2주", y: 30 },
        { x: "3주", y: 60 },
        { x: "4주", y: 30 },
      ],
      color: colors.l_main,
    },
    {
      seriesName: "distance",
      data: [
        { x: "7월 1주", y: 50 },
        { x: "2주", y: 20 },
        { x: "3주", y: 60 },
        { x: "4주", y: 70 },
        { x: "8월 1주", y: 90 },
        { x: "2주", y: 20 },
        { x: "3주", y: 30 },
        { x: "4주", y: 60 },
      ],
      color: colors.green,
    },
  ];

  return (
    <BoxContainer>
      <Container
        horizontal
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: (data.length * screenWidth) / 8, y: 0 }}
      >
        <PureChart
          type={"line"}
          data={data}
          width={"100%"}
          height={200}
          xAxisColor={colors.grey_5}
          yAxisColor={"transparent"}
          xAxisGridLineColor={"transparent"}
          yAxisGridLineColor={colors.grey_2}
          labelColor={colors.black}
          customValueRenderer={(index, point) => {
            if (index % 2 === 0) return null;
            return <Text style={{ textAlign: "center" }}>{point.y}</Text>;
          }}
        />
      </Container>
    </BoxContainer>
  );
}
