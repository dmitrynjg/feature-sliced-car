import { Input, Label } from '@/shared';
import React, { useEffect } from 'react';

export interface UploadProps {
  className?: string;
  getImages?: (images: FileList | null) => void;
  label?: string;
}

export const Upload: React.FC<UploadProps> = ({ className, getImages, label }) => {
  return (
    <div className={`grid w-full items-center gap-1.5 ${className}`}>
      <Label htmlFor='pictures'>{label || 'Выберите файлы'}</Label>
      <Input
        id='pictures'
        type='file'
        multiple
        onChange={(event) => {
          // const formData = new FormData();
          if (event.target.files) {
            getImages && getImages(event.target.files);
          }
          // if (event.target.files) {
          //   // Object.values(event.target.files).forEach((file) => {
          //   //   formData.append('files', file);
          //   // });
          //   getImages(event.target.files);
          //   upload(formData);
          // }

          // event.target.files.forEach((file) => {
          //   console.log(file);
          // })
          // formData.append('files', event.target.files);
          // upload(formData);
        }}
      />
    </div>
  );
};

// const data = new FormData();
// files.forEach((result) => {
//   let type = result.uri.split('.').reverse()[0];
//   let fileName = result.uri.split('/').pop();
//   type = type === 'jpg' ? 'jpeg' : type;
//   data.append('files', {
//     uri: result.uri,
//     name: result.fileName || fileName,
//     type: `${result.type}/${type}`,
//   });
//   // result.fileName || fileName
// });
