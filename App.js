import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import AppBase from "./AppBase";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <AppBase />
      </NavigationContainer>
    </RecoilRoot>
  );
}
