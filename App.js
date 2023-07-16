import { StatusBar } from 'expo-status-bar';
import DictionaryNav from './DictionaryNav'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return(
    <NavigationContainer>
      <DictionaryNav/>
    </NavigationContainer>   
  );
}

