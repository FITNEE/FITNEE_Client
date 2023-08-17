import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { AppContext } from "../../components/ContextProvider";
import { Button } from "../../Shared";
import { styled } from "styled-components/native";
import { colors } from "../../colors";
import HomeRoutines from "../../components/HomeRoutines";
import NotHomeRoutine from "../../components/NotHomeRoutine";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { TabBarAtom, IsDarkAtom } from "../../recoil/MyPageAtom";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const Top = styled.View`
  width: 100%;
  padding: 10px 24px;
  flex-direction: row;
  justify-content: space-between;
`;
const Logo = styled.Image`
  width: 88px;
  height: 28px;
  background-color: ${(props) =>
    props.isDark ? colors.grey_7 : colors.grey_3};
`;
const Premium = styled.View`
  padding: 6px 12px 6px 6px;
  gap: 4px;
  border-radius: 100px;
  flex-direction: row;
  background-color: ${(props) =>
    props.isDark ? colors.grey_7 : colors.grey_3};
  align-items: center;
`;
const Circle = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${colors.green};
  border-radius: 20px;
`;
const PremiumText = styled.Text`
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 19.5px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`;

const Home = ({ navigation }) => {
  const isFocus = useIsFocused();
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom);
  const [data, setData] = useState("");
  const isDark = useRecoilValue(IsDarkAtom);

  useEffect(() => {
    isFocus && setIsTabVisible(true);
  }, [isFocus]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://gpthealth.shop/app/routine/today"
      );
      console.log("Response : ", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //const { toggleLogin } = useContext(AppContext);
  // const [showRoutine, SetShowRoutine] = useState(true);

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: isDark ? colors.black : colors.grey_1,
        }}
      >
        {/*<Text>Home</Text>
      <Button enabled={true} text='logOut' onPress={() => toggleLogin()} />*/}
        <Top>
          <Logo isDark={isDark} />
          <Premium isDark={isDark}>
            <Circle />
            <PremiumText isDark={isDark}>PREMIUM</PremiumText>
          </Premium>
        </Top>
        {data.isSuccess ? (
          <HomeRoutines isDark={isDark} data={data.result} />
        ) : (
          <NotHomeRoutine isDark={isDark} />
        )}
      </SafeAreaView>
    </>
  );
};
//data.isSuccess
export default Home;
