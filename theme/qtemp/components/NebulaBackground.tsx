import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const NebulaCanvas = styled.canvas`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.15;
    pointer-events: none;
`;

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    color: string;
}

interface Nebula {
    x: number;
    y: number;
    radius: number;
    color: string;
    alpha: number;
}

export const NebulaBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const nebulasRef = useRef<Nebula[]>([]);

    const generateStars = (count: number) => {
        const stars: Star[] = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 2,
                size: Math.random() * 2,
                color: `hsl(${Math.random() * 60 + 240}, 50%, 80%)`
            });
        }
        return stars;
    };

    const generateNebulas = (count: number) => {
        const nebulas: Nebula[] = [];
        for (let i = 0; i < count; i++) {
            nebulas.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 200 + 100,
                color: `hsl(${Math.random() * 60 + 240}, 70%, 50%)`,
                alpha: Math.random() * 0.2
            });
        }
        return nebulas;
    };

    const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.z, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
    };

    const drawNebula = (ctx: CanvasRenderingContext2D, nebula: Nebula) => {
        const gradient = ctx.createRadialGradient(
            nebula.x, nebula.y, 0,
            nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, `${nebula.color}${Math.floor(nebula.alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(nebula.x - nebula.radius, nebula.y - nebula.radius, nebula.radius * 2, nebula.radius * 2);
    };

    const animate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw nebulas
        nebulasRef.current.forEach(nebula => {
            nebula.x += Math.sin(Date.now() / 10000) * 0.2;
            nebula.y += Math.cos(Date.now() / 10000) * 0.2;
            drawNebula(ctx, nebula);
        });

        // Draw stars
        starsRef.current.forEach(star => {
            star.z = Math.sin(Date.now() / 1000 + star.x) * 0.5 + 1.5;
            drawStar(ctx, star);
        });

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            starsRef.current = generateStars(200);
            nebulasRef.current = generateNebulas(5);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Start animation
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <NebulaCanvas ref={canvasRef} />;
};

export default NebulaBackground; 