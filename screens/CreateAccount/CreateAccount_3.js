import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { Button, BackButton } from '../../Shared'
//prettier-ignore
import {Title,SubText, ScreenKeyboardLayout,NumberInput,MyBottomSheet, InputTitle} from "../../components/Shared/OnBoarding_Shared";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { View } from 'react-native'
import Terms from '../../components/Terms'

const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
`

const BottomContainer = styled.View`
  flex: 1;
  margin-top: 22px;
  width: 100%;
`
const BMIBarBase = styled.View`
  flex-direction: row;
  width: 100%;
`
const BMIBar = styled.View`
  border: 1px solid;
  height: 18px;
`
const BMISection = styled.View`
  flex-direction: column;
`
const BMIContainer = styled.View`
  position: absolute;
  bottom: 24%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const BMINumber = styled.Text`
  font-size: 10px;
  font-family: Pretendard-Regular;
`
const BMINumberContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

const BMILine = styled.View`
  height: 19px;
  width: 1px;
  margin-left: 9px;
  border: 1px dashed ${colors.black};
`

const PointRadius = 10
const TextBoxHeight = 56
const lineHeight = 19

const BMIMarkerBottom = styled.View`
  position: absolute;
  top: ${-lineHeight}px;
`

const BMIPointer = styled.View`
  background-color: ${colors.black};
  border-radius: ${PointRadius}px;
  height: ${PointRadius * 2}px;
  width: ${PointRadius * 2}px;
`

const BMIMarkerTop = styled.View`
  position: absolute;
  border-radius: 14px;
  width: 124px;
  height: ${TextBoxHeight}px;
  justify-content: center;
  align-items: center;
  margin-left: ${-62 + PointRadius}px;
  top: ${-lineHeight - TextBoxHeight}px;
`
const BMITitle = styled.Text`
  font-family: Pretendard-Bold;
  font-size: 13px;
`
const BMIText = styled.Text`
  font-size: 11px;
  font-family: Pretendard-Regular;
  margin-top: 4px;
`

const InnerBottomSheet = styled.View`
  flex: 1;
  background-color: ${colors.white};
`

