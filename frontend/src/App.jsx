import { Routes, Route } from "react-router-dom";
import LandingPage from "./Page/landing/landing.page";
import Login from "./auth/login";
import SignUp from "./auth/singup";
import DasbordPage from "./Page/Dashbord/Dasbordpage";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/dashboard" element={<DasbordPage />} />
      </Routes>
    </>
  );
}
