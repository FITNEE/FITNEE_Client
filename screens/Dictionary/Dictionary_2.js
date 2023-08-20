import React, { useState, useRef, useEffect, useCallback, useMemo, useContext, createContext } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { TouchableOpacity, Dimensions, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import Dictionary_LeftTab from '../../components/Dictionary/Dictionary_LeftTab'
import Dictionary_RightTab from '../../components/Dictionary/Dictionary_RightTab'
import Dictionary_Modal from '../../components/Dictionary/Dictionary_Modal'
import axios from 'axios'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { useRecoilValue } from 'recoil'
import LeftIcon from '../../assets/SVGs/Left.svg'
import AddIcon from '../../assets/SVGs/Add.svg'
import EditIcon from '../../assets/SVGs/Edit.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScreenLayout } from '../../Shared'

export default function Dictionary_2({ navigation, route }) {
    const isDark = useRecoilValue(IsDarkAtom)

    const exerciseInfo = route.params.exercise

    const leftTab = useRef()
    const rightTab = useRef()
    const bottomModal = useRef()

    const snapPoints = useMemo(() => ['45%', '96%'], []) // modal이 가리는 화면%

    // LeftTab 누르면 leftTabActivate = true
    const [leftTabActivate, setLeftTabActivate] = useState(true)
    const onTabPress = (target) => {
        setIsBubbleOn(false)
        target === leftTab ? setLeftTabActivate(true) : setLeftTabActivate(false)
    }
    const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} />, [])
    // 루틴 추가 말풍선
    const onPressAddRoutineBtn = () => {
        setIsBubbleOn(false)
        setIsModalVisible(true)
    }

    // RightTab에서 쓰이는 JoinBtnBool, 읽지 않음 버튼
    const [joinBtnBool, setJoinBtnBool] = useState(true) // 참여하기 버튼 나타내기
    const parentSetJoinBtnBool = (newBool) => setJoinBtnBool(newBool)
    const [isAllRead, setIsAllRead] = useState(true)
    const changeRead = (newBool) => setIsAllRead(newBool)

    const [isModalVisible, setIsModalVisible] = useState(false)
    const changeModalVisibility = (newBool) => setIsModalVisible(newBool)

    const getReadInfo = async () => {
        try {
            let url = 'https://gpthealth.shop/'
            let detailAPI = '/app/dictionary/readInfo'
            const response = await axios.get(url + detailAPI, {
                params: {
                    name: exerciseInfo.name,
                },
            })
            const result = response.data
            return result.result
        } catch (error) {
            console.error('Failed to fetch data:', error)
        }
    }
    useEffect(() => {
        getReadInfo().then((result) => {
            if (result.chatExist.chatExists == 0) {
                console.log(`채팅 내역 존재 X`)
                setIsAllRead(true)
            } else {
                if (result.informationRows.hasUnreadChats == 1) {
                    setIsAllRead(false)
                    console.log(`안 읽은 채팅 있음`)
                } else {
                    setIsAllRead(true)
                    console.log(`안 읽은 채팅 없음`)
                }
            }
        })
    })

    useEffect(() => {
        getReadInfo().then((result) => {
            if (result.chatExist.chatExists == 0) {
                console.log(`채팅 내역 존재 X`)
                setIsAllRead(true)
            } else {
                if (result.informationRows.hasUnreadChats == 1) {
                    setIsAllRead(false)
                    console.log(`안 읽은 채팅 있음`)
                } else {
                    setIsAllRead(true)
                    console.log(`안 읽은 채팅 없음`)
                }
            }
        })
    }, [])

    const [isBubbleOn, setIsBubbleOn] = useState(false)
    const checkBubbleData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            const data = keys.includes('Bubble')
            if (data !== null) {
                const bubbleData = await AsyncStorage.getItem('Bubble')
                console.log(`set new data for bubble (true)`)
                const bubbleBool = JSON.parse(bubbleData)
                return bubbleBool
            } else {
                const stringValue = JSON.stringify(true)
                console.log(`no existing data - setItem for true`)
                await AsyncStorage.setItem('Bubble', stringValue)
            }
            return null
        } catch (error) {
            console.error('Bubble Asynce Storage error', error)
        }
    }

    useEffect(() => {
        checkBubbleData().then((data) => {
            if (data !== null) {
                setIsBubbleOn(data)
                console.log(`data : ${data}`)
            }
        })
    }, [])

    const setBubbleFalse = async () => {
        const stringValue = JSON.stringify(false)
        await AsyncStorage.setItem('Bubble', stringValue)
    }
    useEffect(() => {
        !isBubbleOn && setBubbleFalse().then(console.log('set bubble for false'))
    }, [isBubbleOn])

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
                    <ImageContainer>
                        <ExerciseImage
                            // source={require("../../assets/GIFs/Test.gif")}
                            resizeMode="cover"
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
                            <TabContainer
                                style={{
                                    borderBottomColor: isDark ? `${colors.grey_8}` : `${colors.grey_1}`,
                                }}
                            >
                                <LeftTab
                                    ref={leftTab}
                                    style={
                                        leftTabActivate
                                            ? {
                                                  borderBottomColor: `${isDark ? colors.d_main : colors.l_main}`,
                                              }
                                            : {
                                                  borderBottomColor: `${isDark ? colors.grey_8 : colors.grey_1}`,
                                              }
                                    }
                                    onPressIn={() => onTabPress(leftTab)}
                                >
                                    <TabText
                                        style={{
                                            color: isDark ? `${colors.white}` : `${colors.black}`,
                                            fontFamily: leftTabActivate ? 'Pretendard-SemiBold' : 'Pretendard-Regular',
                                        }}
                                    >
                                        운동 방법
                                    </TabText>
                                </LeftTab>
                                <RightTab
                                    ref={rightTab}
                                    style={
                                        leftTabActivate
                                            ? {
                                                  borderBottomColor: `${isDark ? colors.grey_8 : colors.grey_1}`,
                                              }
                                            : {
                                                  borderBottomColor: `${isDark ? colors.d_main : colors.l_main}`,
                                              }
                                    }
                                    onPressIn={() => onTabPress(rightTab)}
                                >
                                    <TabText
                                        style={{
                                            color: isDark ? `${colors.white}` : `${colors.black}`,
                                            fontFamily: leftTabActivate ? 'Pretendard-Regular' : 'Pretendard-SemiBold',
                                        }}
                                    >
                                        채팅
                                    </TabText>
                                    {isAllRead ? null : <NotReadDot />}
                                </RightTab>
                            </TabContainer>
                            {leftTabActivate ? (
                                <Dictionary_LeftTab exerciseName={exerciseInfo.name} />
                            ) : (
                                <Dictionary_RightTab
                                    parentJoinBtnBool={joinBtnBool}
                                    parentSetJoinBtnBool={parentSetJoinBtnBool}
                                    exerciseName={exerciseInfo.name}
                                    leftTabActivate={leftTabActivate}
                                    setIsAllRead={changeRead}
                                />
                            )}
                        </DictionaryContainer>
                    </BottomSheet>
                    {!leftTabActivate && joinBtnBool ? (
                        <JoinBtnContainer
                            onPress={() => setJoinBtnBool(false)}
                            style={{
                                backgroundColor: isDark ? `${colors.d_main}` : `${colors.l_main}`,
                            }}
                        >
                            <EditIcon
                                width={20}
                                height={20}
                                style={{ marginRight: 8 }}
                                color={isDark ? `${colors.black}` : `${colors.white}`}
                            />
                            <JoinText
                                style={{
                                    color: isDark ? `${colors.black}` : `${colors.white}`,
                                }}
                            >
                                채팅 참여하기
                            </JoinText>
                        </JoinBtnContainer>
                    ) : null}
                </Container>
            </TouchableWithoutFeedback>
        </ScreenLayout>
    )
}

