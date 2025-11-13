
import React from 'react';

const ImageEditAutoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-cyan-400"
  >
    <path d="M14.06 9.94L12 9l-2.06.94L9 12l.94 2.06L12 15l2.06-.94L15 12l-.94-2.06zM17.71 7.71L16 6l-1.71 1.71L12 9l1.71 1.71L16 12l1.71-1.71L20 9l-2.29-1.29zM4 4v13.17L5.17 16H20V4H4zm-2 0a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H5.17L4 21.17V22h-2v-2h2v-2.83L2 15.17V4z" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
        <ImageEditAutoIcon />
        <div>
          <h1 className="text-2xl font-bold text-white">
            Nano Banana <span className="text-cyan-400">Image Editor</span>
          </h1>
          <p className="text-sm text-gray-400">AI-powered image editing with Gemini 2.5 Flash Image</p>
        </div>
      </div>
    </header>
  );
};
