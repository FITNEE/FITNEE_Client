import { ScreenLayout } from "../../components/Shared/OnBoarding_Shared";

const ORContainer = styled.View`
  margin-top: 158px;
  width: 120px;
  height: 13px;
`;
const Line = styled.View`
  width: 100%;
  border: ${StyleSheet.hairlineWidth}px solid ${colors.grey_5};
  margin-top: 6px;
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
  const getRoutine = async () => {
    try {
      let url = "https://gpthealth.shop/";
      //후가공한 SCHEDULE 배열에서의 IDX값을 그대로 가져와 query스트링으로 추가
      let detailAPI = `app/routine/${mySCHEDULE[selectedDay].routineId}`;
      const response = await axios.get(url + detailAPI);

      const result = response.data;
      setIsLoading(false);
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <ScreenLayout>
      <ORText>HELLO</ORText>
    </ScreenLayout>
  );
};
