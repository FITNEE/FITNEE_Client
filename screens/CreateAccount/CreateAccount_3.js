import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Button, ScreenWidth, BackButton } from "../../Shared";
//prettier-ignore
import {Title,ScreenLayout,NumberInput,MyBottomSheet, InputTitle} from "../../components/Shared/OnBoarding_Shared";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

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

const BottomContainer = styled.View`
  flex: 1;
  margin-top: 22px;
  width: 100%;
`;
const BMIBarBase = styled.View`
  flex-direction: row;
  width: 100%;
`;
const BMIBar = styled.View`
  border: 1px solid ${colors.grey_1};
  height: 18px;
`;
const BMISection = styled.View`
  flex-direction: column;
`;
const BMIContainer = styled.View`
  position: absolute;
  bottom: 16%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const BMINumber = styled.Text`
  font-size: 10px;
  font-weight: 400;
`;
const BMINumberContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const BMILine = styled.View`
  height: 19px;
  width: 1px;
  margin-left: 9px;
  border: 1px dashed ${colors.black};
`;

const PointRadius = 10;
const TextBoxHeight = 56;
const lineHeight = 19;

const BMIMarkerBottom = styled.View`
  position: absolute;
  top: ${-lineHeight}px;
`;

const BMIPointer = styled.View`
  background-color: ${colors.black};
  border-radius: ${PointRadius}px;
  height: ${PointRadius * 2}px;
  width: ${PointRadius * 2}px;
`;

const BMIMarkerTop = styled.View`
  position: absolute;
  border-radius: 14px;
  width: 124px;
  height: ${TextBoxHeight}px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black};
  margin-left: ${-62 + PointRadius}px;
  top: ${-lineHeight - TextBoxHeight}px;
`;
const BMITitle = styled.Text`
  font-size: 12px;
`;
const BMIText = styled.Text`
  font-size: 12px;
  margin-top: 4px;
  color: white;
`;

export const BMIBase = ({ BMIMode }) => {
  return (
    <BMIBarBase>
      <BMISection
        style={{
          flex: 1,
        }}
      >
        <BMIBar
          style={{
            backgroundColor: BMIMode == 1 ? colors.blue : colors.grey_2,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        />
        <BMINumber>10</BMINumber>
      </BMISection>
      <BMISection
        style={{
          flex: 2,
        }}
      >
        <BMIBar
          style={{
            backgroundColor: BMIMode == 2 ? colors.green : colors.grey_3,
          }}
        />
        <BMINumber>18.5</BMINumber>
      </BMISection>
      <BMISection
        style={{
          flex: 1,
        }}
      >
        <BMIBar
          style={{
            backgroundColor: BMIMode == 3 ? colors.green : colors.grey_4,
          }}
        />
        <BMINumber>23</BMINumber>
      </BMISection>
      <BMISection
        style={{
          flex: 2,
        }}
      >
        <BMIBar
          style={{
            backgroundColor: BMIMode == 4 ? colors.red : colors.grey_4,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
        />
        <BMINumberContainer>
          <BMINumber>25</BMINumber>
          <BMINumber>40</BMINumber>
        </BMINumberContainer>
      </BMISection>
    </BMIBarBase>
  );
};

const CreateAccount_3 = ({ route, navigation }) => {
  const [height, setHeight] = useState(0);
  const [heights, setHeights] = useState([]);
  const [weight, setWeight] = useState(0);
  const [weights, setWeights] = useState([]);
  const [mode, setMode] = useState(0);
  const [snapPoints, setSnapPoints] = useState(["1%"]);
  const [modalShown, setModalShown] = useState(false);

  const [BMIMode, setBMIMode] = useState(0);
  const [BMI, setBMI] = useState(0);
  const bottomModal = useRef();

  console.log("modalShown:", modalShown);
  const hideModal = () => {
    setModalShown(false);
    setMode(null);
  };
  const popModal = (id) => {
    setModalShown(true);
    setMode(id);
  };
  const email = route.params.email;
  const PW = route.params.PW;
  const nickname = route.params.nickname;
  const birthYear = route.params.birthYear;
  const gender = route.params.gender;

  const handleSubmit = () => {
    navigation.navigate("CreateAccount_4", {
      email,
      PW,
      nickname,
      birthYear,
      height,
      gender,
      weight,
    });
  };

  const statusText = [
    "저체중입니다",
    "정상 체중입니다",
    "과체중입니다",
    "운동이 꼭 필요해요",
  ];

  const onPressBottomModal = () => bottomModal.current?.present();

  useEffect(() => {
    let data = [];
    for (var i = 141; i < 200; i++) {
      data.push(i);
    }
    setHeights(data);
    data = [];
    for (var i = 31; i < 110; i++) {
      data.push(i);
    }
    setWeights(data);
  }, []);

  useEffect(() => {
    onPressBottomModal();
    if (modalShown == true) {
      setSnapPoints(["40%"]);
    } else {
      setSnapPoints(["1%"]);
    }
  }, [modalShown]);

  useEffect(() => {
    const heightInM = height / 100;
    const BMIValue = weight / (heightInM ^ 2);
    setBMI(BMIValue);
    if (BMIValue == 0) {
      setBMIMode(0);
    } else if (BMIValue < 18.5) {
      setBMIMode(1);
    } else if (BMIValue < 23) {
      setBMIMode(2);
    } else if (BMIValue < 25) {
      setBMIMode(3);
    } else {
      setBMIMode(4);
    }
  }, [height, weight]);

  const processedBMI =
    BMI == 0
      ? -100
      : BMI < 18.5
      ? ((BMI - 10) / 8.5) * 16
      : BMI < 23
      ? 16 + ((BMI - 18.5) / 4.5) * 32
      : BMI < 25
      ? 48 + ((BMI - 23) / 2) * 16
      : 64 + ((BMI - 25) / 15) * 32;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      zIndex: 99,
      left: withSpring(`${processedBMI}%`),
    };
  }, [modalShown]);

  return (
    <BottomSheetModalProvider>
      <Pressable
        style={{ width: "100%", height: "100%" }}
        onPress={() => hideModal()}
      >
        <ScreenLayout>
          <BackButton onPress={() => navigation.goBack()} />
          <TextContainer>
            <Title>마지막 단계에요!</Title>
            <SubTitle>{`회원님의 신체 정보를 입력해주세요.
