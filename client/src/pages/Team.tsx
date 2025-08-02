import './Team.css'

import { TeamCard } from '../components/TeamCard';
import TeamTasks from "../components/TeamTasks";


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
