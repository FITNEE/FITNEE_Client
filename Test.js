import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { Picker, DatePicker } from 'react-native-wheel-pick';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Button } from './Shared';
import Text from 'react-native';
export default function Test({ navigation }) {
  let data = [];
  for (var i = 0; i < 100; i++) {
    data.push(i);
  }
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['48%'];
  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };
  return (
    <BottomSheetModalProvider>
      <Container>
        <StackBar>
          <StackBarPin />
        </StackBar>
        <Button onPress={handlePresentModal}></Button>
        <Picker
          style={{
            backgroundColor: 'white',
            width: 288,
            height: 200,
            marginBottom: 130,
            borderRadius: 20,
          }}
          selectedValue='50'
          pickerData={data}
          onValueChange={(value) => {
            console.log(value);
          }}
        />
        <BottomSheetModal>
          <Text>Hello</Text>
        </BottomSheetModal>
      </Container>
    </BottomSheetModalProvider>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const StackBar = styled.View`
  width: 90%;
  height: 10px;
  background-color: #dddddd;
  margin-top: 10px;
  border-radius: 10px;
`;
const StackBarPin = styled.View`
  width: 50%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`;
const TitleContainer = styled.View`
  width: 90%;
  margin-bottom: 60px;
`;
const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;
const SubTitle = styled.Text`
  font-size: 15px;
  margin-top: 10px;
`;
const WeightContainer = styled.View`
  width: 288px;
  height: 200px;
  margin-bottom: 100px;
  background-color: white;
  border-radius: 20px;
`;
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
  border-radius: 10px;
  margin-bottom: 50px;
`;
const ButtonText = styled.Text``;
