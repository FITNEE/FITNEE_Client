import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../colors'
import { useEffect, useState } from 'react'

export default function Terms({ handleSubmit }) {
  const [all, setAll] = useState(false)
  const [serviceTerms, setServiceTerms] = useState(false)
  const [dataTerms, setDataTerms] = useState(false)
  useEffect(() => {
    setAll(serviceTerms && dataTerms)
  }, [serviceTerms, dataTerms])
  const pressAll = () => {
    setAll(!all)
    setServiceTerms(!all ? true : false)
    setDataTerms(!all ? true : false)
  }
  const pressCheck = () => {
    handleSubmit()
  }
  return (
    <TermsContainer>
      <CheckContainer>
        <Check onPress={pressCheck} disabled={!all}>
          <CheckText>확인</CheckText>
        </Check>
      </CheckContainer>
      <TermsAll all={all} style={{ borderWidth: 1, borderColor: all ? colors.l_main : 'transparent' }}>
        <Agree onPress={pressAll}>
          <Ionicons name="checkbox" size={28} color={all ? colors.l_main : '#D9D9D9'} />
        </Agree>
        <Text>약관 전체 동의</Text>
      </TermsAll>
      <TermsOfService>
        <Agree onPress={() => setServiceTerms(!serviceTerms)}>
          <Ionicons name="checkbox" size={28} color={serviceTerms ? colors.grey_5 : '#D9D9D9'} />
        </Agree>
        <Text>서비스 이용약관</Text>
        <Essential>필수</Essential>
      </TermsOfService>
      <TermsOfService>
        <Agree onPress={() => setDataTerms(!dataTerms)}>
          <Ionicons name="checkbox" size={28} color={dataTerms ? colors.grey_5 : '#D9D9D9'} />
        </Agree>
        <Text>개인정보 수집 및 목적</Text>
        <Essential>필수</Essential>
      </TermsOfService>
    </TermsContainer>
  )
}

const TermsContainer = styled.View`
  align-items: center;
`
const CheckContainer = styled.View``
const Check = styled.TouchableOpacity`
  margin-top: 20px;
  margin-left: 313px;
  margin-bottom: 16px;
`
const Agree = styled.TouchableOpacity``
const CheckText = styled.Text`
  font-size: 17px;
  color: ${colors.l_main};
  font-weight: 600;
  line-height: 25.5px; /* 25.5px */
`
const TermsAll = styled.View`
  flex-direction: row;
  align-items: center;
  width: 327px;
  height: 50px;
  background-color: ${(props) => (props.all ? colors.l_sub_2 : colors.grey_1)};
  border-radius: 12px;
  padding: 8px;
`
const TermsOfService = styled.View`
  flex-direction: row;
  flex-direction: row;
  align-items: center;
  width: 327px;
  height: 50px;
  border-radius: 12px;
  padding: 8px;
`

const Text = styled.Text`
  margin-left: 8px;
  font-size: 17px;
  font-weight: 500;
`
const Essential = styled.Text`
  color: ${colors.red};
  margin-left: 4px;
`
