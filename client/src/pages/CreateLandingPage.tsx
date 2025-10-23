import { useState } from "react";
import "./CreateLandingPage.css";

interface TeamMember {
  name: string;
  role: string;
}

interface CreateLandingPageProps {
  projectId?: string;
}

const CreateLandingPage: React.FC<CreateLandingPageProps> = ({ projectId }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{ name: "", role: "" }]);
  const [loading, setLoading] = useState(false);

  // --- Handlers ---
  const handleTeamChange = (index: number, field: keyof TeamMember, value: string) => {
    setTeamMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    );
  };

  const addTeamMember = () => {
    setTeamMembers((prev) => [...prev, { name: "", role: "" }]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return alert("Missing project ID");

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/files/${projectId}/createLandingPage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ projectName, projectDescription, teamMembers }),
        }
      );

      if (!res.ok) throw new Error(`Failed with status ${res.status}`);

      const data = await res.json();
      console.log("✅ Landing page created:", data);
      alert("✅ Landing page created successfully!");
    } catch (err) {
      console.error("❌ Failed to create landing page:", err);
      alert("❌ Failed to create landing page.");
    } finally {
      setLoading(false);
    }
  };

  // --- Render ---
  return (
    <div className="landing-page-form-container">
      <h1>Create Landing Page</h1>

      <form className="landing-page-form" onSubmit={handleSubmit}>
        {/* --- Project Info --- */}
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Project Description</label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
        </div>

        {/* --- Team Members --- */}
        <section className="team-members-section">
          <h2>Team Members</h2>

          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) =>
                  handleTeamChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={member.role}
                onChange={(e) =>
                  handleTeamChange(index, "role", e.target.value)
                }
                required
              />
              {teamMembers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addTeamMember} className="add-btn">
            + Add Team Member
          </button>
        </section>

        {/* --- Submit --- */}
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Creating..." : "Create Landing Page"}
        </button>
      </form>
    </div>
  );
};

export default CreateLandingPage;
