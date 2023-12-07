import React, { useState, useRef, useEffect, useCallback, useMemo, useContext, createContext } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import {
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native'
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler';
import Dictionary_LeftTab from '../../components/Dictionary/Dictionary_LeftTab'
import Dictionary_Modal from '../../components/Dictionary/Dictionary_Modal'
import axios from 'axios'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { useRecoilValue } from 'recoil'
import LeftIcon from '../../assets/SVGs/Left.svg'
import AddIcon from '../../assets/SVGs/Add.svg'
import EditIcon from '../../assets/SVGs/Edit.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScreenLayout, ScreenWidth } from '../../Shared'
import { imagePath } from '../../imagePath'

const MyScrollView = Platform.OS === 'ios' ? BottomSheetScrollView : ScrollView;

export default function Dictionary_2({ navigation, route }) {
  const isDark = useRecoilValue(IsDarkAtom)

  const exerciseInfo = route.params.exercise

  const bottomModal = useRef()

  const snapPoints = useMemo(() => ['45%', '96%'], []) // modal이 가리는 화면 %
  const handleSnapPress = useCallback(() => bottomModal.current?.snapToIndex(1), [])

  const [isLoading, setIsLoading] = useState(true) // gif 로딩 완료 여부

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} pressBehavior="none" />, [])
  // 루틴 추가 말풍선
  const onPressAddRoutineBtn = () => {
    setIsBubbleOn(false)
    setIsModalVisible(true)
  }

  const [isModalVisible, setIsModalVisible] = useState(false)
  const changeModalVisibility = (newBool) => setIsModalVisible(newBool)

  const [isBubbleOn, setIsBubbleOn] = useState(false)
  const checkBubbleData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const data = keys.includes('Bubble')
      if (data !== null) {
        console.log(`Bubble already exists`)
        return false
      } else {
        const stringValue = JSON.stringify(true)
        console.log(`set new data for bubble (${stringValue})`)
        await AsyncStorage.setItem('Bubble', stringValue)
        return false
      }
      return null
    } catch (error) {
      console.error('Bubble Asynce Storage error', error)
    }
  }

  useEffect(() => {
    checkBubbleData().then((data) => {
      if (data !== null) setIsBubbleOn(data)
    })
  }, [])

  return (
    <ScreenLayout isDark={isDark} darkBack={colors.black} lightBack={colors.grey_1}>
      <TouchableWithoutFeedback onPressIn={() => setIsBubbleOn(false)}>
        <Container>
          <Dictionary_Modal
            isModalVisible={isModalVisible}
            changeModalVisibility={changeModalVisibility}
            exerciseName={exerciseInfo.name}
            exercisePart={exerciseInfo.parts}
            healthCategoryIdx={exerciseInfo.healthCategoryIdx}
          />
          <TopBtnContainer>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 40, height: 40 }}>
              <LeftIcon width={24} height={24} color={isDark ? colors.white : colors.black} />
            </TouchableOpacity>
          </TopBtnContainer>
          <ImageContainer style={{ paddingBottom: 20 }}>
            {isLoading ? <Loading color={colors.l_main} /> : null}
            <ExerciseImage
              onLoad={() => setIsLoading(false)}
              source={imagePath.path[exerciseInfo.healthCategoryIdx - 1]}
            />
          </ImageContainer>
          {isBubbleOn ? (
            <Bubble
              style={{
                backgroundColor: isDark ? `${colors.white}` : `${colors.grey_9}`,
              }}
            >
              <BubbleText
                style={{
                  color: isDark ? `${colors.grey_9}` : `${colors.white}`,
                }}
              >
                {`+ 버튼을 눌러 마이루틴에 해당\n운동을 추가해보세요!`}
              </BubbleText>
              <BubbleArrow
                style={{
                  borderTopColor: isDark ? `${colors.white}` : `${colors.grey_9}`,
                }}
              />
            </Bubble>
          ) : null}
          <BottomSheet
            ref={bottomModal}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            keyboardBehavior="extend"
            backdropComponent={renderBackdrop}
            backgroundStyle={{
              backgroundColor: isDark ? `${colors.grey_9}` : `${colors.white}`,
            }}
          >
            <DictionaryContainer>
              <TitleContainer>
                <NameContainer>
                  <AreaText
                    style={{
                      color: isDark ? `${colors.d_main}` : `${colors.l_main}`,
                    }}
                  >
                    {exerciseInfo.parts} | {exerciseInfo.muscle} | {exerciseInfo.equipment}
                  </AreaText>
                  <TitleWrapper>
                    <TitleText
                      style={{
                        color: isDark ? `${colors.white}` : `${colors.black}`,
                      }}
                    >
                      {exerciseInfo.name}
                    </TitleText>
                  </TitleWrapper>
                </NameContainer>
                <TouchableOpacity onPress={onPressAddRoutineBtn}>
                  <AddIcon width={40} height={40} color={isDark ? colors.d_sub_2 : colors.l_sub_2} />
                </TouchableOpacity>
              </TitleContainer>
              <Subtitle isDark={isDark}>올바른 운동 순서</Subtitle>
              <Dictionary_LeftTab exerciseName={exerciseInfo.name} />
            </DictionaryContainer>
          </BottomSheet>
        </Container>
      </TouchableWithoutFeedback>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
`
const TopBtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  height: 56px;
`
const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`
const ExerciseImage = styled.Image`
  width: 330px;
  height: 330px;
`
const DictionaryContainer = styled.View`
  flex: 1;
`
const TitleContainer = styled.View`
  height: 54px;
  margin: 24px;
  flex-direction: row;
  justify-content: space-between;
`
const NameContainer = styled.View`
  margin-right: 40px;
`
const AreaText = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 13px;
  line-height: 19.5px;
`
const TitleWrapper = styled.View``
const TitleText = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 24px;
  line-height: 33.6px;
`
const Subtitle = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 15px;
    padding-left: 24px;
    margin-top: 30px;
    color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const Bubble = styled.View`
  position: absolute;
  width: 154px;
  height: 50px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  bottom: 40%;
  right: 25px;
  z-index: 1;
`
const BubbleArrow = styled.View`
  position: absolute;
  width: 0;
  z-index: 1;
  top: 50px;
  right: 11px;
  height: 0;
  border: 8px solid transparent;
  border-bottom: 0;
`
const BubbleText = styled.Text`
  font-size: 11px;
  color: white;
  font-family: Pretendard-Regular;
  line-height: 16.5px;
`
const Loading = styled.ActivityIndicator`
  color: ${colors.l_main};
  position: absolute;
  top: 50%;
  width: 100%;
`
