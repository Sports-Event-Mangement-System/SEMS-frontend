import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function DragDropFile({ setFile, accepts }) {
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!e.dataTransfer.files) return;
    
    const files = [...e.dataTransfer.files];
    const acceptedFiles = files.filter(file => accepts.includes(file.type));
    
    if (acceptedFiles.length === 0) {
      console.warn('No accepted files dropped.');
      return;
    }
    
    console.log(acceptedFiles);
    setFile(acceptedFiles);
  };

  const handleFiles = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    const acceptedFiles = files.filter(file => accepts.includes(file.type));
    
    if (acceptedFiles.length === 0) {
      console.warn('No accepted files selected.');
      return;
    }

    setFile(acceptedFiles);
  };

  return (
    <div
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className='border-4 border-gray-400 border-dashed flex flex-col items-center bg-gray-50 gap-6 py-6 cursor-pointer hover:bg-gray-100 transition'
      role="button"
      aria-label="Drag and drop files or click to upload"
    >
      <FontAwesomeIcon icon={faCloudArrowDown} size="3x" className='opacity-60' />
      <h2>Drag and drop your files</h2>
      <label htmlFor="upload_files">
        <input 
          type="file" 
          id='upload_files'
          accept={accepts}
          className='hidden'
          multiple
          onChange={handleFiles}
        />
        <div className='bg-blue-500 text-white font-bold px-2 py-2 rounded-xl text-center inline-flex'>Select Files</div>
      </label>
    </div>
  );
}
