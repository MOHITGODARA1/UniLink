import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// LAZY IMPORTS
const LandingPage = lazy(() => import("./Page/landing/landing.page"));
const Login = lazy(() => import("./auth/login"));
const SignUp = lazy(() => import("./auth/singup"));
const SkillSelect = lazy(() => import("./auth/Skill.Select"));

const DasbordPage = lazy(() =>
  import("./Page/Dashbord/Dasbordpage")
);

const StudyResourse = lazy(() =>
  import("./Page/Dashbord/dashbordcomponent/Studyresourse/studyresourse")
);

const GroupTeam = lazy(() =>
  import("./Page/Dashbord/dashbordcomponent/Groups")
);

const Event = lazy(() =>
  import("./Page/Dashbord/dashbordcomponent/Events")
);

const Message = lazy(() =>
  import("./Page/Dashbord/dashbordcomponent/Message")
);

const Notification = lazy(() =>
  import("./Page/Dashbord/dashbordcomponent/notification")
);

const Profile = lazy(() =>
  import("./Page/Dashbord/dashbordcomponent/ProfilePage")
);

const ProfileView = lazy(() =>
  import("./components/Layout/Profile.view")
);

// OPTIONAL: simple loader
const Loader = () => (
  <div className="h-screen flex items-center justify-center text-white">
    Loading...
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Skill-Select" element={<SkillSelect />} />

        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            <DasbordPage />
            // </ProtectedRoute>
          }
        />

        <Route path="/Study-Resourse" element={<StudyResourse />} />
        <Route path="/Groups-Teams" element={<GroupTeam />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ProfileView />} />
      </Routes>
    </Suspense>
  );
}