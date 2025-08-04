import React, { useEffect, useRef, useState } from 'react';
import './CryptoStatsSection.css';

const statsData = [
  { label: 'Altcoin Market Cap', value: 560_000_000_000 },
  { label: '24h Altcoin Volume', value: 35_000_000_000 },
  { label: 'Active Altcoins', value: 12000 },
  { label: 'New Projects This Month', value: 420 },
];

const formatNumber = (n: number) => {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return n.toLocaleString();
};

const CryptoStatsSection: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState(statsData.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateStats();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  const animateStats = () => {
    let frame = 0;
    const totalFrames = 50;

    const interval = setInterval(() => {
      frame++;
      setAnimatedValues(statsData.map((stat, i) => {
        const progress = Math.min(1, frame / totalFrames);
        return Math.floor(stat.value * progress);
      }));

      if (frame === totalFrames) clearInterval(interval);
    }, 30);
  };

  return (
    <section className="crypto-stats-section" ref={sectionRef}>
      <div className="stats-content">
        <h2>Altcoin Market in 2025</h2>
        <p>
          The altcoin ecosystem is rapidly growing, with thousands of new projects launching each year.
          Our platform empowers Web3 startups to plan tokenomics, fundraising, and growth strategies with AI precision,
          positioning them perfectly in this high-opportunity landscape.
        </p>

        <div className="stats-grid">
          {statsData.map((stat, i) => (
            <div className="stat-card" key={stat.label}>
              <h3 className="stat-value">{formatNumber(animatedValues[i])}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CryptoStatsSection;
