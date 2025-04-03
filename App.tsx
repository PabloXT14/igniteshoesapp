import { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { type NotificationClickEvent, OneSignal } from 'react-native-onesignal'

import { Routes } from './src/routes'

import { THEME } from './src/theme'
import { Loading } from './src/components/Loading'

import { CartContextProvider } from './src/contexts/CartContext'
import { createUserInfoTags } from '@/notifications/notificationsTags'

OneSignal.initialize(process.env.ONESIGNAL_APP_ID)
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  createUserInfoTags()

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent) => {
      console.log('NOTIFICATION CLICKED: ', event)
    }

    OneSignal.Notifications.addEventListener('click', handleNotificationClick)

    return () =>
      OneSignal.Notifications.removeEventListener(
        'click',
        handleNotificationClick
      )
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  )
}
