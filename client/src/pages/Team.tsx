import './Team.css'

import TeamCard, { TeamMember } from "../components/TeamCard";
import TeamTasks from "../components/TeamTasks";

const teamMembers: TeamMember[] = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    wallet: "0x123456789abcdef",
    ownership: 15,
  },
  {
    name: "Bob Lee",
    role: "CTO",
    wallet: "0xabcdef123456789",
    ownership: 20,
  },
  {
    name: "Eve Moore",
    role: "Marketing Lead",
    wallet: "0x789abc456def123",
    ownership: 5,
  },
];

export default function Team() {
  return (
    <div className="team-page">
      <h1 className="team-title">Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>

      <TeamTasks />
    </div>
  );
}
