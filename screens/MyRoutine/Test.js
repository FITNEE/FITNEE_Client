import { useEffect, useState } from "react";
import { ScreenLayout } from "../../components/Shared/OnBoarding_Shared";
import { styled } from "styled-components/native";
import { colors } from "../../colors";
import axios from "axios";

const ORContainer = styled.View`
  margin-top: 158px;
  width: 120px;
  height: 13px;
`;
const ORText = styled.Text`
  color: ${colors.grey_6};
  font-size: 13px;
  position: absolute;
  background-color: ${colors.grey_1};
  width: 40px;
  text-align: center;
  left: 40px;
`;
export const Test = () => {
  const [SCHE, setSCHE] = useState(null);
  const getRoutines = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = "app/routine/calendar/parts";
      const response = await axios.get(url + detailAPI);

      return response.data.result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const sortArray = (obj) => {
    const sortedArray = Object.keys(obj.parts).map((key, index) => ({
      id: index,
      parts: obj.parts[key] !== null ? obj.parts[key] : "임시",
      routineIdx: obj.routineIdx[key],
    }));

    return sortedArray;
  };

  useEffect(() => {
    getRoutines().then((res) => console.log(sortArray(res)));
  }, []);

  return (
    <ScreenLayout>
      <ORText>HELLO</ORText>
    </ScreenLayout>
  );
};
