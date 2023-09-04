import styled from 'styled-components/native'

export default function Terms() {
  return (
    <TermsContainer>
      <CheckContainer>
        <Check>
          <CheckText />
        </Check>
      </CheckContainer>
    </TermsContainer>
  )
}

const TermsContainer = styled.View``
const CheckContainer = styled.View``
const Check = styled.TouchableOpacity``
const CheckText = styled.Text``
const TermsAll = styled.View``
const TermsOfService = styled.View``
const TermsOfData = styled.View``
const Text = styled.Text``
