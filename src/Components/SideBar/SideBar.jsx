import { Avatar, Box, Flex, Link, Tooltip } from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"; 

import { InstagramLogo,
     InstagramMobileLogo, 
     CreatePostLogo, 
     SearchLogo,
    NotificationsLogo, 
    ReelsLogo,
    MessagesLogo,
ExploreLogo,
ThreadsLogo,
MenuLogo} from "../../assets/constants";
import { GoHomeFill } from "react-icons/go";



const SideBar = () => {
 const sideBarItems=[
    {
        icon: <GoHomeFill size={25}/>,
        text: "Home",
        link: "/",
    },
    {
        icon: <SearchLogo/>,
        text : "Search",

    },
    {
        icon: <ExploreLogo/>,
        text : "Explore",

    },
    {
        icon: <ReelsLogo/>,
        text: "Reels",
    },
    {
        icon: <MessagesLogo/>,
        text: "Messages",
    },
    {
        icon: <NotificationsLogo/>,
        text: "Notifications",
    },
    {
        icon: <CreatePostLogo/>,
        text: "Create",
    },
   
    {
        icon: <Avatar size={"sm"} name="LP" src="/pato.png"/>,
        text: "Profile",
        link: "/Legendary"

    },
    { 
        
        icon: <ThreadsLogo  />,
        text: "Threads",
    },
    {
        icon: <MenuLogo/>,
        text: "Menu",
    },
   
]
  return <Box h={"100vh"} 
  borderRight={"1px solid"}  
  borderColor={"whiteAlpha.300" }
  py={8}
  position={"sticky"}
  top={0}
  left={0}
  px={{base:2,md:4}}>

<Flex direction={"column"} gap={10} w="full" h={"full"}>
    <Link to={"/"} as= {RouterLink} pl={2} display={{base:"none", md: "block"}} cursor="pointer">
      <InstagramLogo />
    </Link>
    <Link to={"/"} as= {RouterLink} p={2} display={{base:"block", md: "none"}} 
    borderadius ={6}
    _hover ={{
        bg:"whiteAlpha.200"
    }}
    width ={10}
    cursor="pointer">
      <InstagramMobileLogo />
    </Link>
    <Flex direction={"column"} gap={5} cursor={"pointer"}>
        {sideBarItems.map((item, index)=>(
            <Tooltip
            key={index}
            hasArrow
            label={item.text}
            placement="right"
            ml={1}
            openDelay={500}
            display={{base:'block', md:'none'}}
            >
              <Link
                display={"flex"}
                to = {item.link || null}
                as = {RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{bg:"whiteAlpha.400"}}
                borderRadius={6}
                padding={2}
                w={{base:10, md:"full"}}
                justifyContent={{base: "center", md:"flex-start"}}

                >
                  {item.icon}  
                  <Box display={{base:"none", md:"block"}}>
                    {item.text}
                  </Box>
              </Link>

            </Tooltip>

        ))}

    </Flex>

</Flex>

  </Box>;
}
export default SideBar;