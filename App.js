import CreateRoutineNav from "./navigators/CreateRoutineNav";
import OnBoarding_1 from "./OnBoarding_1";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import OnBoardingNav from "./navigation/OnBoardingNav";
import LoggedInNav from "./navigation/LoggedInNav";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f3f3f3",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <LoggedInNav />
    </NavigationContainer>
  );
}