딱 맞는 루틴 생성을 위해 꼭 필요한 정보에요.`}</SubTitle>
          </TextContainer>
          <BottomContainer>
            <InputTitle>키(cm)</InputTitle>
            <NumberInput
              value={height}
              onPress={() => popModal(1)}
              placeholder="키"
              active={mode == 1}
            />
            <InputTitle style={{ marginTop: 16 }}>몸무게 (kg)</InputTitle>
            <NumberInput
              value={weight}
              onPress={() => popModal(2)}
              placeholder="몸무게"
              active={mode == 2}
            />
          </BottomContainer>
          <BMIContainer>
            <Animated.View style={animatedStyle}>
              <BMIMarkerTop>
                <BMITitle
                  style={{
                    color:
                      BMIMode == 1
                        ? colors.blue
                        : BMIMode == 2
                        ? colors.green
                        : BMIMode == 3
                        ? colors.green
                        : colors.red,
                  }}
                >
                  BMI {BMI.toFixed(1)}
                </BMITitle>
                <BMIText>{statusText[BMIMode - 1]}</BMIText>
              </BMIMarkerTop>
              <BMIMarkerBottom>
                <BMILine />
                <BMIPointer />
              </BMIMarkerBottom>
            </Animated.View>
            <BMIBase BMIMode={BMIMode} />
          </BMIContainer>
          <Button enabled={height && weight} onPress={() => handleSubmit()} />
          <MyBottomSheet
            setValue={mode == 1 ? setHeight : setWeight}
            selectableDatas={mode == 1 ? heights : weights}
            modalRef={bottomModal}
            snapPoints={snapPoints}
            defaultVal={mode == 1 ? 170 : 60}
            hideFunc={() => hideModal()}
            nextFunc={mode == 1 ? () => setMode(2) : () => hideModal()}
          />
        </ScreenLayout>
      </Pressable>
    </BottomSheetModalProvider>
  );
};

export default CreateAccount_3;
