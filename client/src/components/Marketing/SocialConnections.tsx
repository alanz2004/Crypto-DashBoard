import React from "react";
import { FaTwitter, FaTelegramPlane, FaDiscord } from "react-icons/fa";
import "./SocialConnections.css";

const SocialConnections: React.FC = () => {
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
          <button className="connect-btn">Connect Discord</button>
        </div>
      </div>
    </div>
  );
};

export default SocialConnections;
