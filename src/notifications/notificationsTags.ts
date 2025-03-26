import { OneSignal } from 'react-native-onesignal'

export function createUserInfoTags() {
  OneSignal.User.addTags({
    user_name: 'John Doe',
    user_email: 'johndoe@email.com',
  })
}
