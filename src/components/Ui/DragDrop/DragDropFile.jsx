import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DragDropFile({
  setFile, // Used to store new images for form submission
  setNewImages, // New prop to capture new images in parent
  accepts,
  name,
  label = "Upload Files",
  multiple = true,
  placeholder = "",
  buttonLabel = "Select Files",
  existingImages = [], // Existing images from the backend
  setExistingImages, // Function to update the state of existing images
}) {
  const [previews, setPreviews] = useState([]); // For previewing new images
  const [isDragging, setIsDragging] = useState(false);

  // Dragging Events
  const handleDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!e.dataTransfer.files) return;

    const files = Array.from(e.dataTransfer.files);
    const acceptedFiles = files.filter((file) => accepts.includes(file.type));

    handleNewImages(acceptedFiles);
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    const acceptedFiles = files.filter((file) => accepts.includes(file.type));

    handleNewImages(acceptedFiles);
  };

  // Handle new images, clear existing ones if not multiple
  const handleNewImages = (acceptedFiles) => {
    if (!multiple) {
      // Clear existing images when a new single image is uploaded
      setExistingImages([]);
      setPreviews([]);
    }

    // Append new files to both the previews and the parent's state for submission
    setFile((prev) => (multiple ? [...prev, ...acceptedFiles] : acceptedFiles));
    setNewImages((prev) => (multiple ? [...prev, ...acceptedFiles] : acceptedFiles));
    updatePreviews(acceptedFiles);
  };

  const updatePreviews = (acceptedFiles) => {
    const newPreviews = acceptedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews((prev) => (multiple ? [...prev, ...newPreviews] : newPreviews));
  };

  const removeImage = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFile((prev) => prev.filter((_, i) => i !== index)); // Remove from new images state in parent
    setNewImages((prev) => prev.filter((_, i) => i !== index)); // Update new images state in parent
  };

  const removeExistingImage = (image) => {
    setExistingImages((prev) => prev.filter((img) => img !== image)); // Remove from existing images
  };

  return (
    <div>
      <label className="block text-lg font-medium mb-2">{label}</label>

      <div
        onDragOver={handleDrag}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-4 border-gray-400 border-dashed flex flex-col items-center bg-gray-50 gap-6 py-6 cursor-${isDragging ? 'copy' : 'pointer'}`}
        style={{ cursor: isDragging ? 'copy' : 'pointer' }}
      >
        <FontAwesomeIcon icon={faCloudArrowDown} size="3x" className="opacity-60" />
        <h2>Drag and drop your files</h2>

        <label htmlFor="upload_files">
          <input
            type="file"
            id="upload_files"
            accept={accepts}
            multiple={multiple}
            className="hidden"
            name={`${name}[]`}
            onChange={handleFiles}
          />
          <div
            className="bg-blue-500 text-white font-bold px-2 py-2 rounded-xl text-center inline-flex"
            style={{ cursor: "pointer" }}
          >
            {buttonLabel}
          </div>
        </label>

        {placeholder && <p className="text-gray-500 text-sm mt-2">{placeholder}</p>}
      </div>

      {/* Combined Preview Section for Existing and New Images */}
      {(existingImages.length > 0 || previews.length > 0) && (
        <div className="flex gap-4 flex-wrap mt-4">
          {/* Existing Images */}
          {existingImages.map((image, index) => (
            <div key={index} style={{ position: "relative", margin: "10px" }}>
              <img
                src={image}
                alt={`Existing image ${index + 1}`}
                style={{ width: "150px", height: "150px", objectFit: "cover", margin: "10px" }}
              />
              <button
                type="button" // Prevents form submission
                onClick={() => removeExistingImage(image)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}

          {/* New Previews */}
          {previews.map((preview, index) => (
            <div key={index} style={{ position: "relative", margin: "10px" }}>
              <img
                src={preview.url}
                alt="preview"
                style={{ width: "150px", height: "150px", objectFit: "cover", margin: "10px" }}
              />
              <button
                type="button" // Prevents form submission
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
