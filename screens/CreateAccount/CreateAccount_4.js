import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '../../colors';
import { Button, Title } from '../../Shared';
import LottieView from 'lottie-react-native';
import { AppContext } from '../../components/ContextProvider';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  flex: 1;
  background-color: #f3f3f3;
`;
const SubTitle = styled.Text`
  text-align: center;
  margin-top: 8px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: ${colors.black};
`;
const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
`;
const Test = styled.Text`
  margin-top: 8px;
  font-size: 13px;
  width: 260px;
  line-height: 18px;
  font-weight: 400;
  color: ${colors.black};
`;
const AnimationContainer = styled.View`
  margin-top: -80px;
  background-color: ${colors.white};
  width: 80%;
  border-radius: 9999px;
  aspect-ratio: 1/1;
`;

const CreateAccount_4 = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { toggleLogin } = useContext(AppContext);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const goBackHome = () => {
    toggleLogin();
  };

  return (
    <ScreenLayout>
      <TextContainer>
        <Title>
          {isLoading ? '계정을 생성하는 중' : '계정 생성을 완료했어요!'}
        </Title>
        <SubTitle>
          {isLoading
            ? `잠시만 기다려 주세요
            `
            : `이제 인공지능이 만들어주는
운동루틴을 경험하러 가볼까요?`}
        </SubTitle>
      </TextContainer>
      <AnimationContainer>
        {isLoading ? <LottieView /> : <Test></Test>}
      </AnimationContainer>
      <Button
        loading={isLoading}
        enabled={isLoading == false}
        text='시작하기'
        onPress={() => goBackHome()}
      />
    </ScreenLayout>
  );
};

export default CreateAccount_4;
