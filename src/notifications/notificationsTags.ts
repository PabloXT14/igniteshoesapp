import { OneSignal } from 'react-native-onesignal'

export function createTagUserEmail(email: string) {
  OneSignal.User.addTag('user_email', email)
}
