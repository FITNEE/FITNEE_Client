import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '../../colors';
import { Button, BackButton } from '../../Shared';
import {
  Input,
  Title,
  ScreenLayout,
  SubText,
} from '../../components/Shared/OnBoarding_Shared';

const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
`;

const BottomContainer = styled.View`
  margin-top: 24px;
  width: 100%;
  flex: 1;
`;

const GenderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const GenderButton = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-radius: 12px;
  height: 56px;
  padding: 16px;
  justify-content: center;
  width: 48%;
`;

const GenderText = styled.Text``;

const CreateAccount_2 = ({ route, navigation }) => {
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState(null);

  const email = route.params.email;
  const PW = route.params.PW;
  const handlePress = () => {
    navigation.navigate('CreateAccount_3', {
      email,
      PW,
      birthYear,
    });
  };
  return (
    <ScreenLayout>
      <BackButton onPress={() => navigation.goBack()} />
      <TextContainer>
        <Title>
          {`맞춤 루틴 생성을 위해 
10초만 내어주세요.`}
        </Title>
        <SubText numberOfLines={2}>
          {`출생년도와 성별, 간단한 신체정보를 입력하시면, 
회원님께 딱 맞는 루틴을 만나보실 수 있어요.`}
        </SubText>
      </TextContainer>
      <BottomContainer>
        <GenderContainer>
          <GenderButton
            style={gender == 1 && { backgroundColor: colors.l_sub_1 }}
            onPress={() => setGender(1)}
          >
            <GenderText style={gender == 0 && { color: colors.grey_8 }}>
              여성
            </GenderText>
          </GenderButton>
          <GenderButton
            style={gender == 0 && { backgroundColor: colors.l_sub_1 }}
            onPress={() => setGender(0)}
          >
            <GenderText style={gender == 0 && { color: colors.grey_8 }}>
              남성
            </GenderText>
          </GenderButton>
        </GenderContainer>
        <Input
          keyboardType='numeric'
          style={{ marginTop: 16 }}
          placeholderTextColor={colors.grey_5}
          autoFocus
          onSubmitEditing={() => handlePress()}
          placeholder='태어난 년도'
          returnKeyType='done'
          blurOnSubmit={false}
          onChangeText={(text) => setBirthYear(text)}
        ></Input>
      </BottomContainer>
      <Button
        enabled={birthYear.length == 4 && gender != null}
        onPress={() => handlePress()}
      />
    </ScreenLayout>
  );
};

export default CreateAccount_2;
