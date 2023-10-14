import { AppState } from 'react-native'
import notifee, { AndroidImportance, AndroidColor } from '@notifee/react-native'

const displayNotification = async (message) => {
  const channelAnoucement = await notifee.createChannel({
    id: 'default',
    name: '카테고리 이름',
    importance: AndroidImportance.HIGH,
  })

  await notifee.displayNotification({
    title: message.data.title,
    body: message.data.body,
    android: {
      channelId: channelAnoucement,
      //   smallIcon: require('../assets/AppIcon.png'), //
      importance: AndroidImportance.HIGH,
      asForegroundService: true,
    },
  })
}

export default {
  displayNoti: (remoteMessage) => displayNotification(remoteMessage),
}
