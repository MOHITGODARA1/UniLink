import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SkillSelect() {
  // All important CSE skills - Organized by category
  const skillCategories = {
    "Frontend": [
      "JavaScript", "React.js", "Next.js", "TypeScript", "HTML", "CSS", 
      "Tailwind CSS", "Redux", "Vue.js", "Angular", "Svelte", "jQuery",
      "Bootstrap", "Material-UI", "Sass", "LESS", "Webpack", "Vite",
      "Responsive Design", "Web Accessibility", "PWA"
    ],
    "Backend": [
      "Node.js", "Express.js", "Python", "Django", "Flask", "Java", 
      "Spring Boot", "PHP", "Laravel", "Ruby", "Ruby on Rails", "Go",
      "Rust", "C#", ".NET", "ASP.NET", "FastAPI", "NestJS", "Koa.js",
      "GraphQL", "REST API", "Microservices", "WebSockets"
    ],
    "Database": [
      "MongoDB", "SQL", "MySQL", "PostgreSQL", "Firebase", "Redis",
      "SQLite", "Oracle", "Microsoft SQL Server", "MariaDB", "Cassandra",
      "DynamoDB", "Neo4j", "Elasticsearch", "CouchDB", "InfluxDB",
      "Database Design", "Query Optimization", "NoSQL"
    ],
    "Languages": [
      "C", "C++", "JavaScript", "Python", "Java", "TypeScript", "PHP",
      "Go", "Rust", "Swift", "Kotlin", "Ruby", "Scala", "R", "MATLAB",
      "Shell Scripting", "Bash", "PowerShell", "Dart", "Perl", "Lua"
    ],
    "DevOps & Cloud": [
      "DevOps", "Docker", "Kubernetes", "Linux", "Cloud Computing", "AWS",
      "Azure", "Google Cloud Platform", "Jenkins", "CI/CD", "GitHub Actions",
      "GitLab CI", "Terraform", "Ansible", "Chef", "Puppet", "Nginx",
      "Apache", "Monitoring", "Prometheus", "Grafana", "ELK Stack"
    ],
    "AI & ML": [
      "Machine Learning", "Deep Learning", "AI", "TensorFlow", "OpenCV",
      "PyTorch", "Keras", "Scikit-learn", "Natural Language Processing",
      "Computer Vision", "Neural Networks", "CNN", "RNN", "LSTM",
      "Reinforcement Learning", "Data Science", "Pandas", "NumPy",
      "Matplotlib", "Seaborn", "Model Deployment", "MLOps"
    ],
    "Mobile Development": [
      "React Native", "Flutter", "Swift", "Kotlin", "Android", "iOS",
      "Xamarin", "Ionic", "Mobile UI/UX", "App Store Optimization",
      "Push Notifications", "Mobile Security"
    ],
    "Tools & Version Control": [
      "Git", "GitHub", "GitLab", "Bitbucket", "SVN", "Jira", "Trello",
      "Asana", "Confluence", "Slack", "VS Code", "IntelliJ IDEA",
      "Eclipse", "Vim", "Postman", "Swagger"
    ],
    "Testing & QA": [
      "Unit Testing", "Integration Testing", "Jest", "Mocha", "Chai",
      "Selenium", "Cypress", "Pytest", "JUnit", "TestNG", "QA",
      "Test Automation", "Performance Testing", "Load Testing"
    ],
    "Security": [
      "Cyber Security", "Ethical Hacking", "Penetration Testing", "OWASP",
      "Encryption", "SSL/TLS", "OAuth", "JWT", "Security Auditing",
      "Network Security", "Application Security", "Cryptography"
    ],
    "Other": [
      "DSA", "Data Structures", "Algorithms", "System Design", "OOP",
      "Design Patterns", "Blockchain", "Smart Contracts", "Solidity",
      "Data Engineering", "ETL", "Big Data", "Hadoop", "Spark",
      "Agile", "Scrum", "Problem Solving", "Technical Writing",
      "Code Review", "Software Architecture", "API Development"
    ]
  };

  // Flatten all skills for search
  const allSkills = Object.values(skillCategories).flat();

  const [inputSkill, setInputSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill");
      return;
    }

    const UserName = localStorage.getItem("UserName");

    if (!UserName) {
      alert("User not found. Please sign up again.");
      navigate("/SignUp");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/Skill-Set`,
        {
          UserName: UserName,
          Skill: selectedSkills
        }
      );

      console.log("Skills saved:", response.data);
      
      // Clear UserName from localStorage after successful skill save
      localStorage.removeItem("UserName");
      
      alert("Skills added successfully! Please login to continue.");
      navigate("/Login");

    } catch (error) {
      console.log("Error:", error);
      alert(error.response?.data?.message || "Error saving skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter skills based on search term
  const getFilteredSkills = () => {
    if (!searchTerm.trim()) {
      return allSkills;
    }
    return allSkills.filter(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredSkills = getFilteredSkills();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden">
      
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 h-[95vh] flex flex-col overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Choose Your Skills</h2>
            <p className="text-blue-100 text-sm">
              Select the technologies you're proficient in
            </p>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Search Box */}
          <div className="mb-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 outline-none text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white transition text-sm"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Selected Skills */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-semibold text-gray-800">
                Selected Skills ({selectedSkills.length})
              </h3>
              {selectedSkills.length > 0 && (
                <button
                  onClick={() => setSelectedSkills([])}
                  className="text-sm text-red-600 hover:text-red-700 transition font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <div className="min-h-[80px] p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
              {selectedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-white/90 hover:text-white hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition text-lg leading-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4 text-sm">
                  No skills selected yet. Start by typing or selecting from suggestions below.
                </p>
              )}
            </div>
          </div>

          {/* Suggested Skills */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-semibold text-gray-800">
                All Skills
              </h3>
              {searchTerm && (
                <span className="text-sm text-gray-500">
                  {filteredSkills.length} result{filteredSkills.length !== 1 ? 's' : ''} found
                </span>
              )}
            </div>
            <div className="max-h-[320px] overflow-y-auto rounded-xl bg-gray-50 border-2 border-gray-200 p-3">
              {filteredSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill}
                      disabled={selectedSkills.includes(skill)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        selectedSkills.includes(skill)
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white border border-gray-300 hover:border-blue-600 active:scale-95"
                      }`}
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                      {selectedSkills.includes(skill) && " ✓"}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4 text-sm">
                  {searchTerm ? `No skills found matching "${searchTerm}"` : "No skills available"}
                </p>
              )}
            </div>
          </div>

          {/* Helper Text */}
          <p className="text-center text-gray-500 text-sm mb-4">
            💡 Tip: Use the search box above to quickly find skills
          </p>
        </div>

        {/* Footer - Action Buttons */}
        <div className="flex-shrink-0 p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={handleComplete}
            disabled={selectedSkills.length === 0 || loading}
            className={`w-full py-3.5 rounded-xl font-semibold transition text-sm ${
              selectedSkills.length === 0 || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Complete & Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkillSelect;