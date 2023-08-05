import React, { useState, useRef, useContext } from 'react'
import styled from 'styled-components/native'
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native'
import { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import {colors} from '../colors'
import WrappedText from 'react-native-wrapped-text'
import { AppContext } from './ContextProvider'


const ChatContainer = styled.View`
    margin-left: 24px;
    margin-bottom: 16px;
    margin-right: 24px;
`
const MessageWrapper = styled.View`
    align-items: flex-start;
`
const MessageContainer = styled.View`
    background-color: ${colors.grey_1};
    border-radius: 12px 12px 12px 0px;
    padding: 8px 16px;
    max-width: 200px;
`
const MyMessageContainer = styled.View`
    background-color: ${colors.grey_1};
    border-radius: 12px 12px 0px 12px;
    padding: 8px 16px;
    max-width: 200px;
`
const MyMessageWrapper = styled.View`
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
`
const MsgDeleteBtn = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: ${colors.red};
    margin-right: 8px;
`
const TextInputBG = styled.View`
    background-color: ${colors.grey_1};
    justify-content: center;
    align-items: center;
    padding: 9px 16px;
`
const TextInputContainer = styled.View`
    background-color: white;
    border-radius: 50px;
    width: 100%;
    flex-direction: row;
    padding: 6px;
`
const TextInput = styled.TextInput`
    color: ${colors.black};
    width: 300px;
    margin-left: 15px;
`


export default function Dictionary_RightTab(props){

    const {isDark} = useContext(AppContext);
    const UserName = styled.Text`
    color: ${ isDark ? colors.d_main : colors.l_main};
    font-size: 11px;
    font-weight: 400;
    margin-left: 8px;
    margin-bottom: 5px;
    `
    const SendBtn = styled.TouchableOpacity`
    background-color: ${ isDark ? colors.d_main : colors.l_main};
    width: 32px;
    height: 32px;
    border-radius: 16px;
    `
    const scrollviewRef = useRef(null)
    const onPressMsgDeleteBtn = () => {
        Alert.alert(
            '채팅 삭제', 
            '채팅방에서 삭제되며\n채팅 내용은 복구되지 않습니다.',
            [
                {text: '취소'},
                {
                    text: '삭제하기',
                    onPress: () => console.log('delete'),
                    style: 'destructive'
                }
            ]
        )
    }
    const onSubmitChat = () => {
        let temp = []
        chat.length == 0?
            null
        :
            (temp = [...msg, [chat, false]],
            setMsg(temp),
            setChat(''),
            // setJoinBtnBool(true), 
            scrollviewRef.current.scrollToEnd({animated: true}))
    }
    const onFocusInput = () => {
        scrollviewRef.current.scrollToEnd({animated: true})
    }

    const [userName, setUserName] = useState(['근손실', '삼대오백', '근손실', '삼대오백', '근손실', '삼대오백', '근손실', '삼대오백', '근손실', '삼대오백', '근손실', '삼대오백'])
    const [msg, setMsg] = useState([['사레레 무게 얼마나 들 수 있어야 어깨 부자 되나요?', true], ['무게보다는 정확한 자세가 중요합니다. 특히 처음 할 때는 큰 근육에 자극 주기가 힘드니 꾸준히 하셔야해요!', true], ['사레레 무게 얼마나 들 수 있어야 어깨 부자 되나요?', true], ['무게보다는 정확한 자세가 중요합니다. 특히 처음 할 때는 큰 근육에 자극 주기가 힘드니 꾸준히 하셔야해요!', true], ['사레레 무게 얼마나 들 수 있어야 어깨 부자 되나요?', true], ['무게보다는 정확한 자세가 중요합니다. 특히 처음 할 때는 큰 근육에 자극 주기가 힘드니 꾸준히 하셔야해요!', true], ['사레레 무게 얼마나 들 수 있어야 어깨 부자 되나요?', true], ['무게보다는 정확한 자세가 중요합니다. 특히 처음 할 때는 큰 근육에 자극 주기가 힘드니 꾸준히 하셔야해요!', true], ['사레레 무게 얼마나 들 수 있어야 어깨 부자 되나요?', true], ['무게보다는 정확한 자세가 중요합니다. 특히 처음 할 때는 큰 근육에 자극 주기가 힘드니 꾸준히 하셔야해요!', true], ['사레레 무게 얼마나 들 수 있어야 어깨 부자 되나요?', true], ['무게보다는 정확한 자세가 중요합니다. 특히 처음 할 때는 큰 근육에 자극 주기가 힘드니 꾸준히 하셔야해요!', false]])
    const [chat, setChat] = useState('')
    const [joinBtnBool, setJoinBtnBool] = useState(props.joinBtnBool)

    return(
    <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <BottomSheetScrollView 
                ref={ scrollviewRef } 
                style={{paddingTop: 28}} 
                showsVerticalScrollIndicator={false}
            >
                {
                    msg.map((msg, i) => (
                        <ChatContainer>
                            {
                                msg[1] == true?
                                    <MessageWrapper>
                                        <UserName>{userName[i]}</UserName>
                                        <MessageContainer>
                                            <WrappedText textStyle={{fontWeight: 400, fontSize: 13, color: `${colors.black}`, lineHeight: 17}}>{msg[0]}</WrappedText>
                                        </MessageContainer>
                                    </MessageWrapper>
                                :
                                    <MyMessageWrapper>
                                        <MsgDeleteBtn onPress={onPressMsgDeleteBtn}/>
                                        <MyMessageContainer>
                                            <WrappedText 
                                                textStyle={{fontWeight: 400, fontSize: 13, color: `${colors.black}`, lineHeight: 17}}
                                                containerStyle={{alignItems: 'left'}}>{msg[0]}</WrappedText>
                                        </MyMessageContainer>
                                    </MyMessageWrapper>
                            }
                        </ChatContainer>
                    ))
                }
                <View style={{height: 40}}/>
            </BottomSheetScrollView>
        </TouchableWithoutFeedback>
        { !joinBtnBool &&  
            <TextInputBG>
                <TextInputContainer>
                    <BottomSheetTextInput
                        style={{
                            color: `${colors.black}`,
                            width: 300,
                            marginLeft: 15
                        }}
                        type="text"
                        onChangeText={text => {setChat(text)}}
                        value={chat}
                        onSubmitEditing={onSubmitChat}
                        autoFocus={true}
                        onFocus={onFocusInput}
                    />
                    <SendBtn onPress={onSubmitChat}/>
                </TextInputContainer>
            </TextInputBG>
        }
    </>
    )
}