import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { styled } from "styled-components/native";
import { colors } from "../../colors";
import axios from "axios";
import { Dimensions } from "react-native";
import { ScreenWidth } from "../../Shared";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  background-color: #fff;
  height: 100%;
`;
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
const BlockTitle = styled.Text`
  width: 100px;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 25.5px;
`;
const BlockContent = styled.Text`
  width: ${ScreenWidth - 148}px;
  text-align: right;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 25.5px;
  color: ${colors.grey_5};
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
const NickText = styled.Text`
  text-align: right;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 25.5px;
  color: ${colors.grey_5};
`;
const NickIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  background-color: pink;
`;
const Bar = styled.View`
  height: 16px;
  background-color: #f3f3f3;
`;
const MiniBlock = styled.View`
  height: 48px;
  justify-content: center;
`;
const Click = styled.TouchableOpacity`
  margin-right: 24px;
`;
const ClickText = styled.Text`
  text-align: right;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px;
  text-decoration-line: underline;
`;

export default function UserInfo({ navigation }) {
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState([
    {
      birthYear: "",
      userId: "",
      userNickname: "",
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

  return (
    <SafeAreaView>
      <Container>
        <Profile>
          <ProfileImage></ProfileImage>
        </Profile>
        <NickBlock>
          <BlockTitle>닉네임</BlockTitle>
          <NickContent>
            <NickText>{getUserName}</NickText>
            <NickIcon />
          </NickContent>
        </NickBlock>
        <Block>
          <BlockTitle>출생년도</BlockTitle>
          <BlockContent>{getBirthYear}</BlockContent>
        </Block>
        <Block>
          <BlockTitle>이메일 주소</BlockTitle>
          <BlockContent>{getUserId}</BlockContent>
        </Block>
        <Bar />
        <MiniBlock>
          <Click
            onPress={() => {
              navigation.navigate("EditPW");
            }}
          >
            <ClickText>비밀번호 수정</ClickText>
          </Click>
        </MiniBlock>
        <MiniBlock>
          <Click>
            <ClickText>회원 탈퇴하기</ClickText>
          </Click>
        </MiniBlock>
      </Container>
    </SafeAreaView>
  );
}
