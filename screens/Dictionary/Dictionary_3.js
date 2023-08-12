import React, { useState, useRef, useEffect, useCallback, useMemo, useContext, createContext } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { Share, Dimensions, Alert, TouchableWithoutFeedback, ScrollView, SafeAreaView } from 'react-native'
import WrappedText from 'react-native-wrapped-text'
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { AppContext } from '../../components/ContextProvider';
import Dictionary_LeftTab from '../../components/Dictionary_LeftTab'
import Dictionary_RightTab from '../../components/Dictionary_RightTab'
import axios from 'axios'

const SCREEN_WIDTH = Dimensions.get('screen').width
const Container = styled.View`
    flex: 1;
    background-color: ${colors.grey_1};
`
const TopBtnContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 24px;
    height: 56px;
`
const TopBtn = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
    background-color: ${colors.red};
`
const ImageContainer = styled.View`
    height: 326px;  
    
    justify-content: center;
    align-items: center;
`
const ExerciseImage = styled.Image`
    background-color: ${colors.grey_4}; 
    width: 200px; 
    height: 200px;
`

const DictionaryContainer = styled.View`
    flex: 1;
    background-color: white;

    border-radius: 20px 20px 0px 0px;
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
const TitleWrapper = styled.View`
`
const TitleText = styled.Text`
    color: ${colors.black};
    font-weight: 600;
    font-size: 24px;
    padding-top: 8px;
`
const AddtoRoutineBtn = styled.TouchableOpacity`
    background-color: ${colors.red};
    height: 40px;
    width: 40px;
    border-radius: 20px;
`
const Bubble = styled.View`
    position: absolute;
    width: 154px;
    height: 50px;
    background: ${colors.grey_9};
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    bottom: 40%;
    right: 25px;
    z-index: 1;
`
const BubbleArrow = styled.View`
    position: absolute;
    display: block;
    width: 0;
    z-index: 1;
    top: 50px;
    right: 11px;
    height: 0;
    border: 8px solid transparent;
    border-top-color: ${colors.grey_9};
   border-bottom: 0;
`
const BubbleText = styled.Text`
    font-size: 11px;
    color: white;
    font-weight: 400;
    line-height: 18px;
`
const TabContainer = styled.View`
    margin-top: 8px;
    height: 45px;

    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey_1};

    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end; 
`
const LeftTab = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey_1};
    
    width: 155.5px;
    left: 24px;

    z-index: 1;
    position: absolute;
`
const RightTab = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey_1};

    right: 24px;
    z-index: 1;
    position: absolute;
    width: 155.5px;
`
const TabText = styled.Text`
    font-size: 15px;
    font-weight: 400;
    padding: 10px 0px;
`
const NotReadDot = styled.View`
    background-color: ${colors.red};
    width: 6px;
    height: 6px;
    border-radius: 3px;

    margin-top: 10px;
    margin-left: 3px;
`
const JoinImage = styled.Image`
    background-color: ${colors.red};
    width: 20px;
    height: 20px;
    margin-right: 10px;
`
const JoinText = styled.Text`
    font-weight: 600;
    color: ${colors.white};
    font-size: 13;
