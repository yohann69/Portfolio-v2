import React from 'react';
import { useWindowManager } from '../WindowManager';

const Browser = () => {
    const { windows } = useWindowManager();
    const data = windows['browser'].data;
    const url = data?.url || 'https://www.google.com';

    return (
        <div className="w-full h-full bg-white flex flex-col">
            <div className="h-10 bg-gray-100 border-b flex items-center px-4 space-x-2 shrink-0">
                <div className="flex space-x-2 mr-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
                <input
                    type="text"
                    value={url}
                    readOnly
                    className="flex-1 bg-white border rounded-md px-3 text-sm h-7 text-gray-700 outline-none shadow-sm"
                />
            </div>
            <iframe
                src={url}
                className="flex-1 w-full border-none bg-white"
                title="Browser"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
        </div>
    );
};

export default Browser;