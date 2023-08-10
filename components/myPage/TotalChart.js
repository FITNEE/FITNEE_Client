import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg, Line } from "react-native-svg";
import { colors } from "../../colors";
import { styled } from "styled-components/native";
import WrappedText from "react-native-wrapped-text";

const Container = styled.ScrollView`
  margin: 26px 24px 0px 24px;
  background-color: ${colors.grey_1};
  border-radius: 20px;
  padding: 16px;
`;

export default function TotalChart() {
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
  };
  const screenWidth = Dimensions.get("window").width;

  //dataArray 비율 바꾸고, 범위 비슷하도록... 값/max*1.2정도 // 값 받아올때는 값*max/1.2를 하고.... y값 받아올 수 있으면 message default값으로 넣어서 좋은디....
  // l_main 쪽은 kcal값을 받아오고.. green 쪽은 km 값을 받아오기!! => 단위도 변경해야함..
  const DATA = {};
  const data = {
    labels: ["7월 1주", "2주", "3주", "4주", "8월 1주", "2주", "3주", "4주"],
    datasets: [
      {
        data: [4, 3, 7, 6, 2, 5, 6, 9],
        color: () => colors.l_main,
        strokeWidth: 4,
      },
      {
        data: [2, 5, 6, 9, 4, 3, 7, 6],
        color: () => colors.green,
        strokeWidth: 4,
      },
    ],
  };

  const lastDataIndex = data.labels.length - 1;
  const valueDataset0 = data.datasets[0].data[lastDataIndex];
  const valueDataset1 = data.datasets[1].data[lastDataIndex];
  const maxValue = Math.max(valueDataset0, valueDataset1);
  const isDataset0Larger = maxValue === valueDataset0;

  /*
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

  return (
    <Container
      horizontal
      showsHorizontalScrollIndicator={false}
      contentOffset={{ x: (data.labels.length * screenWidth) / 8, y: 0 }}
    >
      <LineChart
        data={data}
        width={(data.labels.length * screenWidth) / 4}
        //width={screenWidth-48}
        height={230}
        chartConfig={chartConfig}
        fromZero={true}
        bezier
        withHorizontalLabels={false}
        withVerticalLines={false}
        style={{
          paddingRight: 0,
        }}
        decorator={() => {
          return message.visible ? (
            <View
              style={{
                position: "absolute",
                width: 73,
                height: 32,
                top: message.y - 40,
                left: message.x - 36,
                backgroundColor: colors.black,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: colors.white,
                  textAlign: "center",
                }}
              >
                {message.value}
              </Text>
              {
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: colors.white,
                    textAlign: "center",
                  }}
                >
                  {" kcal"}
                </Text>
              }
            </View>
          ) : null;
        }}
        onDataPointClick={(data) => {
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
  );
}
