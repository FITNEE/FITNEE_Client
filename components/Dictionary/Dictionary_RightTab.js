import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Alert, TouchableWithoutFeedback, TouchableOpacity, Keyboard, View } from "react-native";
import { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { colors } from "../../colors";
import WrappedText from "react-native-wrapped-text";
import axios from "axios";
import { IsDarkAtom } from "../../recoil/MyPageAtom"
import { useRecoilValue } from "recoil"
import TrashIcon from '../../assets/SVGs/Trash.svg'

export default function Dictionary_RightTab(props) {
    const isDark = useRecoilValue(IsDarkAtom)

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
    const { parentJoinBtnBool, parentSetJoinBtnBool, exerciseName, leftTabActivate, setIsAllRead } = props
    const [childJoinBtnBool, setChildJoinBtnBool] = useState(parentJoinBtnBool)
    useEffect(() => {
        setChildJoinBtnBool(parentJoinBtnBool)
    }, [parentJoinBtnBool])
    const funcSetJoinBtnBool = (newBool) => {
        setChildJoinBtnBool(newBool)
        parentSetJoinBtnBool(newBool)
    }

    // 채팅 불러오기
    const getChat = async () => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/dictionary/exercisechat"
            const response = await axios.get(url + detailAPI, {
                params: {
                    name: exerciseName,
                },
            })
            const result = response.data

            if(result.result.isSuccess) 
                console.log(`채팅 불러오기 성공 (운동이름 : ${exerciseName})`)
            else console.log(`채팅 불러오기 성공 (운동이름 : ${exerciseName})`)
    
            return result.result
        } catch (error) {
            console.error("Failed to fetch data:", error)
        }
    }
    useEffect(() => {
        !leftTabActivate && getChat().then((result) => {
            setMsg(result.chattinginfo)
        })
    }, [parentJoinBtnBool,chatUpdate, leftTabActivate])

    const [lastIdx, setLastIdx] = useState()
    useEffect(()=>{
        if(msg.length !=0){
            putChatRead(msg.at(-1).healthChattingIdx).then(()=>{
                setLastIdx(msg.at(-1).healthChattingIdx)
            })
        }
    }, [msg])

    const getReadInfo = async () => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/dictionary/readInfo"
            const response = await axios.get(url + detailAPI, {
                params: {
                    name: exerciseName,
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
            if(result.chatExist.chatExists == 0) {
                console.log(`채팅 내역 존재 X`)
                setIsAllRead(true)
            }
            else {
                if(result.informationRows.hasUnreadChats == 1){
                    setIsAllRead(false)
                    console.log(`안 읽은 채팅 있음`)
                }
                else{
                    setIsAllRead(true)
                    console.log(`안 읽은 채팅 없음`)
                }
            }
        })
    }, [leftTabActivate, lastIdx])

    //채팅 보내기
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

    // 채팅 삭제 
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

    // 채팅 삭제 버튼
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
        setSelectedIdx(-1)
    }

    // 어디까지 읽었는지 저장
    const putChatRead = async (idx) => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/dictionary/chatRead"
            const response = await axios.put(url + detailAPI, {
                "healthChattingIdx" : idx
            })
            const result = response.data   
            
            if(result.isSuccess) 
                console.log(`어디까지 읽었는지 저장 성공 (idx : ${idx})`)
            else console.log(`어디까지 읽었는지 저장 실패 (idx : ${idx})`)
    
            return result.result
        } catch (error) {
            console.error("Failed to fetch data:", error)
        }
    }

    // 삭제하려는 메시지의 msg 배열에서의 index값
    const [selectedIdx, setSelectedIdx] = useState(-1)

    //메시지를 꾹 눌렀을 때 메시지 삭제 버튼 토글
    const onLongPress = (i) => {
        // Vibration.vibrate()
        if(i==selectedIdx) setSelectedIdx(-1)
        else setSelectedIdx(i)

        {/* 햅틱 효과 넣고 싶다 아님 띠용 이펙트 */}
    }

    return (
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <BottomSheetScrollView
                style={{ paddingTop: 28 }}
                showsVerticalScrollIndicator={false}
            >
                {msg.map((msg, i) => (
                    <ChatContainer key={i}>
                        {msg.userNickname != myNickName ? 
                            (<MessageWrapper>
                                <UserName style={{color: isDark ? `${colors.d_main}` : `${colors.l_main}`}}>{msg.userNickname}</UserName>
                                <MessageContainer style={{backgroundColor: isDark? `${colors.grey_8}`:`${colors.grey_1}`}}>
                                    <MessageText 
                                        style={{color: isDark? `${colors.white}`:`${colors.black}`}}>
                                        {msg.text}
                                    </MessageText>
                                </MessageContainer>
                            </MessageWrapper>)
                        : 
                            (<MyMessageWrapper> 
                                {selectedIdx===i && 
                                <TouchableOpacity 
                                    style={{width: 24, height: 24, marginRight: 8}} 
                                    onPress={()=>onPressMsgDeleteBtn(msg.healthChattingIdx)}
                                    >
                                    <TrashIcon 
                                        width={24}
                                        height={24}
                                    />
                                </TouchableOpacity>}
                                <MyMessageContainer 
                                    onLongPress={()=>onLongPress(i)}
                                    style={{backgroundColor: isDark? `${colors.grey_8}`:`${colors.grey_1}`}}
                                >
                                    <MessageText 
                                        style={{color: isDark? `${colors.white}`:`${colors.black}`}}>
                                        {msg.text}
                                    </MessageText>
                                </MyMessageContainer>
                            </MyMessageWrapper>)}
                    </ChatContainer>
                ))}
                <View style={{ height: 40 }} />
            </BottomSheetScrollView>
        </TouchableWithoutFeedback>

        {childJoinBtnBool ? null : (
          <TextInputBG style={{backgroundColor: isDark? `#303235`:`#D1D3D9`}}>
            <TextInputContainer style={{backgroundColor: isDark? `${colors.black}`:`${colors.white}`}}>
                <BottomSheetTextInput
                    style={{
                        color: isDark? `${colors.white}`:`${colors.black}`,
                        width: 300,
                        marginLeft: 15,
                        fontSize: 17,
                        fontFamily: 'Pretendard-Regular'
                    }}
                    type="text"
                    onChangeText={(text) => setChat(text)}
                    value={chat}
                    onSubmitEditing={onSubmitChat}
                    autoFocus={true}
                    onFocus={onFocusInput}
                    keyboardAppearance= {isDark? 'dark':'light'}
                />
                <SendBtn 
                    onPress={onSubmitChat} 
                    style={{backgroundColor: isDark? `${colors.d_main}`:`${colors.l_main}`}}
                />
            </TextInputContainer>
          </TextInputBG>
        )}
      </>
    )
}

{/*textinputbg 색 변경하기*/}

const ChatContainer = styled.View`
  margin-left: 24px;
  margin-bottom: 16px;
  margin-right: 24px;
`
const MessageWrapper = styled.View`
  align-items: flex-start;
`
const MessageContainer = styled.View`
  border-radius: 12px 12px 12px 0px;
  padding: 8px 16px;
  max-width: 200px;
`
const MyMessageContainer = styled.TouchableOpacity`
  border-radius: 12px 12px 0px 12px;
  padding: 8px 16px;
  max-width: 200px;
`
const MyMessageWrapper = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`
const MessageText = styled.Text`
    font-size: 13px;
    font-family: Pretendard-Regular;
    line-height: 19.5px;
`
const TextInputBG = styled.View` 
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
`
const TextInputContainer = styled.View`
  border-radius: 50px;
  width: 100%;
  flex-direction: row;
  padding: 6px;
`
const UserName = styled.Text`
    font-size: 11px;
    font-family: Pretendard-Regular;
    margin-left: 8px;
    margin-bottom: 5px;
`
const SendBtn = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    border-radius: 16px;
`
