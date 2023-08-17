import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import {colors} from '../../colors'
import { IsDarkAtom } from "../../recoil/MyPageAtom"
import { useRecoilValue } from "recoil"

export default function Dictionary_AutoSearch(props){
    const isDark = useRecoilValue(IsDarkAtom) 

    const { navigation, parentSearch, parentSearchList } = props
    const [searchList, setSearchList] = useState(parentSearchList)
    useEffect(()=>{
        setSearchList(parentSearchList)
    }, [parentSearchList])

    const splitString = (str) => {
        const regex = new RegExp(`(${parentSearch})`, 'g')
        const splitStr = str.split(regex)
        const extracted = splitStr.filter((item) => item !== '')
        return extracted
    }
    const onPress = (exercise) => navigation.navigate('Dictionary_2', {exercise})

    return(
        <AutoSearchContainer> 
            {
                searchList === undefined?
                null
                :
                searchList.map((words, i)=>{
                    let splitedString = splitString(words.name)
                    return(
                        <AutoSearch 
                            onPress={()=> onPress(words)}
                            style={ i!=0? {borderTopColor: isDark? `${colors.grey_8}`:`${colors.grey_2}`}: {borderTopWidth: 0}}
                            key={i}
                        >
                            <AutoSearchText style={{color: isDark? `${colors.grey_5}`:`${colors.black}`}}>
                            {
                                splitedString.map((word) => (
                                    word == parentSearch?
                                    <ColoredSearchText style={{color: isDark? `${colors.white}`:`${colors.l_main}`}}>{ word }</ColoredSearchText>
                                    :
                                    <AutoSearchText>{ word }</AutoSearchText>
                                ))
                            }
                            </AutoSearchText>
                        </AutoSearch>
                    )
                })
            }
        </AutoSearchContainer>
    )
}

const AutoSearchContainer = styled.ScrollView`
    width: 100%;
    height: 100%;
`
const AutoSearch = styled.TouchableOpacity`
    padding: 16px  24px;
    border-top-width: 1px;
`
const AutoSearchText = styled.Text`
    font-family: Pretendard-Medium;
    font-size: 15px;
`
const ColoredSearchText = styled.Text`
    font-family: Pretendard-Medium;
    font-size: 15px;
`
