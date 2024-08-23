import { Flex, Box } from "@chakra-ui/react";
import SideBar from "../../Components/SideBar/SideBar";
import { useLocation } from "react-router-dom";



const PageLayout = ({children}) => {
    const {pathname} = useLocation();
  return (
    
      
   <Flex >
   
    {/* Side bar on the Left */}
     {pathname !== '/auth' ? (
         <Box w={{base: "70px", md:"240px"}}>
         <SideBar/>
     </Box>
     ) : null}
    {/* Page Content on the Right */}
    <Box flex={1} w={{base: "calc(100% - 70px)", md:"calc(100% - 70px)"}}>
      {children}
    </Box>
   </Flex>
   
  );
};
export default PageLayout
