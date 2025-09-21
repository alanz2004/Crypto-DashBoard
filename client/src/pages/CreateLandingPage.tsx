import { useState } from "react";
import "./CreateLandingPage.css";

interface TeamMember {
  name: string;
  role: string;
}

interface Props {
  projectId?: string;
}

const CreateLandingPage: React.FC<Props> = ({ projectId }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{ name: "", role: "" }]);
  const [loading, setLoading] = useState(false);

  const handleTeamChange = (index: number, field: "name" | "role", value: string) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "" }]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/files/${projectId}/createLandingPage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectName,
          projectDescription,
          teamMembers,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed with status ${response.status}`);
      }

      const data = await response.json();
      alert("✅ Landing page created successfully!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create landing page.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page-form-container">
      <h1>Create Landing Page</h1>
      <form className="landing-page-form" onSubmit={handleSubmit}>
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

        <div className="team-members-section">
          <h2>Team Members</h2>
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) => handleTeamChange(index, "name", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={member.role}
                onChange={(e) => handleTeamChange(index, "role", e.target.value)}
                required
              />
              {teamMembers.length > 1 && (
                <button type="button" onClick={() => removeTeamMember(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addTeamMember}>
            Add Team Member
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Landing Page"}
        </button>
      </form>
    </div>
  );
};

export default CreateLandingPage;
