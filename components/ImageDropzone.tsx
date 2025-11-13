
import React, { useCallback, useState } from 'react';

interface ImageDropzoneProps {
  onImageDrop: (file: File) => void;
  existingImage: boolean;
  onClear: () => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageDrop, existingImage, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageDrop(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [onImageDrop]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageDrop(e.target.files[0]);
    }
  };

  if (existingImage) {
    return (
       <div className="flex items-center justify-center p-4 bg-gray-800 border-2 border-gray-700 rounded-lg">
          <p className="text-green-400">Image loaded successfully.</p>
          <button
            onClick={onClear}
            className="ml-4 flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors"
            >
            <TrashIcon />
            Clear
          </button>
        </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200 ${isDragging ? 'border-cyan-500 bg-gray-800' : 'border-gray-700 bg-gray-900/50'}`}
    >
      <input
        type="file"
        id="file-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center">
        <UploadIcon />
        <p className="mt-4 text-lg font-semibold text-gray-300">
          <span className="text-cyan-400">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-gray-500">PNG, JPG, or WEBP</p>
      </div>
    </div>
  );
};
