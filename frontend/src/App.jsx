import { Routes, Route } from "react-router-dom";
import LandingPage from "./Page/landing/landing.page";
import Login from "./auth/login";
import SignUp from "./auth/singup";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </>
  );
}
