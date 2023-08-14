import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Detail Screen</Text>
    </View>
  );
}

function CustomHeader({ title }) {
  const navigation = useNavigation();

  function goBackHandler() {
    navigation.goBack();
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Button title="Back" onPress={goBackHandler} />
      <Text style={{ marginLeft: 10 }}>{title}</Text>
    </View>
  );
}

CustomHeader.defaultProps = {
  title: "Default Title",
};

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: (props) => <CustomHeader {...props} />,
        }}
      />

      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{
          header: (props) => <CustomHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
