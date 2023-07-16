import React, { useState, useRef } from 'react'
import styled from 'styled-components/native';
import { colors } from './colors'
import { ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import WrappedText from 'react-native-wrapped-text';
import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Container = styled.View`
    flex: 1;
    background-color: ${colors.grey1};
`

const TopBtnContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 24px;
    height: 56px;
`
const TopBtn = styled.Image`
    width: 24px;
    height: 24px;
    background-color: red;
`

const ImageContainer = styled.View`
    height: 326px;  
    
    justify-content: center;
    align-items: center;
`
const ExerciseImage = styled.Image`
    background-color: ${colors.grey4}; 
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
const AreaText = styled.Text`
    color: ${colors.purple};
    font-weight: 400;
    font-size: 13px;
`
const TitleText = styled.Text`
    color: ${colors.black};
    font-weight: 600;
    font-size: 24px;
`
const AddtoRoutineBtn = styled.TouchableOpacity`
    background-color: red;
    height: 40px;
    width: 40px;
    border-radius: 20px;
`

const TabContainer = styled.View`
    margin-top: 8px;
    height: 45px;

    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey1};

    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end; 
`
const LeftTab = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey1};
    
    margin-left: 24px;
    margin-right: 16px;
`
const RightTab = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey1};

    margin-right: 24px;
`
const TabText = styled.Text`
    font-size: 15px;
    font-weight: 400;
    padding: 10px 0px;
`
const NotReadDot = styled.View`
    background-color: '#FF3E49';
    width: 6px;
    height: 6px;
    border-radius: 3px;

    margin-top: 10px;
    margin-left: 3px;
`

const ContentContainer = styled.ScrollView`
    
`
const ProcessContainer = styled.View`
    margin: 16px 24px;
`
const Process = styled.View`
    background-color: ${colors.grey1};
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 8px;

    flex-direction: row;
`
const ProcessNum = styled.Text`
    color: ${colors.purple};
    font-weight: 600;
    font-size: 15px;
`
const ProcessContent = styled.View`
    align-items: flex-start;
    margin-left: 8px;
    margin-right: 21px;
`
const ProcessName = styled.Text`
    color: ${colors.black};
    font-weight: 600;
    font-size: 15px;

    margin-bottom: 8px;
`

const CautionContainer = styled.View`
    margin: 36px 24px;
`
const CautionTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`
const CautionImage = styled.Image`
    background-color: red;
    width: 20px;
    height: 20px;
    margin-right: 4px;
`
const CautionTitle = styled.Text`
    font-weight: 600;
    font-size: 15px;
    color: ${colors.black};
`
const CautionContentContainer = styled.View`
    padding: 24px;
    background-color: ${colors.grey1};
    border-radius: 12px;
`
const CautionDetailContainer = styled.View`
    flex-direction: row;
    align-items: center;   
`
const CautionDot = styled.View`
    background-color: #D9D9D9;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    margin-right: 4px;
    margin-top: 4px;
    margin-bottom: 4px;
`
const CautionDetail = styled.Text`
    font-weight: 400;
    font-size: 13px;
    color: ${colors.black};
`

const ChatContainer = styled.View`
    margin-left: 24px;
    margin-bottom: 16px;
`
const UserName = styled.Text`
    color: ${colors.purple};
    font-size: 11px;
    font-weight: 400;
    margin-left: 8px;
    margin-bottom: 5px;
`
const MessageContainer = styled.View`
    background-color: ${colors.grey1};
    border-radius: 12px 12px 12px 0px;
    padding: 8px 16px;
    margin-right: 151px;
`

const JoinBtnContainer = styled.View`
    background-color: ${colors.grey2};
    border-radius:  100px;
    padding: 10px 14px;
    width: 123px;

    flex-direction: row;
    align-items: center;

    position: absolute;
    left: ${SCREEN_WIDTH/2};
`
const JoinImage = styled.Image`
    background-color: red;
    width: 20px;
    height: 20px;
    margin-right: 10px;
`
const JoinText = styled.Text`
    font-weight: 600;
    font-size: 13;
    color: ${colors.grey7};
