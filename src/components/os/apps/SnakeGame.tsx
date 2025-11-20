"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, RotateCcw, Trophy } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function SnakeGame() {
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Point>({ x: 15, y: 15 });
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    const generateFood = useCallback((): Point => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    }, []);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(generateFood());
        setDirection('RIGHT');
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
    };

    const moveSnake = useCallback(() => {
        if (gameOver) return;

        setSnake(prevSnake => {
            const head = prevSnake[0];
            const newHead = { ...head };

            switch (direction) {
                case 'UP': newHead.y -= 1; break;
                case 'DOWN': newHead.y += 1; break;
                case 'LEFT': newHead.x -= 1; break;
                case 'RIGHT': newHead.x += 1; break;
            }

            // Check collisions
            if (
                newHead.x < 0 || newHead.x >= GRID_SIZE ||
                newHead.y < 0 || newHead.y >= GRID_SIZE ||
                prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
            ) {
                setGameOver(true);
                setIsPlaying(false);
                if (score > highScore) setHighScore(score);
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Check food
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 1);
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver, generateFood, score, highScore]);

    useEffect(() => {
        if (isPlaying && !gameOver) {
            gameLoopRef.current = setInterval(moveSnake, Math.max(50, INITIAL_SPEED - score * 2));
        } else {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [isPlaying, gameOver, moveSnake, score]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
                case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
                case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
                case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-white font-mono">
            <div className="flex items-center justify-between p-4 bg-[#252526] border-b border-white/10">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">SCORE</span>
                        <span className="text-xl font-bold text-green-400">{score}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">BEST</span>
                        <span className="text-xl font-bold text-yellow-400">{highScore}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    {!isPlaying && !gameOver && (
                        <button onClick={() => setIsPlaying(true)} className="p-2 bg-green-600 rounded hover:bg-green-500 transition-colors">
                            <Play className="w-4 h-4" />
                        </button>
                    )}
                    {(isPlaying || gameOver) && (
                        <button onClick={resetGame} className="p-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 bg-[#111]">
                <div
                    className="relative bg-[#000] border border-[#333] shadow-2xl"
                    style={{
                        width: GRID_SIZE * CELL_SIZE,
                        height: GRID_SIZE * CELL_SIZE
                    }}
                >
                    {/* Grid Lines (Optional) */}
                    <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-10 pointer-events-none">
                        {Array.from({ length: 400 }).map((_, i) => (
                            <div key={i} className="border border-white/20" />
                        ))}
                    </div>

                    {/* Snake */}
                    {snake.map((segment, i) => (
                        <div
                            key={i}
                            className="absolute bg-green-500 rounded-sm transition-all duration-100"
                            style={{
                                left: segment.x * CELL_SIZE,
                                top: segment.y * CELL_SIZE,
                                width: CELL_SIZE - 2,
                                height: CELL_SIZE - 2,
                                opacity: 1 - (i / snake.length) * 0.5
                            }}
                        />
                    ))}

                    {/* Food */}
                    <div
                        className="absolute bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                        style={{
                            left: food.x * CELL_SIZE,
                            top: food.y * CELL_SIZE,
                            width: CELL_SIZE - 2,
                            height: CELL_SIZE - 2
                        }}
                    />

                    {/* Game Over Overlay */}
                    {gameOver && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                            <Trophy className="w-12 h-12 text-yellow-400 mb-2" />
                            <h2 className="text-2xl font-bold text-white">GAME OVER</h2>
                            <p className="text-gray-400">Score: {score}</p>
                            <button
                                onClick={resetGame}
                                className="px-6 py-2 bg-white text-black font-bold rounded hover:scale-105 transition-transform"
                            >
                                Play Again
                            </button>
                        </div>
                    )}

                    {!isPlaying && !gameOver && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                            <p className="text-white font-bold">PRESS START</p>
                            <p className="text-xs text-gray-400">Use Arrow Keys to Move</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
