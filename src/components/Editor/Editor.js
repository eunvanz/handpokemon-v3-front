import React, { memo } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko.js';
import MyUploadAdapter from '../../libs/fileUploadAdapter';
import { API_BASE_URL } from '../../constants/api';

const MyUploadAdapterPlugin = editor => {
  editor.plugins.get(
    `${API_BASE_URL}/files?path=article-images`
  ).createUploadAdapter = loader => {
    return new MyUploadAdapter(loader);
  };
};

const Editor = props => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        language: 'ko',
        placeholder: props.placeholder,
        extraPlugins: [MyUploadAdapterPlugin]
      }}
      {...props}
    />
  );
};

export default memo(Editor);