const SCREEN_WIDTH = Dimensions.get('screen').width
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
    height: 326px;
    justify-content: center;
    align-items: center;
`
const ExerciseImage = styled.Image`
    background-color: ${colors.grey_4};
    /* width: 100%; */
    width: 301px;

    height: 301px;
`
const DictionaryContainer = styled.View`
    flex: 1;
`
const TitleContainer = styled.View`
    height: 54px;
    margin: 24px 24px;
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
    /* display: block; */
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
const TabContainer = styled.View`
    margin-top: 8px;
    height: 45px;
    border-bottom-width: 1px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`
const LeftTab = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    border-bottom-width: 1px;

    left: 24px;
    z-index: 1;
    position: absolute;
    width: 155.5px;
`
const RightTab = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    border-bottom-width: 1px;
    right: 24px;
    z-index: 1;
    position: absolute;
    width: 155.5px;
`
const TabText = styled.Text`
    font-size: 15px;
    padding: 10px 0px;
    line-height: 22.5px;
`
const NotReadDot = styled.View`
    background-color: ${colors.red};
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-top: 10px;
    margin-left: 3px;
`
const JoinBtnContainer = styled.TouchableOpacity`
    border-radius: 100px;
    padding: 10px 14px;
    width: 123px;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: ${`${SCREEN_WIDTH / 2 - 123 / 2}px`};
    bottom: 24px;
`
const JoinText = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 13px;
    line-height: 19.5px;
`
