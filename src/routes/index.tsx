import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'native-base'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'
import {
  type NotificationWillDisplayEvent,
  OneSignal,
  type OSNotification,
} from 'react-native-onesignal'

import { AppRoutes } from './app.routes'
import { Notification } from '@/components/Notification'

const linking = {
  prefixes: ['igniteshoes://', 'com.rocketseat.igniteshoes://'],
  config: {
    screens: {
      details: {
        path: '/details/:productId',
        parse: {
          productId: (productId: string) => productId,
        },
      },
    },
  },
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotification | null>(null)

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

      // console.log('NOTIFICATION CONTENT: ', response)

      setNotification(response)
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
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </NavigationContainer>
  )
}
