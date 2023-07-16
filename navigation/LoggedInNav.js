import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNav from './HomeNav';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
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
      <Tabs.Screen name='HomeNav'>{() => <HomeNav />}</Tabs.Screen>
      <Tabs.Screen name='MyRoutineNav'>{() => <MyRoutineNav />}</Tabs.Screen>
      <Tabs.Screen name='ExerciseNav'>{() => <ExerciseNav />}</Tabs.Screen>
      <Tabs.Screen name='ExerciseDictNav'>
        {() => <ExerciseDictNav />}
      </Tabs.Screen>
      <Tabs.Screen name='MyPageNav'>{() => <MyPageNav />}</Tabs.Screen>
    </Tabs.Navigator>
  );
}
