import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import Modal from "react-native-modal"
import {TouchableWithoutFeedback, Dimensions, TouchableOpacity} from 'react-native'
import { colors } from '../../colors'
import Toast from 'react-native-toast-message'
import { useRecoilValue } from "recoil"
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import axios from 'axios'

export default function Dictionary_Modal(props){
    const {isModalVisible, changeModalVisibility, exerciseName, exercisePart, healthCategoryIdx} = props
    const isDark = useRecoilValue(IsDarkAtom)
     
    // getRoutineInfo에서 받아온 내용 저장
    const [routineInfo, setRoutineInfo] = useState([])
    // getRoutineInfo로 받아온 routineIdx, 대표부위를 요일별로 묶어서 배열로 변환
    const sortArray = (obj) => {
        const days = ['월', '화', '수', '목', '금', '토', '일']
        const sortedArray = Object.keys(obj.parts).map((key, index) => ({
            day: days[index],
            parts: obj.parts[key],
            routineIdx: obj.routineIdx[key]
          }))

        return sortedArray
    }
    
    // 일주일간의 요일별 routineIdx, 대표부위(parts)를 받아옴
    const getRoutineInfo = async () => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/routine/calendar/parts"
            const response = await axios.get(url + detailAPI)
            const result = response.data

            return result.result
        } catch (error) {
            console.error("Failed to fetch data:", error)
        }
    }
    useEffect(()=>{
        isModalVisible && 
            getRoutineInfo().then((result)=>{
                const temp = sortArray(result)
                setRoutineInfo(temp)
            })
        isModalVisible && setSelectedIdx(-1)
    }, [isModalVisible])

    // 선택하려는 요일의 routineInfo 내에서의 index값
    const [selectedIdx, setSelectedIdx] = useState(-1)
    const onPressDay = (i) => {
        if(selectedIdx == i) setSelectedIdx(-1)
        else setSelectedIdx(i)
    }

    // 선택완료 눌렀을 때 selectedIdx=-1이면 동작X
    const onPressDone = () => {
        if(selectedIdx != -1){
            changeModalVisibility(false)
            getRoutineDetail(routineInfo[selectedIdx].routineIdx).then((result)=>{
                let content = result.routineDetails
                let addInfo = {
                    "healthCategoryIdx": healthCategoryIdx,
                    "exerciseName": exerciseName,
                    "exerciseParts": exercisePart,
                    "content": [
                        // { rep: 15, weight: 40 },
                        // { rep: 15, weight: 40 },
                        // { rep: 15, weight: 40 },
                        { rep: 15 },
                        { rep: 15 },
                        { rep: 15 },
                    ]
                }
                content.push(addInfo)
                setIsSuccess(updateRoutine(routineInfo[selectedIdx].routineIdx, content))
            })
        } 
    }

    const [isSuccess, setIsSuccess] = useState()
    useEffect(()=>{
        isSuccess && Toast.show({
            type: 'customToast',
            text1: isSuccess? '해당 운동이 마이루틴에 추가되었습니다.': '루틴 추가에 실패하였습니다.',
            visibilityTime: 2200,
            topOffset: 56,
            props: { isDark: isDark }
        })        
    }, [isSuccess])

    // 선택한 요일의 기존에 저장되어 있던 루틴 내용을 가져옴
    const getRoutineDetail = async (routineIdx) => {
        try {
            let url = "https://gpthealth.shop/";
            let detailAPI = `app/routine/${routineIdx}`
            const response = await axios.get(url + detailAPI)
        
            const result = response.data

            if(result.isSuccess) console.log(`기존 루틴 가져오기 성공`)
            else console.log(`기존 루틴 가져오기 실패`)
            return result.result
        } 
        catch (error) {
          console.error("Failed to fetch data:", error);
        }
    }
    // 선택한 요일에 기존+추가 합쳐서 post 하기
    const updateRoutine = async (routineIdx, changedArray) => {
        if (changedArray == undefined) {
            let message = "changedArray == undefined 여서, updateRoutine 실행취소";
            return message;
        } 
        else{
            try {
                let url = "https://gpthealth.shop/"
                let detailAPI = `app/routine/${routineIdx}`
                const response = await axios.put(url + detailAPI, changedArray, {
                    headers: {
                    "Content-Type": "application/json",
                    },
            })
            const result = response.data
            console.log(result)

            if(result.isSuccess) console.log(`추가된 운동 등록 성공`)
            else console.log(`추가된 운동 등록 실패`)
            return result.isSuccess
        } 
            catch (error) {
                console.error("Failed to fetch data:", error)
            }
        }
    }


    return(
            <Modal 
                isVisible={isModalVisible} 
                onBackdropPress={()=>changeModalVisibility(false)}
                backdropTransitionOutTiming={0}
                style={{alignItems: 'center', justifyContent: 'center'}}
            >
                <Container style={{backgroundColor: isDark?`${colors.grey_8}`: `${colors.white}`}}>
                    <TopContainer>
                        <Title style={{color: isDark? `${colors.white}` : `${colors.black}`}}>루틴에 운동 추가하기</Title> 
                        <SubTitle style={{color: isDark? `${colors.white}` : `${colors.black}`}}>운동을 추가하고 싶은 요일을 선택해주세요.</SubTitle>

                        <DayContainer>
                        {
                            routineInfo.map((info, i)=>{

                                if(info.routineIdx == 0){
                                    return (
                                    <NoRoutineDay key={i} style={{marginRight: i%2==0? 5: null, backgroundColor: isDark? `${colors.grey_7}`:`${colors.grey_2}`}}>
                                        <DayText style={{color: `${colors.grey_4}`}}>
                                            {info.day}
                                        </DayText>
                                    </NoRoutineDay>)
                                }
                                else{
                                    return (
                                        <DayWrapper 
                                            onPress={()=>onPressDay(i)}
                                            key={i} 
                                            style={{
                                                marginRight: i%2==0? 5: null, 
                                                backgroundColor: 
                                                    selectedIdx == i?  
                                                        isDark? colors.l_p50 : colors.l_sub_2
                                                    :
                                                        isDark? colors.grey_9 : colors.grey_1,
                                                borderColor: selectedIdx == i? isDark? colors.d_main : colors.l_main : 'transparent',
                                            }}
                                        >
                                            <DayText 
                                                style={{
                                                    color: selectedIdx == i? isDark? colors.d_main: colors.l_main : isDark? colors.white : colors.black
                                                }}>
                                                {info.day}
                                            </DayText>
                                            <PartText>{info.parts}</PartText>
                                        </DayWrapper>
                                    )
                                }
                            }) 
                        }
                        </DayContainer>
                    </TopContainer>
                    <BottomContainer>
                        <CancelContainer 
                            onPress={()=>changeModalVisibility(false)}
                            style={{backgroundColor: isDark?`${colors.grey_7}`: `${colors.grey_2}`}}
                        >
                            <BottomText style={{color: isDark? `${colors.grey_3 }`: `${colors.grey_7}`}}>취소</BottomText>
                        </CancelContainer>
                        <SelectContainer
                            onPress={onPressDone} 
                            style={{
                                backgroundColor: 
                                isDark? 
                                    selectedIdx != -1? `${colors.d_main}`: `${colors.grey_4}` 
                                : 
                                    selectedIdx != -1? `${colors.l_main}`: `${colors.grey_6}` ,
                                }}
                            activeOpacity={ selectedIdx == -1? 1: 0.2 }        
                        >
                            <BottomText style={{color: `${colors.white}`}}>선택 완료</BottomText>
                        </SelectContainer>
                    </BottomContainer>
                </Container>

            </Modal>
    )
}

