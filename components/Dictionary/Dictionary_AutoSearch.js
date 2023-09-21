import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { useRecoilValue } from 'recoil'
import axios from 'axios'

export default function Dictionary_AutoSearch(props) {
    const isDark = useRecoilValue(IsDarkAtom)

    const { navigation, parentSearch, parentSearchList } = props
    const [searchList, setSearchList] = useState(parentSearchList)
    useEffect(() => {
        setSearchList(parentSearchList)
    }, [parentSearchList])

    const splitString = (str) => {
        const regex = new RegExp(`(${parentSearch})`, 'g')
        const splitStr = str.split(regex)
        const extracted = splitStr.filter((item) => item !== '')
        return extracted
    }
    

    // 자동완성 리스트 클릭시 검색어 저장 후 상세페이지로 이동
    const onPress = (exercise) => {
        postKeywords(parentSearch)
        navigation.navigate('Dictionary_2', { exercise })
    }

    // 검색한 단어를 최근 검색 키워드에 저장하는 API
    const postKeywords = async (search) => {
        try {
            let url = 'https://gpthealth.shop/'
            let detailAPI = '/app/dictionary/usersearch'
            const response = await axios.post(url + detailAPI, null, {
                params: {
                    search: search,
                },
            })
            const result = response.data

            if (result.isSuccess) console.log(`검색기록 저장 성공(검색어: ${search})`)
            else console.log(`검색기록 저장 실패(검색어: ${search})`)
        } catch (error) {
            console.error('Failed to fetch data:', error)
        }
    }

    return (
        <AutoSearchContainer>
            {searchList === undefined
                ? null
                : searchList.map((words, i) => {
                      let splitedString = splitString(words.name)
                      return (
                          <AutoSearch
                              onPress={() => onPress(words)}
                              style={
                                  i != 0
                                      ? { borderTopColor: isDark ? `${colors.grey_8}` : `${colors.grey_2}` }
                                      : { borderTopWidth: 0 }
                              }
                              key={i}
                          >
                              <AutoSearchText style={{ color: isDark ? `${colors.grey_5}` : `${colors.black}` }}>
                                  {splitedString.map((word, index) =>
                                      word == parentSearch ? (
                                          <ColoredSearchText
                                              key={index}
                                              style={{ color: isDark ? `${colors.white}` : `${colors.l_main}` }}
                                          >
                                              {word}
                                          </ColoredSearchText>
                                      ) : (
                                          <AutoSearchText key={index}>{word}</AutoSearchText>
                                      ),
                                  )}
                              </AutoSearchText>
                          </AutoSearch>
                      )
                  })}
        </AutoSearchContainer>
    )
}

const AutoSearchContainer = styled.ScrollView`
    width: 100%;
    height: 100%;
`
const AutoSearch = styled.TouchableOpacity`
    padding: 16px 24px;
    border-top-width: 1px;
    height: 55px;
`
const AutoSearchText = styled.Text`
    font-family: Pretendard-Medium;
    font-size: 15px;
    line-height: 22.5px;
`
const ColoredSearchText = styled.Text`
    font-family: Pretendard-Medium;
    font-size: 15px;
    line-height: 22.5px;
`
