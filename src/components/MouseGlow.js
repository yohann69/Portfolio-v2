// MouseGlow.js
import React, { useState, useEffect } from 'react';
import './MouseGlow.css';

const MouseGlow = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const updateMousePosition = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        document.addEventListener('mousemove', updateMousePosition);
        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return <div className="mouse-glow" style={{ left: position.x, top: position.y }}></div>;
};

export default MouseGlow;
