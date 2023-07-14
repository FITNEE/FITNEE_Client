import React from 'react';
import styled from 'styled-components/native';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  background-color: #f3f3f3;
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

const OnBoarding_2 = ({ route, navigation }) => {
  return (
    <ScreenLayout>
      <Title>2</Title>
    </ScreenLayout>
  );
};

export default OnBoarding_2;
