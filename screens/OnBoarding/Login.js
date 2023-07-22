import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '../../colors';
import { BackButton, Button, Input, StatusText, Title } from '../../Shared';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  flex: 1;
`;
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
  const [PW, setPW] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toggleLogin } = useContext(AppContext);
  const email = route.params.email;

  const handlePress = () => {
    console.log('HandlePress');
    //login (email, PW);
    //login mutation 실행 후 boolean값 대조하기
    //if(true){toggleLogin()}
  };
  return (
    <ScreenLayout>
      {/* <BackButton onPress={() => goBack()} /> */}
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
              : rewrittenPW.length < 2
              ? '비밀번호가 일치하지 않습니다'
              : ''}
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
        loading={isLoading}
        enabled={PW.length > 8}
        text='로그인'
        onPress={() => handlePress()}
      ></Button>
    </ScreenLayout>
  );
};

export default Login;
