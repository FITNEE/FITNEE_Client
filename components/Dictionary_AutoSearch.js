import React from 'react'
import styled from 'styled-components/native'
import {colors} from '../colors'

const AutoSearchContainer = styled.ScrollView`
    width: 100%;
    height: 100%;
`
const AutoSearch = styled.TouchableOpacity`
    padding: 24px 16px;

    border-top-width: 1px;
    border-top-color: ${colors.grey_1};
`
const AutoSearchText = styled.Text`
    font-weight: 500;
    font-size: 15px;
    color: ${colors.black}; 
    display: inline;
`

export default function Dictionary_AutoSearch(props){

    const navigateToDic3 = () => props.navigateToDic3()


    return(
        <AutoSearchContainer> 
            {/* 라이트모드 다크모드 컬러 설정 필요 */}
            <AutoSearch onPress={navigateToDic3}>
                <AutoSearchText style={{color: '#9747FF'}}>사
                    <AutoSearchText>이드 레터럴 라이즈</AutoSearchText>
                </AutoSearchText>
            </AutoSearch>
            <AutoSearch>
                <AutoSearchText >사이드 
                    <AutoSearchText style={{color: '#9747FF'}}> 레터럴 </AutoSearchText>
                    라이즈
                </AutoSearchText>
            </AutoSearch>
            <AutoSearch>
                <AutoSearchText>사이드 레터럴 라이즈</AutoSearchText>
            </AutoSearch>
        </AutoSearchContainer>
    )
}