// Dropzone.tsx

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  onDrop: (acceptedFiles: File[]) => void;
};

const CustomDropzone: React.FC<Props> = ({ onDrop }) => {
  const onDropCallback = useCallback(onDrop, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

  return (
    <div {...getRootProps()} className="cursor-pointer flex items-center justify-center h-32 bg-[#181818] border-2 border-dashed border-borderlight rounded-lg">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <div className="text-center">
            Drop your file uploads or <span className="text-[#FBB142]">Browse</span>
            <br />
            <span className="text-xs">Maximum size of images 2MB</span>
          </div>
      }
    </div>
  );
};

export default CustomDropzone;
