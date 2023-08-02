import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";

const DynamicForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const [inputPairs, setInputPairs] = useState([]);

  const addInputPair = () => {
    setInputPairs([...inputPairs, { id: inputPairs.length }]);
  };

  const onFormSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <View>
      {inputPairs.map((inputPair, index) => (
        <View key={inputPair.id} style={{ flexDirection: "row" }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={(text) => onChange(text)}
                value={value}
                placeholder={`Input Pair ${index + 1} - A`}
              />
            )}
            name={`inputPair${inputPair.id}A`}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={(text) => onChange(text)}
                value={value}
                placeholder={`Input Pair ${index + 1} - B`}
              />
            )}
            name={`inputPair${inputPair.id}B`}
            defaultValue=""
          />
        </View>
      ))}
      <Button title="Add Input Pair" onPress={addInputPair} />
      <Button title="Submit" onPress={handleSubmit(onFormSubmit)} />
    </View>
  );
};

export default DynamicForm;
