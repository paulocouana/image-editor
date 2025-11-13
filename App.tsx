
import React, { useState, useCallback } from 'react';
import { editImageWithGemini } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { Header } from './components/Header';
import { ImageDropzone } from './components/ImageDropzone';
import { ImagePreview } from './components/ImagePreview';
import { Spinner } from './components/Spinner';

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = useCallback(async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setOriginalImageFile(file);
      try {
        const base64 = await fileToBase64(file);
        setOriginalImagePreview(base64 as string);
        setGeneratedImage(null);
        setError(null);
      } catch (err) {
        setError('Failed to read the image file.');
        setOriginalImageFile(null);
        setOriginalImagePreview(null);
      }
    } else {
      setError('Please upload a valid image file.');
    }
  }, []);

  const handleEditImage = async () => {
    if (!originalImageFile || !prompt.trim()) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }
    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const base64Data = (originalImagePreview as string).split(',')[1];
      const mimeType = originalImageFile.type;

      const resultBase64 = await editImageWithGemini(base64Data, mimeType, prompt);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClear = () => {
    setOriginalImageFile(null);
    setOriginalImagePreview(null);
    setGeneratedImage(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col">
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input */}
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-cyan-400">1. Upload your Image</h2>
            <ImageDropzone onImageDrop={handleImageChange} existingImage={!!originalImagePreview} onClear={handleClear} />
            
            {originalImagePreview && (
              <>
                <h2 className="text-2xl font-bold text-cyan-400">2. Describe your edit</h2>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Add a retro filter, make the sky look like a galaxy, remove the car in the background..."
                  className="w-full h-28 p-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
                  disabled={isLoading}
                />
              </>
            )}
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col space-y-6">
            {originalImagePreview && (
              <ImagePreview label="Original" src={originalImagePreview} />
            )}
            
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg border-2 border-dashed border-gray-700 h-full min-h-[300px]">
                <Spinner />
                <p className="mt-4 text-lg text-cyan-400 animate-pulse">Nano Banana is working its magic...</p>
                <p className="text-sm text-gray-400">This can take a moment.</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300">
                <p className="font-bold">An error occurred:</p>
                <p>{error}</p>
              </div>
            )}

            {generatedImage && !isLoading && (
              <ImagePreview label="Edited" src={generatedImage} />
            )}
          </div>
        </div>
      </main>

      {/* Sticky Footer Action Bar */}
      {originalImagePreview && (
        <footer className="sticky bottom-0 bg-gray-900/80 backdrop-blur-sm p-4 border-t border-gray-700">
          <div className="container mx-auto flex items-center justify-end">
            <button
              onClick={handleEditImage}
              disabled={isLoading || !prompt.trim()}
              className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Spinner small />
                  <span>Generating...</span>
                </>
              ) : (
                <span>Edit with Nano Banana</span>
              )}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
