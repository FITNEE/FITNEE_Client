import React from "react";
import { Text, View } from "react-native";
import { styled } from "styled-components/native";
import Mode from "../components/Mode";

export default function Setting({ navigation }) {
    const Container = styled.View`
        background-color: #fff;
    `;
    const Profile = styled.View`
        flex-direction: row;
        align-items: center;
        margin-top: 24px;
        padding-left: 24px;
        margin-bottom: 22px;
    `;
    const ProfileImage = styled.View`
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: #ddd;
        margin-right: 56px;
    `;
    const ProfileContents = styled.View`
    `;
    const Name = styled.Text`
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: 25.5px;
    `;
    const Edit = styled.TouchableOpacity`
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 19.5px;
    `;
    const Bar = styled.View`
        height: 16px;
        background-color: #f3f3f3;
    `;
    const Block = styled.TouchableOpacity`
        padding: 15px 24px;
        flex-direction: row;
        align-items: center;
    `;
    const BlockText = styled.Text`
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: 25.5px;
    `;
    const BlockContent = styled.View`
        margin-left: auto;
        margin-right: 0;
    `;

    return (
    <Container>
        <Profile>
            <ProfileImage/>
            <ProfileContents>
                <Name>{'초코맛 프로틴'}</Name>
                <Edit onPress={() => { navigation.navigate("UserInfo")}}><Text>계정 정보 수정하기</Text></Edit>
            </ProfileContents>
        </Profile>
        <Block>
            <BlockText>다크화면 모드</BlockText>
            <BlockContent><Mode/></BlockContent>
        </Block>
        <Bar/>
        <Block>
            <BlockText>일반 설정</BlockText>
        </Block>
        <Block>
            <BlockText>알림 설정</BlockText>
        </Block>
        <Block>
            <BlockText>자주 물어보는 질문</BlockText>
        </Block>
        <Block>
            <BlockText>개인정보 처리방침</BlockText>
        </Block>
        <Block>
            <BlockText>서비스 이용약관</BlockText>
        </Block>
        <Block>
            <BlockText>버전 정보</BlockText>
        </Block>
        <Block>
            <BlockText>로그아웃</BlockText>
        </Block>
    </Container>
  );
}