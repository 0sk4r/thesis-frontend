import React, {useState} from "react";
import {Button, Form, Icon, Upload} from "antd";

// Component for file upload
function SingleFileUpload({setFile}) {
  const [fileList, setFileList] = useState([]);

  function onRemove() {
    setFile(null);
  }

  // Upload file later manualy
  function beforeUpload(file) {
    setFile(file);
    return false;
  }

  // Show only last file
  function handleChange(info) {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  }

  return (
    <Form.Item>
      <Upload
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        onChange={handleChange}
        fileList={fileList}
        accept="image/*"
      >
        <Button>
          <Icon type="upload"/> Select File
        </Button>
      </Upload>
    </Form.Item>
  );
}

export default SingleFileUpload;
