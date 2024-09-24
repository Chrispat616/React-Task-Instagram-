import { Box, Container, Flex, Image, VStack } from '@chakra-ui/react';
import AuthForm from '../../Components/AuthForm/AuthForm';
const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"container.md"} padding={0}>
          <Flex justifyContent={"center"} alignItems={"center"}  gap={10} >
              {/*left hand-side */}
            <Box display={{base:"none",md:"block"}}>
                <Image src='/auth3.png' h={650} alt='Phone img'/>

            </Box>
             {/*Right Hand-side*/}
            <VStack spacing={4} align={"stretch"}>
             <AuthForm/>
             <Box textAlign={"center"}>Get The App.</Box>
             <Flex gap={5} justifyContent={"center"} >
               <Image src='/playstore.png' height={"10"} alt='Playstore logo'/>
               <Image src='/microsoft.png' height={"10"} alt='Microsoft logo'/>
              </Flex>
            </VStack>
          </Flex>
        </Container>
      </Flex>
  )
}
export default AuthPage;