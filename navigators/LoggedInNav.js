import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNav from "./HomeNav";
import MyRoutineNav from "./MyRoutineNav";
import MyPageNav from "./MyPageNav";
import Tab_Home from "../assets/SVGs/Tab_Home.svg";
import Tab_ExerciseDict from "../assets/SVGs/Tab_ExerciseDict.svg";
import Tab_Exercise from "../assets/SVGs/Tab_Exercise.svg";
import Tab_MyPage from "../assets/SVGs/Tab_MyPage.svg";
import Tab_MyRoutine from "../assets/SVGs/Tab_MyRoutine.svg";
import { colors } from "../colors";
import { WithLocalSvg } from "react-native-svg";
import { styled } from "styled-components/native";
import DictionaryNav from "./DictionaryNav";
import ExerciseCourseNav from "./ExerciseCourseNav";

const IconText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  margin-top: 4px;
`;
const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 10,
          height: 88,
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
      <Tabs.Screen
        name="HomeNav"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <WithLocalSvg
                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                width={24}
                height={24}
                asset={Tab_Home}
              />

              <IconText
                style={{ color: focused ? colors.l_main : colors.grey_7 }}
              >
                홈
              </IconText>
            </>
          ),
        }}
      >
        {() => <HomeNav />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MyRoutineNav"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <WithLocalSvg
                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                width={24}
                height={24}
                asset={Tab_MyRoutine}
              />
              <IconText
                style={{ color: focused ? colors.l_main : colors.grey_7 }}
              >
                마이 루틴
              </IconText>
            </>
          ),
        }}
      >
        {() => <MyRoutineNav />}
      </Tabs.Screen>
      <Tabs.Screen
        name="ExerciseNav"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <WithLocalSvg
                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                width={24}
                height={24}
                asset={Tab_Exercise}
              />
              <IconText
                style={{ color: focused ? colors.l_main : colors.grey_7 }}
              >
                운동하기
              </IconText>
            </>
          ),
        }}
      >
        {() => <ExerciseCourseNav />}
      </Tabs.Screen>
      <Tabs.Screen
        name="ExerciseDictNav"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <WithLocalSvg
                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                width={24}
                height={24}
                asset={Tab_ExerciseDict}
              />
              <IconText
                style={{ color: focused ? colors.l_main : colors.grey_7 }}
              >
                운동사전
              </IconText>
            </>
          ),
        }}
      >
        {() => <DictionaryNav />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MyPageNav"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <>
              <WithLocalSvg
                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                width={24}
                height={24}
                asset={Tab_MyPage}
              />

              <IconText
                style={{ color: focused ? colors.l_main : colors.grey_7 }}
              >
                MY
              </IconText>
            </>
          ),
        }}
      >
        {() => <MyPageNav />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
