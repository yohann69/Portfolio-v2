import React from 'react';
import { useWindowManager } from '../WindowManager';

const VideoPlayer = () => {
    const { windows } = useWindowManager();
    const data = windows['video-player'].data;
    const src = data?.src;
    const title = data?.title || 'Video';

    if (!src) {
        return <div className="flex items-center justify-center h-full text-white/50">No video loaded</div>;
    }

    return (
        <div className="w-full h-full bg-black flex flex-col">
            <div className="h-10 bg-gray-900/50 border-b border-white/10 flex items-center px-4 justify-between shrink-0 absolute top-0 w-full z-10 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white/80 text-sm font-medium">{title}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <video
                    controls
                    autoPlay
                    preload="metadata"
                    className="max-w-full max-h-full w-full h-full object-contain"
                    src={src}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoPlayer;