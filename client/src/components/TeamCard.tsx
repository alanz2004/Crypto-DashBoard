import React from 'react';
import './TeamCard.css'

interface TeamMember {
  name: string;
  role: string;
  wallet: string;
  ownership: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Alan Starobinski',
    role: 'Founder & Developer',
    wallet: '0x3c8a...b9F2',
    ownership: '35%',
  },
  {
    name: 'John Doe',
    role: 'Marketing & Video',
    wallet: '0x9bA1...45Ce',
    ownership: '25%',
  },
  // Add more members as needed
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

export const TeamCard: React.FC = () => {
  return (
    <section className="team-card-section-container">
      <h2 className="team-card-section-title">Our Team</h2>
      <div className="team-card-section-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card-section-card">
            <div className="team-card-section-avatar">{getInitials(member.name)}</div>
            <div className="team-card-section-info">
              <h3 className="team-card-section-name">{member.name}</h3>
              <p className="team-card-section-role">{member.role}</p>
              <p className="team-card-section-wallet">
                <span className="team-card-section-label">Wallet:</span> {member.wallet}
              </p>
              <p className="team-card-section-ownership">
                <span className="team-card-section-label">Ownership:</span>{' '}
                <span className="team-card-section-ownership-value">{member.ownership}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
