import React, { useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { Button } from '../../Shared'
import { Keyboard, Pressable, StyleSheet } from 'react-native'
import { Title, SubText, Input, StatusText, ScreenKeyboardLayout } from '../../components/Shared/OnBoarding_Shared'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { EMAIL_API_KEY } from '@env'

const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`
const BottomContainer = styled.View`
  align-items: center;
  width: 100%;
  flex: 1;
  padding-top: 76px;
`
const ORContainer = styled.View`
  margin-top: 158px;
  width: 120px;
  height: 13px;
`
const Line = styled.View`
  width: 100%;
  border: ${StyleSheet.hairlineWidth}px solid ${colors.grey_5};
  margin-top: 6px;
`
const ORText = styled.Text`
  color: ${colors.grey_6};
  font-size: 13px;
  position: absolute;
  background-color: ${colors.grey_1};
  width: 40px;
  text-align: center;
  left: 40px;
`
const SNSContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 70%;
  margin-top: 28px;
`
const SNSButton = styled.TouchableOpacity`
  width: 64px;
  background-color: white;
  height: 64px;
`

const OnBoarding = ({ navigation }) => {
  const isDark = useRecoilValue(IsDarkAtom)

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState()
  const [emailWarning, setEmailWarning] = useState('')

  const fetchResult = async (email) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = 'app/user/'
      const queryStr = `?userId=${email}`
      const response = await axios.get(url + detailAPI + queryStr)
      const data = response.data
      return data
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

    const isUserId = email.indexOf('@') != -1 && email.length <= 40 && email.indexOf('.') != -1
    const handleSubmit = () => {
        console.log('submitted')
        setIsLoading(true)
        fetchResult(email).then((data) => {
            switch(data.code){
                case 3003:
                    verifyEmail(email)
                    break
                case 1000:
                    setIsLoading(false)
                    navigation.navigate('Login', {email})
                    break
                case 3007:
                    setIsLoading(false)
                    setEmailWarning('이미 탈퇴한 아이디는 30일 이내에 재가입할 수 없어요.')
                    break
                default:
                    break
            }
        })
    }


  // 이메일 유효성 검증
  const checkEmailVerification = async (email) => {
    try {
      let url = 'https://api.hunter.io/v2/email-verifier'
      const response = await axios.get(url, {
        params: {
          email: email,
          api_key: EMAIL_API_KEY,
        },
      })
      const result = response.data.data
      return result.result
    } catch (error) {
      console.error('Failed to fetch email api:', error)
    }
  }
  const verifyEmail = () => {
    checkEmailVerification(email).then((result) => {
      setIsLoading(false)
      console.log(result)
      switch (result) {
        case 'deliverable':
          console.log('유효한 이메일')
          navigation.navigate('CreateAccount_1', {
            email,
          })
          break
        case 'undeliverable':
          console.log('유효하지 않은 이메일')
          setEmailWarning('유효하지 않은 이메일이에요.')
          // return false
          break
        case 'risky':
          console.log('api 에러 - 재시도 필요')
          setEmailWarning('다시 시도해주세요.')
          // return false
          break
        default:
          console.log('exceptional case for email verifier')
          // return false
          break
      }
    })
  }
  // https://help.hunter.io/en/articles/6103281-what-are-the-possible-verification-statuses-for-an-email
  // https://hunter.io/api-documentation/v2#email-verifier

  return (
    <ScreenKeyboardLayout onPress={() => Keyboard.dismiss()} isDark={isDark}>
      <TextContainer>
        <Title text="이메일을 입력해주세요." isDark={isDark} />
        <SubText text="로그인 또는 회원가입에 필요합니다." isDark={isDark} />
      </TextContainer>
      <BottomContainer>
        {!isValid && email.length <= 40 && (
          <StatusText style={{ color: colors.red, marginTop: 4, width: '100%' }}>{emailWarning}</StatusText>
        )}
        {email.length > 40 && (
          <StatusText style={{ color: colors.red, marginTop: 4, width: '100%' }}>40자 이하로 설정해주세요.</StatusText>
        )}
        <Input
          style={[
            email.length > 40 && { borderWidth: 1, borderColor: colors.red },
            {
              backgroundColor: isDark ? colors.black : colors.white,
              color: isDark ? colors.white : colors.black,
            },
          ]}
          autoCapitalize="none"
          keyboardType="url"
          placeholderTextColor={colors.grey_5}
          onSubmitEditing={() => handleSubmit()}
          placeholder="이메일 입력"
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(text) => setEmail(text)}
        />
        {/* <ORContainer>
            <Line />
            <ORText>또는</ORText>
            </ORContainer>
            <SNSContainer>
            <SNSButton>
                <Text>Google</Text>
            </SNSButton>
            <SNSButton>
                <Text>Kakao</Text>
            </SNSButton>
            <SNSButton>
                <Text>Naver</Text>
            </SNSButton>
            </SNSContainer> */}
        </BottomContainer>
        <Button loading={isLoading} isDark={isDark} enabled={isUserId && !isLoading} onPress={() => handleSubmit()} />
    </ScreenKeyboardLayout>
  )
}

export default OnBoarding
