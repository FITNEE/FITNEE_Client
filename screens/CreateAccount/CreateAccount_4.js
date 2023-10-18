import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { Title } from '../../components/Shared/OnBoarding_Shared'
import { Button } from '../../Shared'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { loggedInState } from '../../recoil/AuthAtom'
import routineSuccess from '../../assets/Imgs/routineSuccess.png'

const SubTitle = styled.Text`
  font-family: Pretendard-Regular;
  text-align: center;
  margin-top: 8px;
  font-size: 13px;
  line-height: 18px;
  color: ${colors.black};
`
const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
`
const ImageContainer = styled.View`
  margin-top: -80px;
  width: 80%;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  max-height: 320px;
  border-radius: 9999px;
  aspect-ratio: 1/1;
`
const Thumbnail = styled.Image`
  width: 80%;
`
const ScreenBase = styled.SafeAreaView`
  flex: 1;
`
const ContentBase = styled.SafeAreaView`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  flex: 1;
`
const CreateAccount_4 = ({ route, navigation }) => {
  const isDark = useRecoilValue(IsDarkAtom)
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState)
  const [isLoading, setIsLoading] = useState(true)
  // const routesParams = useRoute()

  const checkTokenValid = async () => {
    let url = 'https://gpthealth.shop/'
    let detailAPI = 'app/user/check'
    const response = await axios.post(url + detailAPI)
    return response.data
  }
  const postUser = async (data) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = 'app/user'
      const response = await axios.post(url + detailAPI, data, {
        headers: {
          'Content-Type': `application/json`,
        },
      })
      const result = response.data
      return result
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  const handlePress = () => {
    let data = {
      userId: route.params.email, //string
      userPw: route.params.PW, //string
      userNickname: route.params.nickname, //string
      gender: route.params.gender,
      height: route.params.height,
      weight: route.params.weight,
      birthYear: route.params.birthYear,
    }
    postUser(data).then((response) => {
      console.log(response)
      if (response.isSuccess) {
        setIsLoading(false)
        checkTokenValid().then((response) => {
          console.log(response)
          AsyncStorage.setItem('accessToken', response.result.accessToken).then(
            console.log('checkTokenValid로 토큰 발급받고, 해당토큰 캐시에 저장하였음.'),
          )
        })
      } else {
        Alert.alert('회원가입 오류', response.message, [
          {
            text: '다시 회원가입하기',
            onPress: () => {
              navigation.navigate('OnBoarding', {})
            },
            style: 'default',
          },
          {
            text: '취소',
            onPress: () => console.log('Cancel Pressed'),
            style: 'default',
          },
        ])
      }
    })
  }

  useEffect(() => {
    handlePress()
  }, [])
  const goBackHome = () => {
    setLoggedIn(true)
  }

  return (
    <ScreenBase style={{ backgroundColor: isDark ? colors.black : colors.grey_1 }}>
      <ContentBase>
        <TextContainer>
          <Title text={isLoading ? '계정을 생성하는 중' : '계정 생성을 완료했어요!'} isDark={isDark} />

          <SubTitle style={{ color: isDark ? colors.white : colors.black }}>
            {isLoading
              ? `잠시만 기다려 주세요
            `
              : `이제 인공지능이 만들어주는
운동루틴을 경험하러 가볼까요?`}
          </SubTitle>
        </TextContainer>
        <ImageContainer source={routineSuccess} style={{ backgroundColor: isDark ? colors.grey_8 : colors.white }}>
          <Thumbnail resizeMode="contain" source={routineSuccess} />
        </ImageContainer>
        <Button loading={isLoading} isDark={isDark} enabled={!isLoading} text="시작하기" onPress={() => goBackHome()} />
      </ContentBase>
    </ScreenBase>
  )
}

export default CreateAccount_4
