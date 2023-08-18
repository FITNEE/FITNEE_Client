import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { styled } from "styled-components/native";
import { colors } from "../../colors";
import axios from "axios";
import { Dimensions } from "react-native";
import { ScreenWidth } from "../../Shared";
import { useIsFocused } from "@react-navigation/native";
import Right from "../../assets/SVGs/Right.svg";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";
import Toast from "react-native-toast-message";

const Profile = styled.View`
  align-items: center;
  margin-top: 35px;
  margin-bottom: 32px;
`;
const ProfileImage = styled.TouchableOpacity`
  width: 88px;
  height: 88px;
  background-color: ${colors.grey_2};
  border-radius: 88px;
`;
const Block = styled.View`
  flex-direction: row;
  padding: 15px 24px;
`;
const NickBlock = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px 24px;
`;
const NickContent = styled.View`
  width: ${ScreenWidth - 148}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const MiniBlock = styled.View`
  height: 48px;
  justify-content: center;
`;
const Click = styled.View`
  margin-right: 24px;
  align-items: flex-end;
`;
const Container = styled.View`
  background-color: ${({ isDark }) => (isDark ? colors.grey_9 : colors.white)};
  height: 100%;
`;
const BlockTitle = styled.Text`
  width: 100px;
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 25.5px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`;
const BlockContent = styled.Text`
  width: ${ScreenWidth - 148}px;
  text-align: right;
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 25.5px;
  color: ${({ isDark }) => (isDark ? colors.grey_3 : colors.grey_7)};
`;
const ClickText = styled.Text`
  width: 80px;
  text-align: right;
  font-size: 13px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  text-decoration-line: underline;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`;
const NickText = styled.Text`
  text-align: right;
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 25.5px;
  color: ${({ isDark }) => (isDark ? colors.grey_3 : colors.grey_7)};
`;
const Bar = styled.View`
  height: 16px;
  background-color: ${({ isDark }) => (isDark ? colors.black : colors.grey_1)};
`;

export default function UserInfo({ route, navigation }) {
  const isFocused = useIsFocused();
  const isDark = useRecoilValue(IsDarkAtom);

  useEffect(() => {
    if (route.params?.showToast) {
      Toast.show({
        type: "customToast",
        text1: route.params.toastMessage,
        visibilityTime: 2000,
        position: "bottom",
        props: { isDark: isDark },
      });
    }
  }, [route.params]);

  const [userInfo, setUserInfo] = useState([
    {
      birthYear: "",
      userId: "",
      userNickname: "",
      gender: "",
    },
  ]);

  const getUserInfoData = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/userinfo`;
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    isFocused &&
      getUserInfoData().then((result) => {
        setUserInfo(result.result);
      });
  }, [isFocused]);

  const getUserName = userInfo[0].userNickname;
  const getBirthYear = userInfo[0].birthYear.toString();
  const getUserId = userInfo[0].userId;
  const getGender = userInfo[0].gender;

  return (
    <SafeAreaView backgroundColor={isDark ? colors.grey_9 : colors.grey_1}>
      <Container isDark={isDark}>
        <Profile>
          <ProfileImage
            style={{ backgroundColor: getGender == 1 ? "blue" : "pink" }}
          ></ProfileImage>
        </Profile>
        <NickBlock onPress={() => navigation.navigate("EditUserInfo")}>
          <BlockTitle isDark={isDark}>닉네임</BlockTitle>
          <NickContent>
            <NickText isDark={isDark}>{getUserName}</NickText>
            <Right
              style={{ marginLeft: 8 }}
              width={20}
              height={20}
              color={colors.grey_7}
            />
          </NickContent>
        </NickBlock>
        <Block>
          <BlockTitle isDark={isDark}>출생년도</BlockTitle>
          <BlockContent isDark={isDark}>{getBirthYear}</BlockContent>
        </Block>
        <Block>
          <BlockTitle isDark={isDark}>이메일 주소</BlockTitle>
          <BlockContent isDark={isDark}>{getUserId}</BlockContent>
        </Block>
        <Bar isDark={isDark} />
        <MiniBlock>
          <Click>
            <ClickText
              isDark={isDark}
              onPress={() => {
                navigation.navigate("EditPW");
              }}
            >
              비밀번호 수정
            </ClickText>
          </Click>
        </MiniBlock>
        <MiniBlock>
          <Click>
            <ClickText isDark={isDark}>회원 탈퇴하기</ClickText>
          </Click>
        </MiniBlock>
      </Container>
    </SafeAreaView>
  );
}
