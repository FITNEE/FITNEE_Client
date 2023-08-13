import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Button, BackButton } from "../../Shared";
import {
  Input,
  ScreenLayout,
  Title,
} from "../../components/Shared/OnBoarding_Shared";
import axios from "axios";
import { AppContext } from "../../components/ContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
`;
const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 232px;
`;
const PWStatusText = styled.Text`
  font-size: 12px;
  width: 100%;
  text-align: right;
  margin-bottom: 12px;
  margin-right: 8px;
  font-weight: 300;
  color: ${colors.red};
`;
const SubText = styled.Text`
  font-size: 13px;
  margin-top: 8px;
  font-weight: 400;
  color: ${colors.black};
`;

const Login = ({ route, navigation }) => {
  const [PW, setPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const { toggleLogin } = useContext(AppContext);
  const email = route.params.email;
  const postLogin = async (email, PW) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = "app/user/login";
      console.log(email, PW);
      let data = { userId: email, userPw: PW };
      // const queryStr = `?userId=${email}&userPw=${PW}`;
      const response = await axios.post(url + detailAPI, data, {
        headers: {
          "Content-Type": `application/json`,
        },
      });
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handlePress = () => {
    setIsLoading(true);
    postLogin(email, PW).then((response) => {
      console.log(response);
      //로그인 성공 시,
      if (response.code == 1000) {
        AsyncStorage.setItem("userId", email).then(
          console.log("userId set to AsyncStorage")
        );
        toggleLogin();
      } else {
        setStatusText(response.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <ScreenLayout>
      <BackButton onPress={() => navigation.goBack()} />
      <TextContainer>
        <Title>다시 만나 반가워요!</Title>
        <SubText>비밀번호를 입력해주세요.</SubText>
      </TextContainer>
      <InputContainer>
        <PWStatusText>{statusText}</PWStatusText>
        <Input
          style={statusText && { borderWidth: 1, borderColor: colors.red }}
          placeholderTextColor={colors.grey_3}
          autoFocus
          onSubmitEditing={() => handlePress()}
          placeholder="password"
          secureTextEntry={true}
          returnKeyType="done"
          blurOnSubmit={false}
          onChangeText={(text) => setPW(text)}
        />
      </InputContainer>
      <Button
        loading={isLoading}
        enabled={(PW.length > 2) & !isLoading}
        text="로그인"
        onPress={() => handlePress()}
      ></Button>
    </ScreenLayout>
  );
};

export default Login;
