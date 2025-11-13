
import React from 'react';

interface ImagePreviewProps {
  label: string;
  src: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ label, src }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-2xl font-bold text-cyan-400">{label}</h3>
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
