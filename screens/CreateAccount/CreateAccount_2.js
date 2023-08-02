import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Button, BackButton } from "../../Shared";
//prettier-ignore
import {Input,Title,ScreenLayout,SubText,NumberInput,MyBottomSheet} from "../../components/Shared/OnBoarding_Shared";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Pressable } from "react-native";

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
  margin-top: 16px;
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
  const [nickname, setNickname] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState(null);
  const [timerData, setTimerData] = useState([]);
  const bottomModal = useRef();
  const [modalShown, setModalShown] = useState(false);
  const [snapPoints, setSnapPoints] = useState(["1%"]);
  const email = route.params.email;
  const PW = route.params.PW;

  const handlePress = () => {
    navigation.navigate("CreateAccount_3", {
      email,
      PW,
      nickname,
      gender,
      birthYear,
    });
  };

  const hideModal = () => {
    setSnapPoints(["1%"]);
    setModalShown(false);
  };
  const popModal = () => {
    setSnapPoints(["34%"]);
    setModalShown(true);
  };
  const onPressBottomModal = () => bottomModal.current?.present();

  useEffect(() => {
    let data = [];
    for (var i = 1960; i < 2023; i++) {
      data.push(i);
    }
    setTimerData(data);
    onPressBottomModal();
  }, []);

  return (
    <BottomSheetModalProvider>
      <Pressable
        style={{ width: "100%", height: "100%" }}
        onPress={() => hideModal()}
      >
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
            <SubText style={{ margin: 8, color: colors.grey_7 }}>
              닉네임
            </SubText>
            <Input
              placeholderTextColor={colors.grey_5}
              autoFocus
              onSubmitEditing={() => popModal()}
              placeholder="닉네임"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(text) => setNickname(text)}
            />
            <GenderContainer>
              <GenderButton
                style={gender == 2 && { backgroundColor: colors.l_sub_1 }}
                onPress={() => setGender(2)}
              >
                <GenderText style={gender == 0 && { color: colors.grey_8 }}>
                  여성
                </GenderText>
              </GenderButton>
              <GenderButton
                style={gender == 1 && { backgroundColor: colors.l_sub_1 }}
                onPress={() => setGender(1)}
              >
                <GenderText style={gender == 0 && { color: colors.grey_8 }}>
                  남성
                </GenderText>
              </GenderButton>
            </GenderContainer>
            <NumberInput
              value={birthYear}
              onPress={() => popModal()}
              placeholder="태어난 년도"
              active={modalShown}
            />
          </BottomContainer>
          <Button
            enabled={birthYear && gender != null && nickname}
            onPress={() => handlePress()}
          />
          <MyBottomSheet
            setValue={setBirthYear}
            selectableDatas={timerData}
            modalRef={bottomModal}
            snapPoints={snapPoints}
            defaultVal="2000"
            hideFunc={() => hideModal()}
          />
        </ScreenLayout>
      </Pressable>
    </BottomSheetModalProvider>
  );
};

export default CreateAccount_2;
