import React from 'react';
import CKEditor from 'react-ckeditor-component';

const TextEditor = ({ input }) => {
  return (
    <CKEditor
      content={input.value}
      events={{
        "change": (event) => input.onChange(event.editor.getData())
      }}
    />
  );
};

export default TextEditor;
