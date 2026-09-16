import React, { useEffect, useState } from 'react';

interface ReadingRulerProps {
  enabled: boolean;
}

export const ReadingRuler: React.FC<ReadingRulerProps> = ({ enabled }) => {
  const [mouseY, setMouseY] = useState(250);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="reading-ruler"
      style={{ top: `${mouseY}px` }}
      aria-hidden="true"
    />
  );
};
