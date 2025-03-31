import { useEffect } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'native-base'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'
import {
  type NotificationWillDisplayEvent,
  OneSignal,
} from 'react-native-onesignal'

import { AppRoutes } from './app.routes'

export function Routes() {
  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.gray[800])
    }

    const handleNotification = (event: NotificationWillDisplayEvent) => {
      // Prevenindo comportamento padrão da notificação aparecer na barra de notificações
      event.preventDefault()

      const response = event.getNotification()

      console.log('NOTIFICATION CONTENT: ', response)
    }

    OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      handleNotification
    )

    return () =>
      OneSignal.Notifications.removeEventListener(
        'foregroundWillDisplay',
        handleNotification
      )
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
    </NavigationContainer>
  )
}
