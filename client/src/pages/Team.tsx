import './Team.css'

import { TeamCard } from '../components/Team/TeamCard';
import TeamTasks from "../components/Team/TeamTasks";


export default function Team() {
  return (
    <div className="team-page">
      <div className="team-grid">
          <TeamCard />
      </div>

      <TeamTasks />
    </div>
  );
}