const Container = styled.View`
    width: 327px;
    height: 367px;
    border-radius: 20px;
`
const TopContainer = styled.View`
    width: 327px;
    height: 311px;
    align-items: center;
`
const Title = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 20px;
    color: ${colors.black};
    margin-top: 28px;
    line-height: 32px;
`
const SubTitle = styled.Text`
    font-family: Pretendard-Regular;
    font-size: 13px;
    color: ${colors.black};
    margin-top: 8px;
    line-height: 19.5px;
`
const DayContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0px 16px;
    margin-top: 28px;
`
const NoRoutineDay = styled.View`
    width: 145px;
    height: 39px;
    border-radius: 8px;
    margin-bottom: 5px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
`
const DayWrapper = styled.TouchableOpacity`
    width: 145px;
    height: 39px;
    border-radius: 8px;
    border-width: 1px;
    margin-bottom: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
`
const DayText = styled.Text`
    font-family: Pretendard-Medium;
    font-size: 15px;
`
const PartText = styled.Text`
    font-size: 13px;
    font-family: Pretendard-Regular;
    margin-right: 7px;
    color: ${colors.grey_6}
`
const BottomContainer = styled.View`
    flex-direction: row;
`
const CancelContainer = styled.TouchableOpacity`
    width: 124px;
    height: 56px;
    border-bottom-left-radius: 20px;

    align-items: center;
    justify-content: center;
`
const SelectContainer = styled.TouchableOpacity`
    width: 203px;
    height: 56px;
    border-bottom-right-radius: 20px;

    align-items: center;
    justify-content: center;
`
const BottomText = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 17px; 
`