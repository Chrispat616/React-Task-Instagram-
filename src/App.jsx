import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PageLayout from "./Layout/PageLayout/PageLayout";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import useAuthStore from "./store/authStore";
import ChatPage from "./Components/Chats/ChatPage";
import Messages from "./Components/SideBar/Messages";

function App() {
  const authUser = useAuthStore((state) => state.user);

  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/Auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/ChatPage" element={<ChatPage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
