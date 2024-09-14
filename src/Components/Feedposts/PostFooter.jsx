import { Flex, Box, Text, InputRightElement, InputGroup, Button, Input} from "@chakra-ui/react";
import { useState } from "react";
import {CommentLogo, NotificationsLogo, UnlikeLogo, MessagesLogo, BookMarkLogo} from '../../assets/constants'

const PostFooter = ({username, isProfilePage}) => {
  const[liked,setLiked]= useState(false);
  const[likes, setLikes] =useState(2100);
  const [comment, setComment] = useState("");

  const handleLike = () =>{
    if(liked){
      setLiked(false);
      setLikes(likes -1);
    }else {
      setLiked(true);
      setLikes(likes +1);
    }
  }
  const handleCommentChange = (e) => {
    setComment(e.target.value); 
  };
  return (
    <>
    <Box mb={8} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mt={"2"}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
          {!liked ? (<NotificationsLogo/>): (<UnlikeLogo/>)}
        </Box>
        <Box cursor={"pointer"} fontSize={18}>
          <CommentLogo/>
        </Box>
        <Box cursor={"pointer"} fontSize={18}>
          <MessagesLogo/>
        </Box>
        <Box  cursor={"pointer"}  ml={"auto"} >
            <BookMarkLogo />  
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}> 
        {likes} likes
      </Text>
     {!isProfilePage && (
      <>
         <Text fontSize={"sm"} fontWeight={700}>
        {username}{"   "}
        <Text as='span'  fontWeight={400}>
         We just getting started 
        </Text>
      </Text>
      <Text fontSize={"small"} color={"grey"} cursor={"pointer"} >
        View all 1,500 comments
      </Text>
      </>)}
      <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
      <InputGroup >
      <Input variant={"flushed"} placeholder={"Add a comment..."} fontSize={14}
      value={comment} 
      onChange={handleCommentChange} 
      />
       <InputRightElement>
       {comment && ( // Conditionally render button based on comment state
         <Button  fontSize={14} 
         color={"grey"} 
         fontWeight={600} 
         cursor={"pointer"} 
         _hidden={true} 
         _hover={{color: "white"}} 
         bg={"transparent"}>
          Post
         </Button>
         )}
       </InputRightElement>
      </InputGroup>
    </Flex>
    </Box>
    </>
  )
}
export default PostFooter