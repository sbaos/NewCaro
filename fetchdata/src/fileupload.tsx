import React, { useState } from 'react';

export default function MultiFileUploader() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    let f = [...selectedFiles,...files];
    if(f.length>0) console.log(f[0].text());
    setSelectedFiles(f);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      // Handle file upload logic here
      console.log('Uploading files:', selectedFiles);
    } else {
      console.log('No files selected');
    }
  };

  return (
    <div className="file-uploader">
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected files:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
