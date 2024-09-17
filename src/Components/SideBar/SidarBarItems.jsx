import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Explore from "./Explore";
import Reels from "./Reels";
import Messages from "./Messages";
import Threads from "./Threads";
import Menu from "./Menu";

const SidarBarItems = () => {
  return (
    <>
    <Home />
    <Search />
    <Explore />
    <Reels />
    <Messages />
    <Notifications />
    <CreatePost/>
    <ProfileLink/>
    <Threads />
    <Menu />
    </>  
  );
};

export default SidarBarItems;