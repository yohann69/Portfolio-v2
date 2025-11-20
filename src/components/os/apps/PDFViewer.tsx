import React from 'react';
import { useWindowManager } from '../WindowManager';

const PDFViewer = () => {
    const { windows } = useWindowManager();
    const data = windows['pdf-viewer'].data;
    const file = data?.file;
    const title = data?.title || 'Document';

    if (!file) {
        return <div className="flex items-center justify-center h-full text-white/50">No document loaded</div>;
    }

    return (
        <div className="w-full h-full bg-gray-900 flex flex-col">
            <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center px-4 justify-between shrink-0">
                <span className="text-gray-300 text-sm font-medium">{title}</span>
            </div>
            <iframe
                src={file}
                className="flex-1 w-full border-none bg-white"
                title="PDF Viewer"
            />
        </div>
    );
};

export default PDFViewer;