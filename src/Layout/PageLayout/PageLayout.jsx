import { Flex, Box } from "@chakra-ui/react";
import SideBar from "../../Components/SideBar/SideBar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;
  return (
    <Flex>
      {/* Side bar on the Left */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      ) : null}
      {/* Page Content on the Right */}
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 70px)" }}>
        {children}
      </Box>
    </Flex>
  );
};
export default PageLayout;
