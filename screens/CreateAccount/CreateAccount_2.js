import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Button, BackButton } from "../../Shared";
//prettier-ignore
import {Input,Title,ScreenLayout,SubText,NumberInput,MyBottomSheet, InputTitle} from "../../components/Shared/OnBoarding_Shared";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Keyboard, Pressable } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import Check from "../../assets/SVGs/Check.svg";
import axios from "axios";

const StatusText = styled.Text`
  font-size: 12px;
  width: 100%;
  text-align: right;
  margin-right: 8px;
  font-weight: 300;
  margin-top: 4px;
`;
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
  margin-bottom: 16px;
`;

const GenderButton = styled.TouchableOpacity`
  background-color: ${colors.white};
  flex-direction: row;
  border-radius: 12px;
  height: 56px;
  align-items: center;
  padding: 16px;
  justify-content: space-between;
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
  const [status, setStatus] = useState(0);
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

  const checkNick = async (nickname) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = "app/mypage/nickname";
      const queryStr = `?userNickName=${nickname}`;
      const response = await axios.get(url + detailAPI + queryStr);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleNickName = (nick) => {
    if (nick.length >= 4) {
      checkNick(nick).then((res) => {
        if (res.result == false) {
          //사용가능 && 글자수 4글자 이상
          setStatus(1);
          setNickname(nick);
        } else {
          setStatus(2); //중복된 닉네임
        }
      });
    } else if (nick.length == 0) {
      //글자수 4글자 이하
      setStatus(0);
    } else {
      //nickname이 비어있음
      setStatus(3);
    }
  };

  const statusTexts = [
    "",
    "사용 가능한 닉네임입니다.",
    "중복된 닉네임입니다.",
    "닉네임이 4글자 이상이여야합니다.",
  ];
  const hideModal = () => {
    setSnapPoints(["1%"]);
    setModalShown(false);
  };
  const popModal = () => {
    setSnapPoints(["40%"]);
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
            <InputTitle>닉네임</InputTitle>
            <Input
              style={
                status != 1 &&
                status != 0 && { borderWidth: 1, borderColor: colors.red }
              }
              placeholderTextColor={colors.grey_5}
              autoFocus
              onSubmitEditing={() => Keyboard.dismiss()}
              placeholder="닉네임"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(text) => handleNickName(text)}
            />
            <StatusText
              style={{ color: status != 1 ? colors.red : colors.green }}
            >
              {statusTexts[status]}
            </StatusText>
            <GenderContainer>
              <GenderButton
                style={
                  gender == 2 && {
                    backgroundColor: colors.l_sub_2,
                    borderColor: colors.l_main,
                    borderWidth: 1,
                  }
                }
                onPress={() => setGender(2)}
              >
                <GenderText style={gender == 2 && { color: colors.grey_8 }}>
                  여성
                </GenderText>
                {gender == 2 && (
                  <WithLocalSvg width={24} height={24} asset={Check} />
                )}
              </GenderButton>
              <GenderButton
                style={
                  gender == 1 && {
                    backgroundColor: colors.l_sub_2,
                    borderColor: colors.l_main,
                    borderWidth: 1,
                  }
                }
                onPress={() => setGender(1)}
              >
                <GenderText style={gender == 1 && { color: colors.grey_8 }}>
                  남성
                </GenderText>
                {gender == 1 && (
                  <WithLocalSvg width={24} height={24} asset={Check} />
                )}
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
            enabled={birthYear && gender != null && status == 1}
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
