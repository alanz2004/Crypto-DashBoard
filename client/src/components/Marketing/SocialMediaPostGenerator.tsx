import React, { useState } from "react";
import OpenAI from "openai";
import './SocialMediaPostGenerator.css'


const SocialMediaPostGenerator: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [eventType, setEventType] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [link, setLink] = useState("");
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ⚠️ Put your key in .env and load with process.env.REACT_APP_OPENAI_API_KEY
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // needed for frontend use
  });

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedPosts([]);

    try {
      const prompt = `Create 3 social media posts for a crypto startup.
Project: ${projectName}
Event: ${eventType}
Launch Date: ${launchDate}
Link: ${link || "N/A"}

Make them optimized for crypto audiences:
1. A hype-driven Twitter/X style
2. A community Telegram/Discord style
3. A professional LinkedIn style`;

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const output = completion.choices[0].message.content
        ?.split("\n")
        .filter((line) => line.trim() !== "") as string[];

      setGeneratedPosts(output);
    } catch (error) {
      console.error("Error generating posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator-container">
      <h1 className="generator-title">🚀 Social Media Post Generator</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Type (Token Launch, AMA, etc.)"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Launch Date"
          value={launchDate}
          onChange={(e) => setLaunchDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "✨ Generate Posts"}
        </button>
      </div>

      <div className="results-container">
        {generatedPosts.length > 0 &&
          generatedPosts.map((post, idx) => (
            <div key={idx} className="post-card">
              <p>{post}</p>
              <button
                onClick={() => navigator.clipboard.writeText(post)}
                className="copy-btn"
              >
                Copy
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SocialMediaPostGenerator;
