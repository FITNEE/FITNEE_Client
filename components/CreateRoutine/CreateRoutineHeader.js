import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Animated, SafeAreaView } from 'react-native'
import { colors } from '../../colors'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { useRecoilValue } from 'recoil'
import Left from '../../assets/SVGs/Left.svg'
import { ScreenWidth } from '../../Shared'

export default function CreateRoutineHeader({ title, index, children }) {
  const [width, setWidth] = useState(0)
  const navigation = useNavigation()
  const animatedValue = useRef(new Animated.Value(-ScreenWidth * 0.9 + ScreenWidth * 0.25 * index)).current
  // const animatedValue = useRef(new Animated.Value(-320 + 80 * index)).current
  const reactive = useRef(new Animated.Value(-1000)).current
  const isDark = useRecoilValue(IsDarkAtom)
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: -width + (width * (index + 1)) / 4,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [index, width])
  return (
    <>
      <SafeAreaView>
        {index == 4 ? null : ( //
          <HeaderContainer isDark={isDark}>
            <Header isDark={isDark}>
              <BackButton onPress={() => navigation.goBack()}>
                <Left width={24} height={24} color={isDark ? colors.white : colors.black} />
              </BackButton>
              <Title isDark={isDark}>{title}</Title>
            </Header>
            <StackBar
              isDark={isDark}
              onLayout={(e) => {
                const newWidth = e.nativeEvent.layout.width

                setWidth(newWidth)
              }}
            >
              <Animated.View
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                  backgroundColor: isDark ? colors.grey_8 : colors.grey_4,
                  transform: [
                    {
                      translateX: animatedValue,
                    },
                  ],
                }}
              />
            </StackBar>
          </HeaderContainer>
        )}
      </SafeAreaView>
    </>
  )
}
const NoHeader = styled.View`
  height: 80px;
  background-color: #f3f3f3;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
  opacity: 1;
`
const HeaderContainer = styled.View`
  height: 56px;
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
  align-items: center;
  /* justify-content: flex-end; */
  padding: 0px 10px;
`
const Header = styled.View`
  flex-direction: row;
  width: 95%;
  height: 56px;
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
  align-items: center;
  justify-content: center;
  padding: 10px;
  /* margin-top: 44px; */
`
const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 5px;
`
const Title = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 17px;
  /* margin-left: 112px; */
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`

const StackBar = styled.View`
  width: 90%;
  height: 4px;
  background-color: ${(props) => (props.isDark ? colors.grey_9 : colors.grey_2)};
  border-radius: 10px;
  overflow: hidden;
  margin-top: 4px;
`
const StackBarPin = styled.View`
  width: ${({ index }) => (index + 1) * 25}%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`
