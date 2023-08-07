import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { styled } from "styled-components/native";
import { colors } from "../../colors";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Back from "../../assets/left_arrow.png";

const Container = styled.View`
  background-color: #fff;
  height: 100%;
  padding: 0px 24px;
  align-items: center;
`;
const Profile = styled.View`
  align-items: center;
  margin-top: 35px;
  margin-bottom: 32px;
`;
const ProfileImage = styled.TouchableOpacity`
  width: 88px;
  height: 88px;
  background-color: ${colors.grey_2};
  border-radius: 88px;
`;
const InputBlock = styled.TextInput`
  width: 238px;
  background-color: ${colors.grey_1};
  padding: 0px 16px;
  height: 46px;
  border-radius: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
const InputRed = styled.View`
  width: 240px;
  height: 48px;
  border-radius: 8px;
  margin-bottom: 3px;
  border: 1px;
  border-color: ${({ check, error }) =>
    check ? (error ? colors.red : colors.green) : colors.grey_2};
`;
const InputContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;
const StatusText = styled.Text`
  margin-left: 40px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16.5px;
  width: 100%;
  margin-bottom: 20px;
  margin-right: 8px;
  font-weight: 300;
  color: ${({ check, error }) =>
    check ? (error ? colors.red : colors.green) : colors.grey_2};
`;

const CheckButton = styled.TouchableOpacity`
  width: 79px;
  height: 48px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.l_main};
  margin-left: 8px;
`;
const CheckButtonText = styled.Text`
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22.5px;
  color: ${colors.l_main};
`;

export default function EditUserInfo({ navigation }) {
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(true);
  const [userInfo, setUserInfo] = useState([
    {
      birthYear: "",
      userId: "",
      userNickname: "",
    },
  ]);

  const getUserInfoData = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/userinfo`;
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getUserInfoData().then((result) => {
      setUserInfo(result.result);
    });
  }, []);

  const getUserName = userInfo[0].userNickname;

  const [newNickname, setNewNickname] = useState(getUserName);

  const checkOnlyOneNickName = async (newNickname) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/nickname?userNickName=${newNickname}`;
      const response = await axios.get(url + detailAPI, {
        userNickName: newNickname,
      });
      const checkResult = response.data;
      return checkResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const updateUserInfo = async (newNickname) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/updateuser`;
      const response = await axios.put(url + detailAPI, {
        userNickname: newNickname,
      });
      const updateResult = response.data;
      return updateResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const change = () => {
    checkOnlyOneNickName(newNickname).then((checkResult) => {
      setCheck(true);
      checkResult.result ? setError(true) : setError(false);
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Back}
            style={{ width: 24, height: 24, marginLeft: 24 }}
          ></Image>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            error &&
              updateUserInfo(newNickname).then((updateResult) => {
                console.log(updateResult);
              });
            navigation.navigate("UserInfo");
          }}
          // put 받아오기
          style={{ marginRight: 24 }}
        >
          <Text style={{ fontSize: 17, fontWeight: 600, color: "#9747FF" }}>
            저장
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Container>
          <Profile>
            <ProfileImage></ProfileImage>
          </Profile>
          <InputContainer>
            <InputRed error={error} check={check}>
              <InputBlock
                editable
                onChangeText={(text) => setNewNickname(text)}
                placeholder={getUserName}
              />
            </InputRed>
            <CheckButton enabled onPress={change}>
              <CheckButtonText>중복 확인</CheckButtonText>
            </CheckButton>
          </InputContainer>
          <StatusText error={error} check={check}>
            {check
              ? error
                ? "이미 존재하는 닉네임입니다."
                : "사용 가능한 닉네임입니다."
              : ""}
          </StatusText>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
