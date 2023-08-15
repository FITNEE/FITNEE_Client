import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import Modal from "react-native-modal"
import {TouchableWithoutFeedback, Dimensions, TouchableOpacity} from 'react-native'
import {colors} from '../colors'
import Toast from 'react-native-toast-message'
import { useRecoilValue } from "recoil"
import { IsDarkAtom } from '../recoil/MyPageAtom'
import axios from 'axios'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
//   Platform.OS === "ios"?
   Dimensions.get("window").height
    // : require("react-native-extra-dimensions-android").get(
        // "REAL_WINDOW_HEIGHT"
    //   );

export default function Dictionary_Modal(props){
    const {isModalVisible, changeModalVisibility} = props
    const isDark = useRecoilValue(IsDarkAtom)

    const [isDone, setIsDone] = useState(false)
     
    const temp = ['등, 어깨, 가슴', '등, 어깨, 가슴', '', '', '', '등, 어깨, 가슴', '']
    const showToast = () => {
        changeModalVisibility(false)
        Toast.show({
            type: 'customToast',
            text1: '해당 운동이 마이루틴에 추가되었습니다.',
            visibilityTime: 1200,
            topOffset: 56,
            props: { isDark: isDark }
        })
    }

    const getRoutineInfo = async () => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/routine/calendar/parts"
            const response = await axios.get(url + detailAPI)
            const result = response.data
            console.log(result)

            return result.result
        } catch (error) {
            console.error("Failed to fetch data:", error)
        }
    }
    useEffect(()=>{
        getRoutineInfo().then((result)=>{
            // console.log(SortArray(result.parts))
            // console.log(SortArray(result.routineIdx))
        })
    }, [])

    const obj = {
        "parts": {"fri": "등", "mon": "가슴", "sat": "", "sun": "유산소", "thu": "", "tue": "", "wed": "하체"}, 
        "routineIdx": {"fri": 950, "mon": 1, "sat": 0, "sun": 951, "thu": 0, "tue": 0, "wed": 949}
    };

    const [routineIdx, setRoutineIdx] = useState()
    const [routinePart, setRoutinePart] = useState()
    const day = ['월', '화', []]

    const SortArray = (obj) => {
        const sortedPartsArr = 
            Object.entries(obj).sort(([key1], [key2]) => {
                const dayOrder = {mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7}
                return dayOrder[key1] - dayOrder[key2]
            }).map(([_, value]) => value)

        return sortedPartsArr
    }
    useEffect(()=>{
        setRoutinePart(SortArray(obj.parts))
        setRoutineIdx(SortArray(obj.routineIdx))

        console.log(routinePart)
        console.log(routineIdx)
    }, [isModalVisible])

    return(
            <Modal 
                isVisible={isModalVisible} 
                onBackdropPress={()=>changeModalVisibility(false)}
                backdropTransitionOutTiming={0}
                // animationIn="slideInRight"
                // animationOut="slideOutRight"
                // animationInTiming={400}
                // animationOutTiming={400}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Container style={{backgroundColor: isDark?`${colors.grey_8}`: `${colors.white}`}}>
                    <TopContainer>
                        <Title style={{color: isDark? `${colors.white}` : `${colors.black}`}}>루틴에 운동 추가하기</Title> 
                        <SubTitle style={{color: isDark? `${colors.white}` : `${colors.black}`}}>운동을 추가하고 싶은 요일을 선택해주세요.</SubTitle>

                        <DayContainer>
                        {
                            temp.map((part, i)=>(
                                <DayWrapper key={i} style={{marginRight: i%2==0? 5: null, backgroundColor: isDark? `${colors.grey_9}`:`${colors.grey_1}`}}>
                                    <DayText style={{color: isDark? `${colors.white}` : `${colors.black}`}}>
                                        월
                                    </DayText>

                                </DayWrapper>
                            ))
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
                            onPress={showToast} 
                            style={{
                                backgroundColor: 
                                isDark? 
                                    isDone? `${colors.d_main}`: `${colors.grey_4}` 
                                : 
                                    isDone? `${colors.l_main}`: `${colors.grey_6}` 
                                }}>
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
    font-weight: 600;
    font-size: 20px;
    color: ${colors.black};
    margin-top: 28px;
`
const SubTitle = styled.Text`
    font-weight: 400;
    font-size: 13px;
    color: ${colors.black};
    margin-top: 8px;
`
const DayContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0px 16px;
    margin-top: 28px;
`
const DayWrapper = styled.TouchableOpacity`
    width: 145px;
    height: 39px;
    border-radius: 8px;
    background-color: ${colors.grey_2};
    margin-bottom: 5px;

    flex-direction: row;
    align-items: center;
`
const DayText = styled.Text`
    font-weight: 500;
    font-size: 15px;
    padding-left: 8px;
    padding-right: 4px;
`
const PartText = styled.Text`

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
    font-weight: 600;
    font-size: 17px;
`
