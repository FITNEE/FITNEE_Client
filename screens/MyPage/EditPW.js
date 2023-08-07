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

  const updateUserInfo = async (newPW) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/updateuser`;
      const response = await axios.put(url + detailAPI, {
        userPW: newPW,
      });
      const updateResult = response.data;
      return updateResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handlePress = () => {
    navigation.navigate("UserInfo");
    updateUserInfo(newPW).then(alert("변경되었습니다"));
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
            <InputRed error={rewrittenPW != PW}>
              <Input
                placeholderTextColor={colors.grey_6}
                value={rewrittenPW}
                autoFocus
                placeholder="기존 비밀번호 확인"
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setRewrittenPW(text)}
              />
            </InputRed>
            <StatusText>
              {rewrittenPW == PW ? "" : "비밀번호가 일치하지 않습니다"}
            </StatusText>
            <InputRed error={newPW.length > 0 && newPW.length < 4}>
              <Input
                placeholderTextColor={colors.grey_6}
                placeholder="새 비밀번호"
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setNewPW(text)}
              />
            </InputRed>
            <StatusText>
              {newPW.length > 0 && newPW.length < 4
                ? "비밀번호는 최소 4글자입니다"
                : ""}
            </StatusText>
            <InputRed error={rewrittenNewPW != newPW}>
              <Input
                placeholderTextColor={colors.grey_6}
                value={rewrittenNewPW}
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
              {rewrittenNewPW == newPW ? "" : "비밀번호가 일치하지 않습니다"}
            </StatusText>
          </InputContainer>

          <Button
            enabled={rewrittenNewPW != "" && rewrittenNewPW == newPW}
            onPress={() => handlePress()}
          />
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
