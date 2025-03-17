import { Form, Input, Modal, Radio, Select } from "antd";
import React, { useState } from "react";

export const OrderEdit = ({ editModal, setEditModal }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Edit</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Package Name */}

         
          <Form.Item
            label="Order Status"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Radio.Group
              name="radiogroup"
              defaultValue={1}
              options={[
                { value: 1, label: "A" },
                { value: 2, label: "B" },
                { value: 3, label: "C" },
                { value: 4, label: "D" },
              ]}
            />
          </Form.Item>

      
          <Form.Item
            label="Payment Status"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Radio.Group
              name="radiogroup"
              defaultValue={1}
              options={[
                { value: 1, label: "A" },
                { value: 2, label: "B" },
                { value: 3, label: "C" },
                { value: 4, label: "D" },
              ]}
            />
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
