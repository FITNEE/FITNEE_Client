import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '../../colors';
import { Button, BackButton } from '../../Shared';
import {
  Input,
  StatusText,
  Title,
  SubText,
  ScreenLayout,
} from '../../components/Shared/OnBoarding_Shared';

const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
`;
const InputContainer = styled.View`
  width: 100%;
  flex: 1;
  margin-top: 76px;
`;

const CreateAccount_1 = ({ route, navigation }) => {
  const [PW, setPW] = useState('');
  const [rewrittenPW, setRewrittenPW] = useState('');
  const [rewrite, setRewrite] = useState(false);
  const email = route.params.email;
  const rewritePW = () => {
    console.log('rewritePW');
    setRewrite(true);
  };
  const handlePress = () => {
    navigation.navigate('CreateAccount_2', {
      email,
      PW,
    });
  };
  return (
    <ScreenLayout>
      <TextContainer>
        <Title>환영해요! 계정을 생성할게요.</Title>
        <SubText>
          {rewrite
            ? '비밀번호를 다시 입력해주세요.'
            : '비밀번호를 입력해주세요.'}
        </SubText>
      </TextContainer>
      {rewrite ? (
        <InputContainer>
          <StatusText>
            {rewrittenPW == PW
              ? '비밀번호가 일치합니다'
              : '비밀번호가 일치하지 않습니다'}
          </StatusText>
          <Input
            placeholderTextColor={colors.grey_3}
            autoFocus
            value={rewrittenPW}
            onSubmitEditing={() => {
              rewrittenPW == PW && handlePress();
            }}
            placeholder='password'
            secureTextEntry={true}
            returnKeyType='done'
            blurOnSubmit={false}
            onChangeText={(text) => setRewrittenPW(text)}
          />
        </InputContainer>
      ) : (
        <InputContainer>
          <Input
            placeholderTextColor={colors.grey_5}
            autoFocus
            onSubmitEditing={() => rewritePW()}
            placeholder='password'
            secureTextEntry={true}
            returnKeyType='done'
            blurOnSubmit={false}
            onChangeText={(text) => setPW(text)}
          />
        </InputContainer>
      )}

      <Button
        enabled={rewrite ? rewrittenPW == PW : PW}
        onPress={rewrite ? () => handlePress() : () => rewritePW()}
      ></Button>
    </ScreenLayout>
  );
};

export default CreateAccount_1;
