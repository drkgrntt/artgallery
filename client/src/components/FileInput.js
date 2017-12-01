import React from 'react';

// INPUT COMPONENT FOR IMAGE FILE INPUT
const FileInput = (field) => {
  delete field.input.value;
  return (
    <div className="input-field">
      <input type="file" name="image" {...field.input} />
    </div>
  );
};

export default FileInput;
