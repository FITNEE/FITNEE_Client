import React, { useState } from 'react';
import styled from 'styled-components/native';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  flex: 1;
`;
const TextContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-bottom: 160px;
`;
const Title = styled.Text`
  font-size: 17px;
  font-weight: 800;
  color: #262626;
`;
const BottomContainer = styled.View`
  margin-top: 6px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ImageSize = 320;

const MyImage = styled.View`
  margin-top: 160px;
  width: ${ImageSize}px;
  aspect-ratio: 1/1;
  border-radius: ${ImageSize / 2}px;
  background-color: #ffffff;
`;

export const Input = styled.TextInput`
  padding: 15px 7px;
  border-radius: 4px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: white;
  font-weight: 800;
`;
export const Button = styled.TouchableOpacity`
  background-color: #0351ea;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 46px;
  border-radius: 22px;
  width: 46%;
  margin-bottom: 120px;
`;

const OnBoarding_1 = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const navigateTo2 = () => {
    navigation.navigate('OnBoarding_2', {
      email,
    });
  };
  return (
    <ScreenLayout>
      <Input
        placeholderTextColor='#84ADFF'
        autoFocus
        onSubmitEditing={() => navigateTo2()}
        placeholder='제목 입력'
        returnKeyType='next'
        blurOnSubmit={false}
        style={{ marginTop: 16 }}
        onChangeText={(text) => setEmail(text)}
      />
      <Button onPress={() => navigateTo2()}>
        <ButtonText style={{ color: 'white' }}>다음</ButtonText>
      </Button>
    </ScreenLayout>
  );
};

export default OnBoarding_1;
