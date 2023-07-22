import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '../../colors';
import { Button } from '../../Shared';
import { StyleSheet, Text } from 'react-native';
import {
  ScreenLayout,
  Title,
  SubText,
} from '../../components/Shared/OnBoarding_Shared';

const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const Input = styled.TextInput`
  padding: 15px 7px;
  border-radius: 4px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
`;

const BottomContainer = styled.View`
  align-items: center;
  width: 100%;
`;
const ORContainer = styled.View`
  width: 120px;
  height: 13px;
`;
const Line = styled.View`
  width: 100%;
  border: ${StyleSheet.hairlineWidth}px solid ${colors.grey_5};
  margin-top: 6px;
`;
const ORText = styled.Text`
  color: ${colors.grey_5};
  font-size: 13px;
  position: absolute;
  background-color: #f3f3f3;
  width: 40px;
  text-align: center;
  left: 40px;
`;
const SNSContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 70%;
  margin-top: 28px;
`;
const SNSButton = styled.TouchableOpacity`
  width: 64px;
  background-color: white;
  height: 64px;
`;
const OnBoarding = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const handleSubmit = () => {
    //Email값 받고, 이에 대한 login, CreateAccount여부 나타내는 boolean값 반환받기
    if (hasAccount) {
      navigation.navigate('Login', {
        email,
      });
    } else {
      navigation.navigate('CreateAccount_1', {
        email,
      });
    }
  };
  return (
    <ScreenLayout>
      <TextContainer>
        <Title>이메일을 입력해주세요.</Title>
        <SubText>로그인 또는 회원가입에 필요합니다.</SubText>
      </TextContainer>
      <Input
        keyboardType='url'
        placeholderTextColor={colors.grey_5}
        autoFocus
        onSubmitEditing={() => handleSubmit()}
        placeholder='이메일 입력'
        returnKeyType='next'
        blurOnSubmit={false}
        onChangeText={(text) => setEmail(text)}
      />
      <BottomContainer>
        <ORContainer>
          <Line />
          <ORText>또는</ORText>
        </ORContainer>
        <SNSContainer>
          <SNSButton>
            <Text>Google</Text>
          </SNSButton>
          <SNSButton>
            <Text>Kakao</Text>
          </SNSButton>
          <SNSButton>
            <Text>Naver</Text>
          </SNSButton>
        </SNSContainer>
      </BottomContainer>
      <Button
        enabled={email.indexOf('@') != -1}
        onPress={() => handleSubmit()}
      ></Button>
    </ScreenLayout>
  );
};

export default OnBoarding;
