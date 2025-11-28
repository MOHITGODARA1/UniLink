import { Routes, Route } from "react-router-dom";
import LandingPage from "./Page/landing/landing.page";
import Login from "./auth/login";
import SignUp from "./auth/singup";
import DasbordPage from "./Page/Dashbord/Dasbordpage";
import ProtectedRoute from "./auth/Protector";
import SkillSelect from "./auth/Skill.Select";
import StudyResourse from "./Page/Dashbord/dashbordcomponent/StudyResourse";
import GroupTeam from "./Page/Dashbord/dashbordcomponent/Groups";
import Event from "./Page/Dashbord/dashbordcomponent/Events";
import Message from "./Page/Dashbord/dashbordcomponent/Message";
import Notification from "./Page/Dashbord/dashbordcomponent/notification";
import Profile from "./Page/Dashbord/dashbordcomponent/ProfilePage";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Skill-Select" element={<SkillSelect />} />
        <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DasbordPage />
          </ProtectedRoute>
        } />
        <Route path="/Study-Resourse" element={<StudyResourse />} />
        <Route path="/Groups-Teams" element={<GroupTeam />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/Profile" element={<Profile />} />

      </Routes>
    </>
  );
}
