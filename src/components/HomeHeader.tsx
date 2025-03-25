import { Feather } from '@expo/vector-icons'
import {
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  useToast,
} from 'native-base'

import userPhotoDefault from '../assets/userPhotoDefault.png'
import { TouchableOpacity } from 'react-native'
import { deleteTagUserEmail } from '@/notifications/notificationsTags'

export function HomeHeader() {
  const toast = useToast()

  function handleSignOut() {
    deleteTagUserEmail()

    toast.show({
      placement: 'top',
      bgColor: 'green.500',
      title: 'Tag de notificação excluída',
    })
  }

  return (
    <HStack pt={16} pb={5} px={8} bg="gray.600" alignItems="center">
      <Avatar
        source={userPhotoDefault}
        size={16}
        mr={4}
        borderWidth={2}
        borderColor="gray.400"
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Rodrigo Gonçalves
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleSignOut}>
        <Icon as={Feather} name="log-out" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
