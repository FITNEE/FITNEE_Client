import React, { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { styled } from "styled-components/native";
import { colors } from "../../colors";

    const Container = styled.View`
        background-color: #fff;
        height: 100%;
    `;
    const Profile = styled.View`
        align-items: center;
        margin-top: 12px;
        margin-bottom: 32px;
    `;
    const ProfileImage = styled.TouchableOpacity`
        width: 88px;
        height: 88px;
        background-color: ${colors.grey_2};
        border-radius: 88px;
    `;
    const InputBlock = styled.TextInput`
        background-color: #f3f3f3;
        padding: 0px 16px;
        width: 327px;
        height: 48px;
        border-radius: 8px;
        margin: 0px 24px 10px 24px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
    `;
    const Block = styled.View`
        background-color: #f3f3f3;
        padding: 0px 16px;
        justify-content: center;
        width: 327px;
        height: 48px;
        border-radius: 8px;
        margin: 0px 24px;
    `;

export default function EditUserInfo({ navigation }) {

    const USER_DATA = [
        {
            id: 1,
            username: '초코맛 프로틴',
            birth: 1998,
            email: 'protein012@gamil.com'
        }
    ];

    const [name, onChangeName] = useState('초코맛 프로틴');
    const [birth, onChangeBirth] = useState('1998');
    const email = useState(['protein012@gmail.com']);

    return (
    <SafeAreaView>
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <Container>
            <Profile><ProfileImage></ProfileImage></Profile>
            <InputBlock editable onChangeText={text => onChangeName(text)} value={name}/>
            <InputBlock editable onChangeText={text => onChangeAge(text)} value={birth} keyboardType="numeric"/>
            <Block><Text style={{
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 24,
                color: colors.grey_3
            }}>{email}</Text></Block>
        </Container>
    </TouchableWithoutFeedback>
    </SafeAreaView>
    );
}