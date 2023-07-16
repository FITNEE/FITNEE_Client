import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from './colors';
import { Input, Title } from './Shared';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  flex: 1;
  background-color: #f3f3f3;
`;
const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
`;
const SubText = styled.Text`
  margin-top: 8px;
  font-size: 13px;
  width: 260px;
  line-height: 18px;
  font-weight: 400;
  color: ${colors.black};
`;
const BottomContainer = styled.View`
  margin-bottom: 334px;
  width: 100%;
`;
const GenderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const GenderView = styled.View`
  background-color: white;
  border-radius: 12px;
  height: 64px;
  padding: 16px;
  justify-content: center;
  width: 48%;
`;
const GenderText = styled.Text``;

const OnBoarding_3 = ({ route, navigation }) => {
  const [birthYear, setBirthYear] = useState('');
  return (
    <ScreenLayout>
      <TextContainer>
        <Title style={{ width: 220 }} numberOfLines={2}>
          맞춤 루틴 생성을 위해 10초만 내어주세요.
        </Title>
        <SubText numberOfLines={2}>
          출생년도와 성별, 간단한 신체정보를 입력하시면, 회원님께 딱 맞는 루틴을
          만나보실 수 있어요.
        </SubText>
      </TextContainer>
      <BottomContainer>
        <GenderContainer>
          <GenderView>
            <GenderText>여성</GenderText>
          </GenderView>
          <GenderView>
            <GenderText>남성</GenderText>
          </GenderView>
        </GenderContainer>
        <Input
          style={{ marginTop: 16 }}
          placeholderTextColor={colors.grey_3}
          autoFocus
          onSubmitEditing={() => console.log('submitted')}
          placeholder='태어난 년도'
          returnKeyType='done'
          blurOnSubmit={false}
          onChangeText={(text) => setBirthYear(text)}
        ></Input>
      </BottomContainer>
    </ScreenLayout>
  );
};

export default OnBoarding_3;
