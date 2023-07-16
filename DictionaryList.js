import React, { useState } from 'react'
import { ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native';
import { colors } from './colors'

const Container = styled.View`
    flex: 1;
`
const TopContainer = styled.View`
    padding: 8px 24px;

    justify-content: center;
    align-items: center; 

    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey1};
`
const SearchContainer = styled.View`
    background-color: ${colors.grey1};

    border-radius: 12px;
    padding: 8px 12px;

    flex-direction: row;
    align-items: center;

    width: 100%;
`
const Logo = styled.Image`
    width: 24px;
    height: 24px;
    background-color: red;

    margin-right: 12px;
`
const SearchInput = styled.TextInput`
    font-size: 16px;
    font-weight: 400;
    color: ${colors.black};

    /* width: 268px; */
` 
const PartContainer = styled.ScrollView`
    margin-top: 8px;
`
const Part = styled.TouchableOpacity`
    border-radius: 15px;
    background-color: ${colors.grey1};
 
    padding: 8px 20px;
    margin-right: 8px;
`
const PartText = styled.Text`
    font-weight: 600;
    font-size: 14px;
    color: ${colors.black};
`

export default function DictionaryList(){

    const [part, setPart] = useState(['전신', '어깨', '팔', '가슴', '등', '복근'])

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Container>
                <TopContainer>
                    <SearchContainer>
                        <Logo/>
                        <SearchInput/>
                    </SearchContainer>
                    <PartContainer horizontal>
                    {
                        part.map((partName) => (
                            <Part><PartText>{partName}</PartText></Part>
                        ))
                    }
                    </PartContainer>
                </TopContainer>

            </Container>
        </SafeAreaView>
    )
}