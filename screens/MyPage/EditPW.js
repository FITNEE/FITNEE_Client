import React, { useEffect, useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { styled } from "styled-components/native";
import { colors } from "../../colors";
import { Button } from "../../Shared";

    const Container = styled.View`
        height: 100%;
        background-color: ${colors.white};
        padding: 32px 24px 0px 24px;
    `;
    const Input = styled.TextInput`
        padding: 15px 7px;
        border-radius: 4px;
        background-color: ${colors.grey_1};
        border-radius: 10px;
        width: 100%;
        height: 48px;
    `;
    const StatusText = styled.Text`
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: 16.5px;
        width: 100%;
        margin-bottom: 20px;
        margin-right: 8px;
        font-weight: 300;
        color: ${colors.red};
     `;
    const InputContainer = styled.View`
        width: 100%;
        //flex: 1;
        margin-bottom: 10px;
    `;

export default function EditPW({ navigation }) {

    const [name, onChangeName] = useState('초코맛 프로틴');
    const [birth, onChangeBirth] = useState('1998');
    const email = useState(['protein012@gmail.com']);

    const [PW, setPW] = useState("rjh"); // 값 받아오기
    const [rewrittenPW, setRewrittenPW] = useState("");
    const [newPW, setNewPW] = useState("");
    const [rewrittenNewPW, setRewrittenNewPW] = useState("");
    const handlePress = () => {
        navigation.navigate("userInfo");
    };

    return (
    <SafeAreaView>
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <Container>
        <InputContainer>
            <Input
                placeholderTextColor={colors.grey_6}
                value={rewrittenPW}
                autoFocus
                onSubmitEditing={() => {
                rewrittenPW == PW && handlePress();
                }}
                placeholder="기존 비밀번호 확인"
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setRewrittenPW(text)}
            />
            <StatusText>
            {rewrittenPW == PW
              ? ""
              : "비밀번호가 일치하지 않습니다"}
            </StatusText>
        </InputContainer>
        <InputContainer>
          <Input
            placeholderTextColor={colors.grey_6}
            placeholder="새 비밀번호"
            secureTextEntry={true}
            returnKeyType="done"
            blurOnSubmit={false}
            onChangeText={(text) => setNewPW(text)}
          />
        </InputContainer>
        <InputContainer>
            <Input
                placeholderTextColor={colors.grey_6}
                value={rewrittenNewPW}
                onSubmitEditing={() => {
                rewrittenNewPW == NewPW && handlePress();
                }}
                placeholder="새 비밀번호 확인"
                secureTextEntry={true}
                returnKeyType="done"
                blurOnSubmit={false}
                onChangeText={(text) => setRewrittenNewPW(text)}
            />
            <StatusText>
            {rewrittenNewPW == newPW
              ? ""
              : "비밀번호가 일치하지 않습니다"}
            </StatusText>
        </InputContainer>

      <Button
        enabled={rewrittenPW == PW && rewrittenNewPW != "" && rewrittenNewPW == newPW}
        onPress={() => handlePress()}
      />
            
        </Container>
    </TouchableWithoutFeedback>
    </SafeAreaView>
    );
}