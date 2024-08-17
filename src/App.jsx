
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PageLayout from "./Layout/PageLayout/PageLayout";
function App() {
  return(
    <>
    <PageLayout>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/Auth' element={<AuthPage/>} />
      </Routes>
    </PageLayout>
    </>
  );
}

export default App;