import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Alert, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
//   BottomSheetFlatList
} from "@gorhom/bottom-sheet";
import { colors } from "../colors";
import WrappedText from "react-native-wrapped-text";
import { AppContext } from "./ContextProvider";
import axios from "axios";

const ChatContainer = styled.View`
  margin-left: 24px;
  margin-bottom: 16px;
  margin-right: 24px;
`;
const MessageWrapper = styled.View`
  align-items: flex-start;
`;
const MessageContainer = styled.View`
  background-color: ${colors.grey_1};
  border-radius: 12px 12px 12px 0px;
  padding: 8px 16px;
  max-width: 200px;
`;
const MyMessageContainer = styled.View`
  background-color: ${colors.grey_1};
  border-radius: 12px 12px 0px 12px;
  padding: 8px 16px;
  max-width: 200px;
`;
const MyMessageWrapper = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;
const MsgDeleteBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${colors.red};
  margin-right: 8px;
`;
const TextInputBG = styled.View`
  background-color: ${colors.grey_1};
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
`;
const TextInputContainer = styled.View`
  background-color: white;
  border-radius: 50px;
  width: 100%;
  flex-direction: row;
  padding: 6px;
`;
const TextInput = styled.TextInput`
  color: ${colors.black};
  width: 300px;
  margin-left: 15px;
