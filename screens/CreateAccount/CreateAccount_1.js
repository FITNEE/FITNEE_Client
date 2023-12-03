import React, { useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { Button, BackButton } from '../../Shared'
import { Input, StatusText, Title, SubText, ScreenKeyboardLayout } from '../../components/Shared/OnBoarding_Shared'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'

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
`

const CreateAccount_1 = ({ route, navigation }) => {
  const isDark = useRecoilValue(IsDarkAtom)
  const [PW, setPW] = useState('')
  const [rewrittenPW, setRewrittenPW] = useState('')
  const [rewrite, setRewrite] = useState(false)
  const email = route.params.email

  const rewritePW = () => {
    console.log('rewritePW')
    setRewrite(true)
  }

  const handlePress = () => {
    navigation.navigate('CreateAccount_2', {
      email,
      PW,
    })
  }
  return (
    <ScreenKeyboardLayout isDark={isDark}>
      <BackButton isDark={isDark} onPress={() => navigation.goBack()} />
      <TextContainer>
        <Title text="환영해요! 계정을 생성할게요." isDark={isDark} />
        <SubText text={rewrite ? '비밀번호를 다시 입력해주세요.' : '비밀번호를 입력해주세요.'} isDark={isDark} />
      </TextContainer>
      {rewrite ? (
        <InputContainer style={{ marginTop: 54 }}>
          <StatusText style={{ color: rewrittenPW == PW ? colors.green : colors.red }}>
            {rewrittenPW.length == 0
              ? ''
              : rewrittenPW == PW
              ? '비밀번호가 일치합니다'
              : '비밀번호가 일치하지 않습니다'}
          </StatusText>
          <Input
            style={{
              backgroundColor: isDark ? colors.black : colors.white,
              color: isDark ? colors.white : colors.black,
            }}
            placeholderTextColor={colors.grey_3}
            autoFocus
            value={rewrittenPW}
            onSubmitEditing={() => {
              rewrittenPW == PW && handlePress()
            }}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            returnKeyType="done"
            blurOnSubmit={false}
            onChangeText={(text) => setRewrittenPW(text)}
          />
        </InputContainer>
      ) : (
        <InputContainer style={{ marginTop: 54 }}>
          <Input
            style={{
              backgroundColor: isDark ? colors.black : colors.white,
              color: isDark ? colors.white : colors.black,
            }}
            placeholderTextColor={colors.grey_5}
            autoFocus
            autoCapitalize="none"
            onSubmitEditing={() => rewritePW()}
            placeholder="password"
            secureTextEntry={true}
            returnKeyType="done"
            blurOnSubmit={false}
            onChangeText={(text) => setPW(text)}
          />
        </InputContainer>
      )}

      <Button
        isDark={isDark}
        enabled={rewrite ? rewrittenPW == PW : PW.length >= 4}
        onPress={rewrite ? () => handlePress() : () => rewritePW()}
      />
    </ScreenKeyboardLayout>
  )
}

export default CreateAccount_1
