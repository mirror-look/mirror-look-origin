import React, { useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';

function DragDrop() {
  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    let file = acceptedFiles[0];
    setFile(
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop
  });

  useEffect(() => {
    if (!!file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        let base64String = reader.result.split('base64,')[1];
        window.sessionStorage.setItem('uploadedImage', base64String);
        file && URL.revokeObjectURL(file.preview);
      };
    }
  }, [file]);

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {!file && <p>Drag 'n' drop here !</p>}
        {file && (
          <img
            witdh="400px"
            height="400px"
            src={file.preview}
            alt="file preview"
          />
        )}
      </div>
    </div>
  );
}

export default DragDrop;
