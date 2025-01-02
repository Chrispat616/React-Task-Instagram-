import CreatePost from "./CreatePost";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Messages from "./Messages";

const SidarBarItems = () => {
  return (
    <>
    <Home />
    <Search />
    <Messages />
    <CreatePost/>
    <ProfileLink/>
   
    </>  
  );
};

export default SidarBarItems;