export const BMIBase = ({ BMIMode, isDark }) => {
  return (
    <BMIBarBase>
      <BMISection
        style={{
          flex: 1,
        }}
      >
        <BMIBar
          style={{
            borderColor: isDark ? colors.grey_9 : colors.grey_1,
            backgroundColor: BMIMode == 1 ? colors.blue : isDark ? colors.grey_8 : colors.grey_2,
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
            borderColor: isDark ? colors.grey_9 : colors.grey_1,
            backgroundColor: BMIMode == 2 ? colors.green : isDark ? colors.grey_7 : colors.grey_3,
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
            borderColor: isDark ? colors.grey_9 : colors.grey_1,
            backgroundColor: BMIMode == 3 ? colors.green : isDark ? colors.grey_6 : colors.grey_4,
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
            borderColor: isDark ? colors.grey_9 : colors.grey_1,
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
  )
}

const CreateAccount_3 = ({ route, navigation }) => {
  const isDark = useRecoilValue(IsDarkAtom)
  const [height, setHeight] = useState(0)
  const [heights, setHeights] = useState([])
  const [weight, setWeight] = useState(0)
  const [weights, setWeights] = useState([])
  const [mode, setMode] = useState(0)
  const [snapPoints, setSnapPoints] = useState(['46%'])

  const [BMIMode, setBMIMode] = useState(0)
  const [BMI, setBMI] = useState(0)
  const bottomModal = useRef()

  const hideModal = () => {
    bottomModal.current.close()
    setMode(null)
  }
  const popModal = (id) => {
    bottomModal.current?.snapToIndex(0)
    setMode(id)
  }
  const email = route.params.email
  const PW = route.params.PW
  const nickname = route.params.nickname
  const birthYear = route.params.birthYear
  const gender = route.params.gender

  const handleSubmit = () => {
    navigation.navigate('CreateAccount_4', {
      email,
      PW,
      nickname,
      birthYear,
      height,
      gender,
      weight,
    })
  }
  const statusText = ['저체중입니다', '정상 체중입니다', '과체중입니다', '운동이 꼭 필요해요']
  useEffect(() => {
    let data = []
    for (var i = 141; i < 200; i++) {
      data.push(i)
    }
    setHeights(data)
    data = []
    for (var i = 31; i < 110; i++) {
      data.push(i)
    }
    setWeights(data)
  }, [])

  useEffect(() => {
    const heightInM = height / 100
    const BMIValue = weight / (heightInM ^ 2)
    setBMI(BMIValue)
    if (BMIValue == 0) {
      setBMIMode(0)
    } else if (BMIValue < 18.5) {
      setBMIMode(1)
    } else if (BMIValue < 23) {
      setBMIMode(2)
    } else if (BMIValue < 25) {
      setBMIMode(3)
    } else {
      setBMIMode(4)
    }
  }, [height, weight])

  const processedBMI =
    BMI == 0
      ? -100
      : BMI < 18.5
      ? ((BMI - 10) / 8.5) * 16
      : BMI < 23
      ? 16 + ((BMI - 18.5) / 4.5) * 32
      : BMI < 25
      ? 48 + ((BMI - 23) / 2) * 16
      : 64 + ((BMI - 25) / 15) * 32

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: '100%',
      zIndex: 99,
      left: withSpring(`${processedBMI}%`, {
        mass: 1,
        damping: 32,
        stiffness: 180,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
      }),
    }
  }, [mode])
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} opacity={0.1} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    [],
  )

  // 키, 몸무게 입력 후 확인버튼 누르면 bottom sheet 뜨게
  const clickToRule = () => ruleBottomRef.current?.snapToIndex(0)
  const ruleBottomRef = useRef()
  const ruleSnapPoints = useMemo(() => ['45%'], [])
  const renderRuleBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} pressBehavior="none" />, [])

  return (
    <ScreenKeyboardLayout onPress={() => hideModal()} isDark={isDark}>
      <BackButton isDark={isDark} onPress={() => navigation.goBack()} />
      <TextContainer>
        <Title text="마지막 단계에요!" isDark={isDark} />
        <SubText
          text={`회원님의 신체 정보를 입력해주세요.
딱 맞는 루틴 생성을 위해 꼭 필요한 정보에요.`}
          isDark={isDark}
        />
      </TextContainer>
      <BottomContainer>
        <InputTitle>키(cm)</InputTitle>
        <NumberInput isDark={isDark} value={height} onPress={() => popModal(1)} placeholder="키" active={mode == 1} />
        <InputTitle style={{ marginTop: 16 }}>몸무게 (kg)</InputTitle>
        <NumberInput
          isDark={isDark}
          value={weight}
          onPress={() => popModal(2)}
          placeholder="몸무게"
          active={mode == 2}
        />
      </BottomContainer>
      <BMIContainer>
        <Animated.View style={animatedStyle}>
          <BMIMarkerTop
            style={{
              backgroundColor: isDark ? colors.white : colors.black,
            }}
          >
            <BMITitle
              style={{
                color:
                  BMIMode == 1 ? colors.blue : BMIMode == 2 ? colors.green : BMIMode == 3 ? colors.green : colors.red,
              }}
            >
              BMI {BMI.toFixed(1)}
            </BMITitle>
            <BMIText style={{ color: isDark ? colors.black : colors.white }}>{statusText[BMIMode - 1]}</BMIText>
          </BMIMarkerTop>
          <BMIMarkerBottom>
            <BMILine style={{ borderColor: isDark ? colors.white : colors.black }} />
            <BMIPointer
              style={{
                backgroundColor: isDark ? colors.white : colors.black,
              }}
            />
          </BMIMarkerBottom>
        </Animated.View>
        <BMIBase isDark={isDark} BMIMode={BMIMode} />
      </BMIContainer>
      <Button isDark={isDark} enabled={height && weight} onPress={clickToRule} />
      <BottomSheet
        ref={bottomModal}
        backdropComponent={renderBackdrop}
        index={-1}
        backgroundComponent={() => <View />}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleHeight={0}
        enableDismissOnClose
        handleIndicatorStyle={{ height: 0 }}
      >
        <MyBottomSheet
          isDark={isDark}
          setValue={mode == 1 ? setHeight : setWeight}
          selectableDatas={mode == 1 ? heights : weights}
          modalRef={bottomModal}
          snapPoints={snapPoints}
          defaultVal={mode == 1 ? 170 : 60}
          hideFunc={() => hideModal()}
          nextFunc={mode == 1 ? () => setMode(2) : () => hideModal()}
        />
      </BottomSheet>
      <BottomSheet
        ref={ruleBottomRef}
        index={-1}
        snapPoints={ruleSnapPoints} // bottom sheet가 화면을 얼마나 가릴지 비율 설정
        enablePanDownToClose={false} // 사라지지 않게
        backdropComponent={renderRuleBackdrop}
        backgroundStyle={{
          backgroundColor: isDark ? `${colors.grey_9}` : `${colors.white}`,
        }}
      >
        <InnerBottomSheet>
          <Terms handleSubmit={handleSubmit} navigation={navigation} />
        </InnerBottomSheet>
      </BottomSheet>
    </ScreenKeyboardLayout>
  )
}

export default CreateAccount_3
