import React from "react";
import './TeamCard.css'

export interface TeamMember {
  name: string;
  role: string;
  wallet: string;
  ownership: number;
}

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="team-card">
      <div className="team-header">
        <div className="team-avatar">{member.name.charAt(0)}</div>
        <div>
          <h2 className="team-name">{member.name}</h2>
          <p className="team-role">{member.role}</p>
        </div>
      </div>

      <div className="team-wallet">
        <span className="label">Wallet:</span>{" "}
        <a
          href={`https://etherscan.io/address/${member.wallet}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {member.wallet}
        </a>
      </div>

      <div className="team-ownership">
        <span className="label">Ownership:</span>{" "}
        <span className="ownership-value">{member.ownership}%</span>
      </div>
    </div>
  );
};

export default TeamCard;
