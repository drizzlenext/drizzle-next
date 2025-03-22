// Rain.jsx
import React from "react";
import "./rain.css";

interface RainDropProps {
  left: number;
  duration: number;
  delay: number;
}

const RainDrop: React.FC<RainDropProps> = ({ left, duration, delay }) => {
  return (
    <div
      className="rain-drop"
      style={{
        left: `${left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const Rain = () => {
  // Generate 50 raindrops with random properties
  const rainDrops = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 1 + Math.random() * 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="rain-container">
      {rainDrops.map((drop) => (
        <RainDrop
          key={drop.id}
          left={drop.left}
          duration={drop.duration}
          delay={drop.delay}
        />
      ))}
    </div>
  );
};

export default Rain;
