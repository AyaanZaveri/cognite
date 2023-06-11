// components/FileInput.tsx
import React, { ChangeEvent } from "react";

interface FileInputProps {
  onFileSelected: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelected }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelected(event.target.files[0]);
    }
  };

  return (
    <input
      type="file"
      accept="application/pdf, application/epub+zip"
      onChange={handleInputChange}
    />
  );
};

export default FileInput;
