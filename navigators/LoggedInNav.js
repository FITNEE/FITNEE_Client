import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNav from './HomeNav'
import MyRoutineNav from './MyRoutineNav'
import MyPageNav from './MyPageNav'
import DictionaryNav from './DictionaryNav'
import { AppContext } from '../components/ContextProvider'
import { useContext } from 'react'
import Tab_Home from '../assets/SVGs/Tab_Home.svg'
import Tab_ExerciseDict from '../assets/SVGs/Tab_ExerciseDict.svg'
import Tab_Exercise from '../assets/SVGs/Tab_Exercise.svg'
import Tab_MyPage from '../assets/SVGs/Tab_MyPage.svg'
import Tab_MyRoutine from '../assets/SVGs/Tab_MyRoutine.svg'
import { colors } from '../colors'
import { styled } from 'styled-components/native'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom, TabBarAtom } from '../recoil/MyPageAtom'
import ExerciseCourseNav from './ExerciseCourseNav'
import { ScreenWidth } from '../Shared'

const IconText = styled.Text`
    font-size: 10px;
    font-weight: 500;
    margin-top: 4px;
`
const Tabs = createBottomTabNavigator()

export default function LoggedInNav() {
    const isTabVisible = useRecoilValue(TabBarAtom)
    const isDark = useRecoilValue(IsDarkAtom)

    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    display: isTabVisible ? 'flex' : 'none',

                    paddingTop: ScreenWidth < 400 ? 10 : 0,
                    height: ScreenWidth < 400 ? 88 : 68,
                    backgroundColor: isDark ? colors.grey_9 : colors.white,
                    borderTopColor: 'rgba(255,255,255,0.3)',
                    shadowOpacity: 0.25,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowRadius: 3.84,
                },
                tabBarActiveTintColor: '#0351ea',
            }}
        >
            <Tabs.Screen
                name="HomeNav"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Tab_Home
                                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                                width={24}
                                height={24}
                            />
                            <IconText
                                style={{
                                    fontFamily: 'Pretendard-Medium',
                                    color: focused ? colors.l_main : colors.grey_7,
                                }}
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
                            <Tab_MyRoutine
                                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                                width={24}
                                height={24}
                            />
                            <IconText
                                style={{
                                    fontFamily: 'Pretendard-Medium',
                                    color: focused ? colors.l_main : colors.grey_7,
                                }}
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
                name="ExerciseCourseNav"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Tab_Exercise
                                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                                width={24}
                                height={24}
                            />
                            <IconText
                                style={{
                                    fontFamily: 'Pretendard-Medium',
                                    color: focused ? colors.l_main : colors.grey_7,
                                }}
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
                name="DictionaryNav"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Tab_ExerciseDict
                                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                                width={24}
                                height={24}
                            />
                            <IconText
                                style={{
                                    fontFamily: 'Pretendard-Medium',
                                    color: focused ? colors.l_main : colors.grey_7,
                                }}
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
                            <Tab_MyPage
                                style={{ color: focused ? colors.l_main : colors.grey_5 }}
                                width={24}
                                height={24}
                            />

                            <IconText
                                style={{
                                    fontFamily: 'Pretendard-Medium',
                                    color: focused ? colors.l_main : colors.grey_7,
                                }}
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
    )
}
