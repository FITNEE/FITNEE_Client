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
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

const Container = styled.View`
  height: 100%;
  background-color: ${({ isDark }) => (isDark ? colors.grey_9 : colors.white)};
  padding: 32px 24px 0px 24px;
`;
const Input = styled.TextInput`
  padding: 15px 16px;
  border-radius: 10px;
  background-color: ${({ isDark }) => (isDark ? colors.black : colors.grey_1)};
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  width: 100%;
  height: 48px;
`;
const InputRed1 = styled.View`
  width: 100%;
  border-radius: 10px;
  border: 1px;
  border-color: ${({ error }) => (error ? colors.red : "transparent")};
`;
const InputRed2 = styled.View`
  width: 100%;
  border-radius: 10px;
  border: 1px;
  border-color: ${({ error, prevCheck, contents, on }) =>
    prevCheck && contents != "" && on
      ? error
        ? colors.red
        : colors.green
      : "transparent"};
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
  color: ${({ error }) => (error ? colors.red : colors.green)};
`;
const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 60px;
`;

export default function EditPW({ navigation }) {
  const isDark = useRecoilValue(IsDarkAtom);

  const [rewrittenPW, setRewrittenPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [rewrittenNewPW, setRewrittenNewPW] = useState("");
  const [errorPW, setErrorPW] = useState(false);
  const [errorNewPW, setErrorNewPW] = useState(false);
  const [messageErrorPW, setMessageErrorPW] = useState("");
  const [checking, setChecking] = useState(false);
  const [click, setClick] = useState(false);
  const [visibleErrorNewPW, setVisibleErrorNewPW] = useState(false);

  const check = async (userPW) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/comparepwd`;
      const response = await axios.post(url + detailAPI, {
        userPw: userPW,
      });
      const checkResult = response.data;
      return checkResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const checkPW = () => {
    check(rewrittenPW).then((checkResult) => {
      setErrorPW(!checkResult.isSuccess);
      checkResult.isSuccess && setChecking(true);
      checkResult.isSuccess && this.secondInput.focus();
    });
  };

  const checkNewPW = () => {
    check(newPW).then((checkResult) => {
      setClick(true);
      setErrorNewPW(checkResult.isSuccess);
      if (checkResult.code === 706) {
        setMessageErrorPW("기존 비밀번호와 동일합니다.");
        setErrorNewPW(true);
      } else if (newPW.length < 4) {
        setMessageErrorPW("4글자 이상");
        setErrorNewPW(true);
      } else {
        setMessageErrorPW("사용 가능한 비밀번호입니다.");
        setErrorNewPW(false);
        setVisibleErrorNewPW(true);
        this.thirdInput.focus();
      }
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
      updateResult.code === 1000 &&
        navigation.navigate("UserInfo", {
          showToast: true,
          toastMessage: "비밀번호가 변경되었습니다.",
        });
    });
  };

  return (
    <SafeAreaView backgroundColor={isDark ? colors.grey_9 : colors.grey_1}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Container isDark={isDark}>
          <InputContainer>
            <InputRed1 error={errorPW}>
              <Input
                isDark={isDark}
                placeholderTextColor={isDark ? colors.grey_8 : colors.grey_6}
                placeholder="기존 비밀번호 확인"
                style={{
                  color: checking
                    ? isDark
                      ? colors.grey_7
                      : colors.grey_2
                    : isDark
                    ? colors.white
                    : colors.black,
                }}
                autoFocus
                ref={(input) => {
                  this.firstInput = input;
                }}
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setRewrittenPW(text)}
              />
            </InputRed1>
            <StatusText error={errorPW}>
              {errorPW ? "비밀번호가 일치하지 않습니다" : ""}
            </StatusText>
            <InputRed2
              error={errorNewPW}
              prevCheck={checking}
              contents={newPW}
              on={click}
            >
              <Input
                isDark={isDark}
                placeholderTextColor={isDark ? colors.grey_8 : colors.grey_6}
                placeholder="새 비밀번호"
                ref={(input) => {
                  this.secondInput = input;
                }}
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setNewPW(text)}
              />
            </InputRed2>
            <StatusText error={errorNewPW}>{messageErrorPW}</StatusText>
            <InputRed2
              error={rewrittenNewPW != newPW}
              prevCheck={visibleErrorNewPW}
              contents={rewrittenNewPW}
              on={click}
            >
              <Input
                isDark={isDark}
                placeholderTextColor={isDark ? colors.grey_8 : colors.grey_6}
                onSubmitEditing={() => {
                  rewrittenNewPW == newPW && handlePress();
                }}
                placeholder="새 비밀번호 확인"
                ref={(input) => {
                  this.thirdInput = input;
                }}
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setRewrittenNewPW(text)}
              />
            </InputRed2>
            <StatusText error={rewrittenNewPW != newPW}>
              {visibleErrorNewPW
                ? rewrittenNewPW == newPW
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다"
                : ""}
            </StatusText>
          </InputContainer>
          {!checking ? (
            <Button
              onPress={() => checkPW()}
              enabled={rewrittenPW != ""}
              text={"확인"}
            ></Button>
          ) : visibleErrorNewPW ? (
            <Button
              enabled={
                visibleErrorNewPW && !errorNewPW && rewrittenNewPW == newPW
              }
              onPress={() => handlePress()}
              text={"새 비밀번호 저장"}
            />
          ) : (
            <Button
              onPress={() => checkNewPW()}
              enabled={newPW != ""}
              text={"확인"}
            ></Button>
          )}
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
