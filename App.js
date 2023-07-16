import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import CreateRoutineNav from "./navigators/CreateRoutineNav";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <CreateRoutineNav />
    </NavigationContainer>
  );
}
