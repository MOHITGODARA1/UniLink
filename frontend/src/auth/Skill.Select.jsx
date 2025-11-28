import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SkillSelect() {

  // ⭐ ALL IMPORTANT CSE SKILLS
  const allSkills = [
    "JavaScript", "React.js", "Node.js", "Express.js",
    "MongoDB", "HTML", "CSS", "Tailwind CSS",
    "Redux", "Next.js", "TypeScript", "Git",
    "GitHub", "Java", "Spring Boot", "Python",
    "Django", "Flask", "C", "C++",
    "SQL", "MySQL", "PostgreSQL", "PHP",
    "Laravel", "DevOps", "Docker", "Kubernetes",
    "Linux", "Cloud Computing", "AWS", "Firebase",
    "DSA", "Machine Learning", "Deep Learning",
    "AI", "Cyber Security", "Blockchain",
    "Data Engineering", "TensorFlow", "OpenCV"
  ];

  const [inputSkill, setInputSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const navigate = useNavigate();

  // Add custom typed skill
  const addInputSkill = () => {
    if (!inputSkill.trim()) return;

    const newSkill = inputSkill.trim();

    if (!selectedSkills.includes(newSkill)) {
      setSelectedSkills([...selectedSkills, newSkill]);
    }

    setInputSkill("");
  };

  // Add clicked suggested skill
  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Remove selected skill
  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  // Submit skills to backend
  const handleComplete = async () => {
    const UserName = localStorage.getItem("UserName");

    if (!UserName) {
      alert("User not logged in");
      return navigate("/Login");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/Skill-Set`,
        {
          UserName: UserName,
          Skill: selectedSkills
        }
      );

      console.log("Skills saved:", response.data);
      alert("Skills added successfully!");

      navigate("/Login");

    } catch (error) {
      console.log("Error:", error);
      alert("Error saving skills");
    }
  };


  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center p-6">

      <div className="w-full max-w-2xl bg-[#0f0f0f] text-white p-6 rounded-2xl shadow-xl border border-gray-800">

        <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Skills</h2>

        {/* INPUT BOX */}
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full px-4 py-2 h-12 rounded-xl bg-black/40 border border-gray-700 outline-none text-white"
            placeholder="Type a skill..."
            value={inputSkill}
            onChange={(e) => setInputSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addInputSkill()}
          />
        </div>

        {/* SELECTED SKILLS */}
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedSkills.length > 0 ? (
            selectedSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-600 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-white text-lg leading-none"
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No skills selected</p>
          )}
        </div>

        {/* SUGGESTED SKILLS */}
        <h3 className="text-gray-300 font-semibold mt-6 mb-2">Suggested Skills</h3>

        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <button
              key={skill}
              className="px-3 py-1 bg-black/40 border border-gray-600 rounded-full text-xs hover:bg-blue-500 hover:text-white transition"
              onClick={() => addSkill(skill)}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* COMPLETE BUTTON */}
        <button
          onClick={handleComplete}
          className="
            w-full mt-8 py-3 h-12
            bg-blue-600 rounded-xl 
            text-white text-lg font-semibold 
            hover:bg-blue-700 hover:scale-[1.02] 
            transition active:scale-95
          "
        >
          Complete
        </button>

      </div>

    </div>
  );
}

export default SkillSelect;
