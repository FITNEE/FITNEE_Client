import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { colors } from './colors';
import { Button, Input, ScreenWidth, Title } from './Shared';
import { WithLocalSvg } from 'react-native-svg';
import BMIImg from './assets/SVGs/BMI.svg';

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
  margin-top: 8px;
  font-size: 13px;
  width: 260px;
  line-height: 18px;
  font-weight: 400;
  color: ${colors.black};
`;
const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
`;

const SubText = styled.Text`
  font-size: 12px;
  margin-left: 8px;
  font-weight: 300;
  margin-top: 24px;
  color: ${colors.grey_4};
`;

const BottomContainer = styled.View`
  margin-bottom: 80px;
  width: 100%;
`;

const BMIContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const BMIIndicator = styled.View`
  width: 100%;
  z-index: 99;
`;
const BMILine = styled.View`
  height: 19px;
  width: 1px;
  margin-left: 9px;
  border: 1px dashed black;
`;

const PointRadius = 10;
const TextBoxHeight = 56;
const lineHeight = 19;

const BMIMarkerContainer = styled.View`
  position: absolute;
  top: ${-lineHeight}px;
`;

const BMIPointer = styled.View`
  background-color: #363636;
  border-radius: ${PointRadius}px;
  height: ${PointRadius * 2}px;
  width: ${PointRadius * 2}px;
`;

const BMIView = styled.View`
  position: absolute;
  border-radius: 14px;
  width: 124px;
  height: ${TextBoxHeight}px;
  justify-content: center;
  align-items: center;
  background-color: #363636;
  margin-left: ${-62 + PointRadius}px;
  top: ${-lineHeight - TextBoxHeight}px;
`;
const BMITitle = styled.Text`
  font-size: 12px;
  color: #9747ff;
`;
const BMIText = styled.Text`
  font-size: 12px;
  margin-top: 4px;
  color: white;
`;

const OnBoarding_4 = ({ route, navigation }) => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [BMI, setBMI] = useState(0);

  const email = route.params.email;
  const PW = route.params.PW;
  const birthYear = route.params.birthYear;
  const handleSubmit = () => {
    navigation.navigate('OnBoarding_5', {
      email,
      PW,
      birthYear,
      height,
      weight,
    });
  };
  useEffect(() => {
    const heightInM = height / 100;
    setBMI(weight / (heightInM ^ 2));
  }, [height, weight]);

  return (
    <ScreenLayout>
      <TextContainer>
        <Title>마지막 단계에요!</Title>
        <SubTitle>{`회원님의 신체 정보를 입력해주세요.
딱 맞는 루틴 생성을 위해 꼭 필요한 정보에요.`}</SubTitle>
      </TextContainer>
      <BottomContainer>
        <SubText>키(cm)</SubText>
        <Input
          style={{ marginTop: 4 }}
          placeholderTextColor={colors.grey_5}
          autoFocus
          placeholder='키'
          returnKeyType='next'
          blurOnSubmit={false}
          onChangeText={(text) => setHeight(text)}
        />
        <SubText>몸무게(kg)</SubText>
        <Input
          style={{ marginTop: 4 }}
          placeholderTextColor={colors.grey_5}
          onSubmitEditing={() => handleSubmit()}
          placeholder='몸무게'
          returnKeyType='done'
          blurOnSubmit={false}
          onChangeText={(text) => setWeight(text)}
        />
      </BottomContainer>
      <BMIContainer>
        <BMIIndicator>
          <BMIView style={{ left: `${(BMI - 15) * 4}%` }}>
            <BMITitle>BMI {BMI.toFixed(1)}</BMITitle>
            <BMIText>정상 체중이에요</BMIText>
          </BMIView>
          <BMIMarkerContainer style={{ left: `${(BMI - 15) * 4}%` }}>
            <BMILine />
            <BMIPointer />
          </BMIMarkerContainer>
        </BMIIndicator>
        <WithLocalSvg width={ScreenWidth * 0.9} height={40} asset={BMIImg} />
      </BMIContainer>
      <Button enabled={height && weight} onPress={() => handleSubmit()} />
    </ScreenLayout>
  );
};

export default OnBoarding_4;
