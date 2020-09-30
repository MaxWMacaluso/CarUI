//Code heavily inspired by https://github.com/bradtraversy/react_file_uploader
//See tutorial at https://www.youtube.com/watch?v=b6Oe2puTdMQ&t=755s&ab_channel=TraversyMedia

import React, {useState} from 'react';
import axios from 'axios'

const FileUpload = () => {
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file)
    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res);
      const { fileName, filePath } = res.data
      setUploadedFile({fileName, filePath});
    } catch(err) {
      if(err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='file' className = 'fileUploadInput' id = 'customFile' onChange={onChange}/>
        <label className = 'fileUploadInput' for = 'customFile'>
          {filename}
        </label>

        <input type ="submit" value="Upload" / >
      </form>
    </div>
  )
}

export default FileUpload
