
import React from 'react';

interface ImagePreviewProps {
  label: string;
  src: string;
  onDownload?: () => void;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export const ImagePreview: React.FC<ImagePreviewProps> = ({ label, src, onDownload }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-cyan-400">{label}</h3>
        {onDownload && (
            <button
                onClick={onDownload}
                className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors duration-200 transform hover:scale-105"
            >
                <DownloadIcon />
                Download
            </button>
        )}
      </div>
      <div className="p-2 bg-gray-800 rounded-lg border-2 border-gray-700">
        <img
          src={src}
          alt={label}
          className="w-full h-auto max-h-[60vh] object-contain rounded-md"
        />
      </div>
    </div>
  );
};
