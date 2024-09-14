import { Flex,Text,Image } from "@chakra-ui/react"
const GoogleAuth = () => {
  return (
    <>
      <Flex alignItems={'center'} justifyContent={'center'} cursor={"pointer"}>
          <Image src="/google.png" w={5} alt="Google Logo"/>
          <Text mx={2} color={"green.500"}>Log in with google account</Text>
        </Flex>
    </>
  )
}

export default GoogleAuth