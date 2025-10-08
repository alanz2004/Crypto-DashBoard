import React, { useState } from "react";
import './AddTeamMember.css'
import { useAuth } from "../../context/AuthContext";

interface AddTeamMemberProps {
  projectId: string;
}

const AddTeamMember: React.FC<AddTeamMemberProps> = ({ projectId }) => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    wallet: "",
    email: "",
    contribution: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/team/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Team member added successfully!");
        setFormData({
          name: "",
          role: "",
          wallet: "",
          email: "",
          contribution: "",
        });
      } else {
        setMessage(`❌ Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error adding member:", error);
      setMessage("❌ Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-team-member-container">
      <form onSubmit={handleSubmit} className="add-team-member-form">
        <h2 className="form-title">Add Team Member</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role (e.g. Developer, Designer)"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="wallet"
          placeholder="Wallet Address (optional)"
          value={formData.wallet}
          onChange={handleChange}
        />

        <input
          type="text"
          name="contribution"
          placeholder="Contribution (e.g. Frontend dev, investor...)"
          value={formData.contribution}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Member"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default AddTeamMember;