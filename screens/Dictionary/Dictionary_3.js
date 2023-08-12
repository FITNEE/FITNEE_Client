import React, { useState, useRef, useEffect, useCallback, useMemo, useContext, createContext } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { StatusBar, TouchableOpacity, Dimensions, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import WrappedText from 'react-native-wrapped-text'
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Dictionary_LeftTab from '../../components/Dictionary_LeftTab'
import Dictionary_RightTab from '../../components/Dictionary_RightTab'
import axios from 'axios'
import { IsDarkAtom } from "../../recoil/MyPageAtom"
import { useRecoilValue } from "recoil"
import { WithLocalSvg } from 'react-native-svg'
import LeftIcon from '../../assets/SVGs/Left.svg'
import AddIcon from '../../assets/SVGs/Add.svg'

export default function Dictionary_3({ navigation, route }){
    const isDark = useRecoilValue(IsDarkAtom)
    const exerciseInfo = route.params.exercise

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
        <>
        <StatusBar barStyle={isDark? 'light-content': 'dark-content'}/>
        <TouchableWithoutFeedback
            onPressIn={()=> setBubbleBool(false)}
        >
            <SafeAreaView 
                style={{backgroundColor: isDark? `${colors.black}`:`${colors.grey_1}`, flex: 1}}>
                <Container>
                    <TopBtnContainer>
                        <TouchableOpacity 
                            onPress={()=>navigation.goBack()}>
                            <WithLocalSvg
                                width={24}
                                height={24}
                                color={isDark? colors.grey_1: colors.black} // dark 모드 색 임의로 넣어놈
                                asset={LeftIcon}
                        /></TouchableOpacity>
                    </TopBtnContainer>
                    <ImageContainer>
                        <ExerciseImage resizeMode='contain'/>
                    </ImageContainer>
                    {
                        bubbleBool?
                            <Bubble style={{backgroundColor: isDark? `${colors.white}`:`${colors.grey_9}`}}>
                                <BubbleText style={{color: isDark? `${colors.grey_9}`:`${colors.white}`}}>
                                    {`+ 버튼을 눌러 마이루틴에 해당\n운동을 추가해보세요!`}
                                </BubbleText>
                                <BubbleArrow style={{borderTopColor: isDark? `${colors.white}`:`${colors.grey_9}`}}/>
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
                        backgroundStyle={{backgroundColor: isDark? `${colors.grey_9}`:`${colors.white}`}}                     
                    >
                        <DictionaryContainer>
                            <TitleContainer>
                                <NameContainer>
                                    <AreaText style={{color: isDark? `${colors.d_main}`:`${colors.l_main}`}}>
                                        {exerciseInfo.parts} | {exerciseInfo.muscle} | {exerciseInfo.equipment}
                                    </AreaText>
                                    <TitleWrapper>
                                        <TitleText style={{color: isDark? `${colors.white}`:`${colors.black}`}}>
                                            {exerciseInfo.name}
                                        </TitleText>
                                    </TitleWrapper>
                                </NameContainer>
                                <TouchableOpacity 
                                    onPress={onPressAddRoutineBtn}>
                                    <WithLocalSvg
                                        width={40}
                                        height={40}
                                        asset={AddIcon}
                                /></TouchableOpacity>
                            </TitleContainer>
                            <TabContainer style={{borderBottomColor: isDark? `${colors.grey_8}`:`${colors.grey_1}`}}> 
                                <LeftTab 
                                    ref={leftTab} 
                                    style={leftTabActivate? {borderBottomColor: `${ isDark ? colors.d_main : colors.l_main}`}: {borderBottomColor: `${ isDark ? colors.grey_8 : colors.grey_1}`}} 
                                    onPressIn={()=>onTabPress(leftTab)}>
                                        <TabText style={{color: isDark? `${colors.white}`:`${colors.black}`, fontWeight: leftTabActivate? 600 : null}}>
                                            운동 방법
                                        </TabText>
                                </LeftTab>          
                                <RightTab 
                                    ref={rightTab} 
                                    style={leftTabActivate? {borderBottomColor: `${ isDark ? colors.grey_8 : colors.grey_1}`}: {borderBottomColor: `${ isDark ? colors.d_main : colors.l_main}`}} 
                                    onPressIn={()=>onTabPress(rightTab)}>
                                        <TabText style={{color: isDark? `${colors.white}`:`${colors.black}`, fontWeight: leftTabActivate? null : 600}}>
                                            채팅
                                        </TabText>
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
                            <JoinBtnContainer 
                                onPress={()=>setJoinBtnBool(false)}
                                style={{backgroundColor: isDark? `${colors.d_main}`:`${colors.l_main}`}}
                            >
                                <JoinImage></JoinImage>
                                <JoinText style={{color: isDark? `${colors.black}`:`${colors.white}`}}>채팅 참여하기</JoinText>
                            </JoinBtnContainer>
                            :
                            null
                    }
                </Container>
            </SafeAreaView>
        </TouchableWithoutFeedback></>
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
    width: 200px; 
    height: 200px;
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
font-weight: 400;
font-size: 13px;
`
const TitleWrapper = styled.View`
`
const TitleText = styled.Text`
    color: ${colors.black};
    font-weight: 600;
    font-size: 24px;
    padding-top: 8px;
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
    display: block;
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
    font-weight: 400;
    line-height: 18px;
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
    font-weight: 400;
    padding: 10px 0px;
`
const NotReadDot = styled.View`
    background-color: ${colors.error};
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-top: 10px;
    margin-left: 3px;
`
const JoinBtnContainer = styled.TouchableOpacity`
    border-radius:  100px;
    padding: 10px 14px;
    width: 123px;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: ${`${SCREEN_WIDTH/2-123/2}px`};
    bottom: 24px;
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