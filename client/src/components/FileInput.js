import React from 'react';

const FileInput = (field) => {
  delete field.input.value;
  return (
    <div className="input-field">
      <input type="file" name="image" {...field.input} />
    </div>
  );
}

export default FileInput;
