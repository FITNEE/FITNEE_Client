import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { styled } from "styled-components/native";
import { colors } from "../../colors";
import { Button } from "../../Shared";
import axios from "axios";

const Container = styled.View`
  height: 100%;
  background-color: ${colors.white};
  padding: 32px 24px 0px 24px;
`;
const Input = styled.TextInput`
  padding: 15px 16px;
  border-radius: 10px;
  background-color: ${colors.grey_1};
  width: 100%;
  height: 48px;
`;
const InputRed = styled.View`
  width: 100%;
  border-radius: 10px;
  border: 1px;
  border-color: ${({ error }) => (error ? colors.red : "transparent")};
`;
const StatusText = styled.Text`
  margin-left: 16px;
  margin-top: 3px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16.5px;
  width: 100%;
  margin-bottom: 8px;
  margin-right: 8px;
  font-weight: 300;
  color: ${colors.red};
`;
const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 60px;
`;

export default function EditPW({ navigation }) {
  const [PW, setPW] = useState("pjk"); // 값 받아오기
  const [rewrittenPW, setRewrittenPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [rewrittenNewPW, setRewrittenNewPW] = useState("");
  const [errorPW, setErrorPW] = useState(false);
  const [errorNewPW, setErrorNewPW] = useState(false);
  const [messageErrorPW, setMessageErrorPW] = useState("");
  const [visibleErrorNewPW, setVisibleErrorNewPW] = useState(false);

  const checkPW = async (userPW) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/comparepwd`;
      console.log(userPW);
      const response = await axios.post(url + detailAPI, {
        userPw: userPW,
      });
      const checkResult = response.data;
      return checkResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const check = () => {
    checkPW(rewrittenPW).then((checkResult) => {
      console.log(checkResult.isSuccess);
      setErrorPW(!checkResult.isSuccess);
    });
    checkPW(newPW).then((checkResult) => {
      console.log(checkResult.isSuccess);
      setErrorNewPW(checkResult.isSuccess);
      checkResult.code === 706 &&
        setMessageErrorPW("기존 비밀번호와 동일합니다.");
      checkResult.code === 707 && newPW.length < 4 && setErrorNewPW(true);
      checkResult.code === 707 &&
        newPW.length < 4 &&
        setMessageErrorPW("4글자 이상");
      !errorPW && !errorNewPW && setMessageErrorPW("");
      !errorPW && !errorNewPW && setVisibleErrorNewPW(true);
    });
  };

  const updateUserPW = async (newPW) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/updatepwd`;
      const response = await axios.put(url + detailAPI, {
        userPw: newPW,
      });
      const updateResult = response.data;
      return updateResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handlePress = () => {
    updateUserPW(newPW).then((updateResult) => {
      console.log(updateResult);
    });
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Container>
          <InputContainer>
            <InputRed error={errorPW}>
              <Input
                placeholderTextColor={colors.grey_6}
                autoFocus
                placeholder="기존 비밀번호 확인"
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setRewrittenPW(text)}
              />
            </InputRed>
            <StatusText>
              {errorPW ? "비밀번호가 일치하지 않습니다" : ""}
            </StatusText>
            <InputRed error={errorNewPW}>
              <Input
                placeholderTextColor={colors.grey_6}
                placeholder="새 비밀번호"
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setNewPW(text)}
              />
            </InputRed>
            <StatusText>{messageErrorPW}</StatusText>
            <InputRed error={rewrittenNewPW != newPW}>
              <Input
                placeholderTextColor={colors.grey_6}
                onSubmitEditing={() => {
                  rewrittenNewPW == newPW && handlePress();
                }}
                placeholder="새 비밀번호 확인"
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setRewrittenNewPW(text)}
              />
            </InputRed>
            <StatusText>
              {visibleErrorNewPW
                ? rewrittenNewPW == newPW
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다"
                : ""}
            </StatusText>
          </InputContainer>
          {visibleErrorNewPW ? (
            <Button
              enabled={
                visibleErrorNewPW && !errorNewPW && rewrittenNewPW == newPW
              }
              onPress={handlePress}
              text={"새 비밀번호 저장"}
            />
          ) : (
            <Button
              onPress={check}
              enabled={rewrittenPW != "" && newPW != ""}
              text={"확인"}
            ></Button>
          )}
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
