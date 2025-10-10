import React, { useEffect, useState } from "react";
import { FaEthereum, FaReact, FaNodeJs, FaGithub, FaTelegram } from "react-icons/fa";
import { SiSolidity, SiMongodb, SiIpfs } from "react-icons/si";

import "./ProjectsList.css";

interface Project {
  _id: string;
  projectName: string;
  projectDescription: string;
}

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/public/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="projects-loading">Loading cosmic data...</div>;
  }

  return (
    <div className="projects-container">
      <h1 className="projects-title">Explore the Cosmos of Startups</h1>
       <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3 className="project-name">{project.projectName}</h3>
              <p className="project-description">{project.projectDescription}</p>

               <div className="project-tech-section">
                <h4>Technologies</h4>
                <div className="project-tech-icons">
                  <div className="tech-item"><FaEthereum /> <span>Ethereum</span></div>
                  <div className="tech-item"><SiSolidity /> <span>Solidity</span></div>
                  <div className="tech-item"><FaReact /> <span>React</span></div>
                  <div className="tech-item"><FaNodeJs /> <span>Node.js</span></div>
                  <div className="tech-item"><SiMongodb /> <span>MongoDB</span></div>
                  <div className="tech-item"><SiIpfs /> <span>IPFS</span></div>
                </div>
              </div>

               {/* Get in Touch for this project */}

               <div className="project-get-in-touch">
                  <h3 className="get-in-touch-title">Get In Touch </h3>
                  <div className="get-actions">
                    <a
                      href="mailto:demo@cosmicstartups.io"
                      className="get-btn email-btn"
                    >
                      Email Team
                    </a>
                    <a
                      href="https://t.me/cosmicstartups"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="get-btn platform-btn"
                    >
                      On Platform
                    </a>
                  </div>
                </div>
                

            </div>
            
          ))
        ) : (
          <p className="no-projects">No public projects available yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
