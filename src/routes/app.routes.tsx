import { Platform } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useTheme } from 'native-base'

import { Cart } from '../screens/Cart'
import { Home } from '../screens/Home'
import { Details } from '../screens/Details'
import { useCart } from '@/hooks/useCart'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors, sizes } = useTheme()
  const { cart } = useCart()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
          paddingTop: Platform.OS === 'ios' ? 20 : 5,
        },
      }}
    >
      <Screen
        name="products"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={sizes[6]} />
          ),
        }}
      />

      <Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-bag" color={color} size={sizes[6]} />
          ),
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.green[500],
            color: colors.white,
          },
        }}
      />

      <Screen
        name="details"
        component={Details}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
    </Navigator>
  )
}
