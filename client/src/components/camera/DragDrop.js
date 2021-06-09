import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBase64URL } from '../../store/actions';
import { useDropzone } from 'react-dropzone';

function DragDrop() {
  const dispatch = useDispatch();
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
        dispatch(setBase64URL(base64String));
        file && URL.revokeObjectURL(file.preview);
      };
    }
  }, [file]);

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {!file && <p>클릭하거나 이미지를 끌어놔주세요!</p>}
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
