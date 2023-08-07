import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNav from "./HomeNav";
import MyRoutineNav from "./MyRoutineNav";
import MyPageNav from "./MyPageNav";
import { AppContext } from "../components/ContextProvider";
import { useContext } from "react";
import ExerciseCourseNav from "./ExerciseCourseNav";
import DictionaryNav from "./DictionaryNav";
import { useRoute } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  const { isTabVisible } = useContext(AppContext);

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: isTabVisible ? "flex" : "none",
          backgroundColor: "#ffffff",
          borderTopColor: "rgba(255,255,255,0.3)",
          shadowOpacity: 0.25,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 3.84,
        },
        tabBarActiveTintColor: "#0351ea",
      }}
    >
      <Tabs.Screen name="HomeNav">{() => <HomeNav />}</Tabs.Screen>
      <Tabs.Screen name="MyRoutineNav">{() => <MyRoutineNav />}</Tabs.Screen>
      <Tabs.Screen name="ExerciseCourseNav">
        {() => <ExerciseCourseNav />}
      </Tabs.Screen>
      <Tabs.Screen name="DictionaryNav">{() => <DictionaryNav />}</Tabs.Screen>
      <Tabs.Screen name="MyPageNav">{() => <MyPageNav />}</Tabs.Screen>
    </Tabs.Navigator>
  );
}
