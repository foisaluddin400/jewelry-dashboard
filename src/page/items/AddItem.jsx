import { Form, Input, Modal, Radio, Select, Upload } from "antd";
import React, { useState } from "react";

export const AddItem = ({ openAddModal, setOpenAddModal }) => {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Add</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Package Name */}

          <Form.Item
            label="Category Name"
            name="category"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input className="py-2" type="price" placeholder="Enter Category" />
          </Form.Item>
          <Form.Item
            label="Upload Image"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
     
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
        
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 w-full border text-black rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 w-full bg-black text-white rounded-md"
            >
              Update
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
