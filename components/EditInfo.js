import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { styled } from "styled-components/native";

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

function EditInfo () {
    const [name, onChangeName] = useState('초코맛 프로틴');
    const [age, onChangeAge] = useState('1998');

    return (
        <View>
            <InputBlock editable onChangeText={text => onChangeName(text)} value={name}/>
            <InputBlock editable onChangeText={text => onChangeAge(text)} value={age} keyboardType="numeric"/>
        </View>
    );
}

export default EditInfo;