`

export default function Dictionary_3({ navigation, route }){
    const exerciseInfo = route.params.exercise
    const {isDark} = useContext(AppContext);

    const AreaText = styled.Text`
        color: ${ isDark ? colors.d_main : colors.l_main};
        font-weight: 400;
        font-size: 13px;
    `
    const JoinBtnContainer = styled.TouchableOpacity`
        background-color: ${ isDark ? colors.d_main : colors.l_main};
        border-radius:  100px;
        padding: 10px 14px;
        width: 123px;
        flex-direction: row;
        align-items: center;
        position: absolute;
        left: ${`${SCREEN_WIDTH/2-123/2}px`};
        bottom: 24px;
    `
    const leftTab = useRef()
    const rightTab = useRef()
    const bottomModal = useRef()


    const snapPoints = useMemo(()=> ['45%', '96%'], []) // modal이 가리는 화면%

    // LeftTab 누르면 leftTabActivate = true
    const [leftTabActivate, setLeftTabActivate ] = useState(true)
    const onTabPress = (target) => {
        setBubbleBool(false)
        target===leftTab? 
            setLeftTabActivate(true)
        : 
            setLeftTabActivate(false)
    }
    const renderBackdrop = useCallback(
        props => (
          <BottomSheetBackdrop
            {...props}
          />
        ), []
    )
    // 루틴 추가 말풍선
    const onPressAddRoutineBtn = ()=>{
        setBubbleBool(false)

        const exerciseName = exerciseInfo.name
        const exercisePart = exerciseInfo.parts
        const categoryIdx = exerciseInfo.healthCategoryIdx
        console.log(`${exerciseName},${exercisePart},${categoryIdx}`)
        // navigation.navigate("MyRoutine",{exerciseName,exercisePart,categoryIdx})
    }

    // RightTab에서 쓰이는 JoinBtnBool, 읽지 않음 버튼
    const [bubbleBool, setBubbleBool] = useState(true) // 말풍선 나타내기
    const [joinBtnBool, setJoinBtnBool] = useState(true) // 참여하기 버튼 나타내기
    
    const parentSetJoinBtnBool = (newBool) => setJoinBtnBool(newBool)
    const [isAllRead, setIsAllRead] = useState(true)



    const getReadInfo = async () => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/dictionary/readInfo"
            const response = await axios.get(url + detailAPI, {
                params: {
                    name: exerciseInfo.name,
                },
            })
            const result = response.data
            return result.result
        } catch (error) {
            console.error("Failed to fetch data:", error)
        }
    }
    useEffect(()=>{
        getReadInfo().then((result)=>{
            if(result[0].hasUnreadChats == 0) {
                setIsAllRead(true)
                console.log(`안 읽은 채팅 없음`)
            }
            else {
                setIsAllRead(false)
                console.log(`안 읽은 채팅 있음`)
            }
        })
    }, [])
    
    return (
        <TouchableWithoutFeedback
            onPressIn={()=> setBubbleBool(false)}
        >
            <SafeAreaView style={{flex: 1, backgroundColor: `${colors.grey_1}`}}>
                <Container>
                    <TopBtnContainer>
                        <TopBtn onPress={()=>navigation.goBack()}/>
                    </TopBtnContainer>
                    <ImageContainer>
                        <ExerciseImage resizeMode='contain'/>
                    </ImageContainer>
                    {
                        bubbleBool?
                            <Bubble>
                                <BubbleText>{`+ 버튼을 눌러 마이루틴에 해당\n운동을 추가해보세요!`}</BubbleText>
                                <BubbleArrow/>
                            </Bubble>
                            :
                            null
                    }
                    <BottomSheet
                        ref={bottomModal}
                        index={0}
                        snapPoints={snapPoints}
                        enablePanDownToClose={false}
                        keyboardBehavior='extend'
                        backdropComponent={renderBackdrop}                        
                    >
                        <DictionaryContainer>
                            <TitleContainer>
                                <NameContainer>
                                    <AreaText>{exerciseInfo.parts} | {exerciseInfo.muscle} | {exerciseInfo.equipment}</AreaText>
                                    <TitleWrapper><TitleText>{exerciseInfo.name}</TitleText></TitleWrapper>
                                </NameContainer>
                                <AddtoRoutineBtn onPress={onPressAddRoutineBtn}/>
                            </TitleContainer>
                            <TabContainer>
                                <LeftTab 
                                    ref={leftTab} 
                                    style={leftTabActivate? {borderBottomColor: `${ isDark ? colors.d_main : colors.l_main}`}: null} 
                                    onPressIn={()=>onTabPress(leftTab)}>
                                        <TabText style={leftTabActivate? {fontWeight: 600}: null}>운동 방법</TabText>
                                </LeftTab>         
                                <RightTab 
                                    ref={rightTab} 
                                    style={leftTabActivate? null: {borderBottomColor: `${ isDark ? colors.d_main : colors.l_main}`}} 
                                    onPressIn={()=>onTabPress(rightTab)}>
                                        <TabText style={leftTabActivate? null: {fontWeight: 600}}>채팅</TabText>
                                        { isAllRead? null : <NotReadDot/> }
                                </RightTab>
                            </TabContainer>
                            {
                                leftTabActivate? 
                                    <Dictionary_LeftTab 
                                        exerciseName = {exerciseInfo.name}
                                    /> 
                                    : 
                                    <Dictionary_RightTab 
                                        parentJoinBtnBool={joinBtnBool}
                                        parentSetJoinBtnBool={parentSetJoinBtnBool}
                                        exerciseName = {exerciseInfo.name}
                                        />
                            } 
                        </DictionaryContainer>
                    </BottomSheet>
                    {
                        !leftTabActivate && joinBtnBool?
                            <JoinBtnContainer onPress={()=>setJoinBtnBool(false)}>
                                <JoinImage></JoinImage>
                                <JoinText>채팅 참여하기</JoinText>
                            </JoinBtnContainer>
                            :
                            null
                    }
                </Container>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
} 