`;

export default function Dictionary_RightTab(props) {
    const { isDark } = useContext(AppContext);
    const UserName = styled.Text`
        color: ${isDark ? colors.d_main : colors.l_main};
        font-size: 11px;
        font-weight: 400;
        margin-left: 8px;
        margin-bottom: 5px;
    `
    const SendBtn = styled.TouchableOpacity`
        background-color: ${isDark ? colors.d_main : colors.l_main};
        width: 32px;
        height: 32px;
        border-radius: 16px;
    `
    const scrollviewRef = useRef(null)
   
    const onSubmitChat = () => {
        let temp = []
        chat.length == 0? 
            null
            : 
            (
            postChat(),
            setChat(""),
            funcSetJoinBtnBool(true),
            setChatUpdate(!chatUpdate),
            scrollviewRef.current?.scrollToEnd({ animated: true })
            )
    }
    const onFocusInput = () => {
        scrollviewRef.current?.scrollToEnd({ animated: true })
    }

    const [msg, setMsg] = useState([])
    const [chat, setChat] = useState("")
    const [chatUpdate, setChatUpdate] = useState(false)
    const [chatIdx, setChatIdx] = useState([])

    // 참여하기 버튼
    const { parentJoinBtnBool, parentSetJoinBtnBool, parentIsAllRead, exerciseName } = props
    const [childJoinBtnBool, setChildJoinBtnBool] = useState(parentJoinBtnBool)
    useEffect(() => {
    setChildJoinBtnBool(parentJoinBtnBool)
    }, [parentJoinBtnBool])
    const funcSetJoinBtnBool = (newBool) => {
        setChildJoinBtnBool(newBool)
        parentSetJoinBtnBool(newBool)
    }
    const setIsAllRead = (newBool) => parentIsAllRead(newBool)

    // 채팅 불러오기
    const getChat = async () => {
    try {
        let url = "https://gpthealth.shop/"
        let detailAPI = "/app/dictionary/exercisechat"
        const response = await axios.get(url + detailAPI, {
            params: {
                name: "사이드 레터럴 레이즈",
            },
        })
        const result = response.data
        return result
    } catch (error) {
        console.error("Failed to fetch data:", error)
    }
    }
    useEffect(() => {
    getChat().then((result) => {
        setMsg(result.result.chattinginfo)
        // console.log(`healthchattingidx : ${msg.at(-1).healthChattingIdx}`)
    })
    }, [parentJoinBtnBool,chatUpdate])

    //채팅 올리기
    const postChat = async () => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/dictionary/chatting"
            const response = await axios.post(url + detailAPI, {
                "name": exerciseName,
                "text": chat
            })
            const result = response.data
            if(result.result.isSuccess) 
                console.log(`채팅 업로드 성공 (운동: ${exerciseName}, 닉네임: ${myNickName}, 내용: ${chat})`)
            else console.log(`채팅 업로드 실패 (운동: ${exerciseName}, 닉네임: ${myNickName}, 내용: ${chat})`)
        } 
        catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        console.error("Failed to fetch data:", error);
        }
    } 

    // 닉네임 알아오기
    const [myNickName, setMyNickName] = useState("")
    const getNickname = async () => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = `app/mypage/userinfo`
            const response = await axios.get(url + detailAPI);
            const result = response.data
            return result
        } 
        catch (error) {
        console.error("Failed to fetch data:", error);
        }
    }
    useEffect(()=>{
    getNickname().then((result)=>{
        setMyNickName(result.result[0].userNickname)
    })
    }, [])

    const deleteChat = async (idx) => {
    try {
        let url = "https://gpthealth.shop/"
        let detailAPI = `app/dictionary/deleteChatt`
        const response = await axios.patch(url + detailAPI, {
            healthChattingIdx: idx
        })
        const result = response.data

        if(result.isSuccess) console.log(`채팅 삭제 성공(idx: ${idx})`)
        else console.log(`채팅 삭제 실패(idx: ${idx})`)
        return result
    } 
    catch (error) {
        console.error("Failed to fetch data:", error)
    }
    }
    const onPressMsgDeleteBtn = (idx) => {
        Alert.alert(
        "채팅 삭제",
        "채팅방에서 삭제되며\n채팅 내용은 복구되지 않습니다.",
        [
            { text: "취소" },
            {
                text: "삭제하기",
                onPress: () => {
                    deleteChat(idx)
                    setChatUpdate(!chatUpdate)
                },
                style: "destructive",
            },
        ]
        )
    }

    const getChatInfo = async (idx) => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = `app/dictionary/readInfo`
            const response = await axios.get(url + detailAPI, {
                name: idx
            })
            const result = response.data
            console.log(result)
    
            if(result.isSuccess) console.log(`마지막 채팅 저장 성공(idx: ${idx})`)
            else console.log(`마지막 채팅 저장 실패(idx: ${idx})`)
            return result
        } 
        catch (error) {
            console.error("Failed to fetch data:", error)
        }
    }

    return (
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <BottomSheetScrollView
                ref={scrollviewRef}
                style={{ paddingTop: 28 }}
                showsVerticalScrollIndicator={false}
            >
                {msg.map((msg, i) => (
                    <ChatContainer key={i}>
                        {msg.userNickname != myNickName ? 
                            (<MessageWrapper>
                                <UserName>{msg.userNickname}</UserName>
                                <MessageContainer>
                                    <WrappedText
                                    textStyle={{
                                        fontWeight: 400,
                                        fontSize: 13,
                                        color: `${colors.black}`,
                                        lineHeight: 17,
                                    }}
                                    >
                                    {msg.text}
                                    </WrappedText>
                                </MessageContainer>
                            </MessageWrapper>)
                        : 
                            (<MyMessageWrapper> 
                                <MsgDeleteBtn onPress={()=>onPressMsgDeleteBtn(msg.healthChattingIdx)} />
                                <MyMessageContainer >
                                    <WrappedText 
                                        textStyle={{
                                            fontWeight: 400,
                                            fontSize: 13,
                                            color: `${colors.black}`,
                                            lineHeight: 17,
                                        }}
                                        containerStyle={{ alignItems: "left" }}
                                    >
                                        {msg.text}
                                    </WrappedText>
                                </MyMessageContainer>
                            </MyMessageWrapper>)}
                    </ChatContainer>
                ))}
                <View style={{ height: 40 }} />
            </BottomSheetScrollView>
        </TouchableWithoutFeedback>

        {childJoinBtnBool ? null : (
          <TextInputBG>
            <TextInputContainer>
              <BottomSheetTextInput
                style={{
                  color: `${colors.black}`,
                  width: 300,
                  marginLeft: 15,
                }}
                type="text"
                onChangeText={(text) => {
                  setChat(text);
                }}
                value={chat}
                onSubmitEditing={onSubmitChat}
                autoFocus={true}
                onFocus={onFocusInput}
              />
              <SendBtn onPress={onSubmitChat} />
            </TextInputContainer>
          </TextInputBG>
        )}
      </>
    )
}
