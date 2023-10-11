import React, { useContext, useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { Button, BackButton } from '../../Shared'
import { Input, ScreenKeyboardLayout, StatusText, SubText, Title } from '../../components/Shared/OnBoarding_Shared'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { loggedInState } from '../../recoil/AuthAtom'

const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
`
const InputContainer = styled.View`
  width: 100%;
  flex: 1;
  margin-top: 54px;
`

const Login = ({ route, navigation }) => {
  const isDark = useRecoilValue(IsDarkAtom)
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState)

  const [PW, setPW] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [statusText, setStatusText] = useState('')

  const email = route.params.email
  const postLogin = async (email, PW) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = 'app/user/login'
      console.log(email, PW)
      let data = { userId: email, userPw: PW }
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
    setIsLoading(true)
    postLogin(email, PW).then((response) => {
      console.log(response)
      //로그인 성공 시,
      if (response.code == 1000) {
        AsyncStorage.setItem('accessToken', response.result.accessToken).then(
          console.log('토큰값 AsyncStorage로 저장되었음'),
        )
        setLoggedIn(true)
      } else {
        setStatusText(response.message)
        setIsLoading(false)
      }
    })
  }

  return (
    <ScreenKeyboardLayout isRelative={false} isDark={isDark}>
      <BackButton isDark={isDark} onPress={() => navigation.goBack()} />
      <TextContainer>
        <Title text="다시 만나 반가워요!" isDark={isDark} />
        <SubText text="비밀번호를 입력해주세요." isDark={isDark} />
      </TextContainer>
      <InputContainer>
        <StatusText style={{ color: colors.red }}>{statusText}</StatusText>
        <Input
          style={[
            statusText && { borderWidth: 1, borderColor: colors.red },
            {
              backgroundColor: isDark ? colors.black : colors.white,
              color: isDark ? colors.white : colors.black,
            },
          ]}
          autoCapitalize="none"
          placeholderTextColor={colors.grey_5}
          autoFocus
          onSubmitEditing={() => handlePress()}
          placeholder="password"
          secureTextEntry={true}
          returnKeyType="done"
          blurOnSubmit={false}
          onChangeText={(text) => setPW(text)}
        />
      </InputContainer>
      <Button
        isDark={isDark}
        loading={isLoading}
        enabled={(PW.length >= 4) & !isLoading}
        text="로그인"
        onPress={() => handlePress()}
      />
    </ScreenKeyboardLayout>
  )
}

export default Login
