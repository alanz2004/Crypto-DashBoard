import React from "react";
import './SocialConnections.css'
import { FaTwitter, FaTelegramPlane, FaDiscord } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import { useAuth } from '../../context/AuthContext';


// Assume you pass projectId down as a prop
interface SocialConnectionsProps {
  projectId: string;
}

const SocialConnections: React.FC<SocialConnectionsProps> = ({ projectId }) => {

    const { token} = useAuth();
  

  const handleDiscordConnect = async () => {
    try {
      // Fetch the invite URL from backend
      const res = await fetch(
        `${API_URL}/integrations/discord/invite/${projectId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          },
          credentials: "include", // keep cookies if using sessions/JWT
        }
      );

      if (!res.ok) {
        throw new Error("Failed to get Discord invite URL");
      }

      const data = await res.json();
      if (data.url) {
        // Redirect user to Discord OAuth2 invite link
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error connecting Discord:", error);
      alert("Something went wrong while connecting Discord.");
    }
  };

  return (
    <div className="social-connections-container">
      <h2 className="social-connections-title">Connect Your Channels</h2>
      <div className="social-connections-row">
        {/* Twitter */}
        <div className="social-connection-card">
          <FaTwitter className="social-icon twitter" />
          <h3>Twitter (X)</h3>
          <p>
            Authorize your Twitter account to track followers, engagement, and
            mentions. You’ll be redirected to Twitter’s login page to grant
            permissions.
          </p>
          <button className="connect-btn">Connect Twitter</button>
        </div>

        {/* Telegram */}
        <div className="social-connection-card">
          <FaTelegramPlane className="social-icon telegram" />
          <h3>Telegram</h3>
          <p>
            Add our bot to your Telegram group or channel as an admin. The bot
            will track activity, members, and engagement automatically.
          </p>
          <button className="connect-btn">Connect Telegram</button>
        </div>

        {/* Discord */}
        <div className="social-connection-card">
          <FaDiscord className="social-icon discord" />
          <h3>Discord</h3>
          <p>
            Invite our bot to your Discord server with the required permissions.
            Once connected, we’ll track member growth, activity, and events.
          </p>
          <button className="connect-btn" onClick={handleDiscordConnect}>
            Connect Discord
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialConnections;
