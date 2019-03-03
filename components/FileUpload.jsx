import React from 'react';
import Dropzone from 'react-dropzone';

export default (props) => {
  const { onDrop } = props;
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {
              isDragActive
                ? <p>Drop files here...</p>
                : <p>Try dropping some files here, or click to select files to upload.</p>
            }
          </div>
        );
      }}
    </Dropzone>);
};
