import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Button, BackButton } from "../../Shared";
import {
  Input,
  ScreenLayout,
  StatusText,
  Title,
} from "../../components/Shared/OnBoarding_Shared";
import axios from "axios";
import { AppContext } from "../../components/ContextProvider";
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
const SubText = styled.Text`
  font-size: 13px;
  margin-top: 8px;
  font-weight: 400;
  color: ${colors.black};
`;

const Login = ({ route, navigation }) => {
  const [PW, setPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toggleLogin, setToken } = useContext(AppContext);
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
      // console.log(response.result.accessToken);
      setToken(response.result.accessToken);
      toggleLogin();
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
        <StatusText>비밀번호가 일치하지 않습니다</StatusText>
        <Input
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