`

export default function DictionaryDetail(){

    const activateTabStyle = { 
        borderBottomColor: `${colors.purple}`,
        fontWeight: 600, // 이거 적용 안 된다
    }

    const leftTab = useRef()
    const rightTab = useRef()
    
    const [area, setArea] = useState('어깨 | 측면 삼각근 | 머신')
    const [exerciseName, setExerciseName] = useState('사이드 레터럴 레이즈 머신')
    const [leftTabActivate, setLeftTabActivate ] = useState(true)
    const [notReadCount, setNoteradCount] = useState(0)
    const [isAllRead, setIsAllRead] = useState(true)
    const [processName, setProcessName] = useState(['안장 높낮이 조절', '시작 자세', '마무리 자세'])
    const [caution, setCaution] = useState(['허리를 과도하게 안으로 넣지 마세요.', '적절한 무게로 승모근에 무리가 가지 않도록 하세요.', '안장과 바의 위치점을 올바르게 맞춰주세요.'])
    const [userName, setUserName] = useState(['근손실', '삼대오백'])
    const [msg, setMsg] = useState(['사레레 무게 얼마나 들 수 있어야 어깨 부자 되나요?', '무게보다는 정확한 자세가 중요합니다. 특히 처음 할 때는 큰 근육에 자극 주기가 힘드니 꾸준히 하셔야해요!'])

    const onTabPress = (target) => target===leftTab? setLeftTabActivate(true) : setLeftTabActivate(false)

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: `${colors.grey1}`}}>
            <Container>
                <TopBtnContainer>
                    <TopBtn/>
                    <TopBtn/>
                </TopBtnContainer>
                <ImageContainer>
                    <ExerciseImage resizeMode='contain'/>
                </ImageContainer>
                <DictionaryContainer>
                    <TitleContainer>
                        <NameContainer>
                            <AreaText>{area}</AreaText>
                            <TitleText>{exerciseName}</TitleText>
                        </NameContainer>
                        <AddtoRoutineBtn/>
                    </TitleContainer>
                    
                    <TabContainer>
                        <LeftTab 
                            ref={leftTab} 
                            style={leftTabActivate? activateTabStyle: null} 
                            onPressIn={()=>onTabPress(leftTab)}>
                                <TabText>운동 방법</TabText>
                        </LeftTab>         
                        <RightTab 
                            ref={rightTab} 
                            style={leftTabActivate? null: activateTabStyle} 
                            onPressIn={()=>onTabPress(rightTab)}>
                                <TabText>채팅 42개</TabText>
                                { isAllRead? null : <NotReadDot/> }
                        </RightTab>
                    </TabContainer>

                    {
                    leftTabActivate?
                        <ContentContainer>
                            <ProcessContainer>
                            {                            
                                processName.map((processName, i) => (
                                    <Process>
                                        <ProcessNum>{'0'+ (i+1)}</ProcessNum>
                                        <ProcessContent>
                                            <ProcessName>{processName}</ProcessName>
                                            <WrappedText textStyle={{fontWeight: 400, fontSize: '13px', color: `${colors.black}`}}>
                                                안장의 높이를 삼두 중앙보다 약간 위쪽과 같도록 맞춘 후 손잡이를 잡아주세요.
                                            </WrappedText>
                                        </ProcessContent>
                                    </Process>
                                ))
                            }
                            </ProcessContainer>

                            <CautionContainer>
                                <CautionTitleContainer>
                                    <CautionImage/>
                                    <CautionTitle>이 부분은 특히 주의해주세요!</CautionTitle>
                                </CautionTitleContainer>
                                <CautionContentContainer>
                                {
                                    caution.map((caution) => (
                                        <CautionDetailContainer>
                                            <CautionDot/>
                                            <CautionDetail>{ caution }</CautionDetail>
                                        </CautionDetailContainer>
                                    ))
                                }
                                </CautionContentContainer>
                            </CautionContainer>
                        </ContentContainer>
                        : 
                        <ContentContainer style={{paddingTop: 28}}>
                        {
                            userName.map((userName, i) => (
                                <ChatContainer>
                                    <UserName>{userName}</UserName>
                                    <MessageContainer>
                                        <WrappedText textStyle={{fontWeight: 400, fontSize: 13, color: `${colors.black}`, lineHeight: 17}}>{msg[i]}</WrappedText>
                                    </MessageContainer>
                                </ChatContainer>
                            ))
                        }

                            <JoinBtnContainer>
                                <JoinImage></JoinImage>
                                <JoinText>채팅 참여하기</JoinText>
                            </JoinBtnContainer>
                        </ContentContainer>
                    }
                </DictionaryContainer> 
            </Container>    
        </SafeAreaView>
        
    )
} 