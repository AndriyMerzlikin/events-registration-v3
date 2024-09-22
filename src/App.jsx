import Layout from "./components/Layout/Layout.jsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ParticipantsPage from "./pages/ParticipantsPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register/:eventId" element={<RegisterPage />} />
          <Route path="participants/:eventId" element={<ParticipantsPage />} />

          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
