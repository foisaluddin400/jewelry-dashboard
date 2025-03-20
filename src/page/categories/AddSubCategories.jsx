import { Form, Input, Modal, Radio, Select, Spin, Upload } from "antd";
import React, { useState } from "react";
import { useAddCategoryMutation } from "../redux/api/categoryApi";

export const AddSubCategories = ({ openAddModal, setOpenAddModal ,id, subCategoryData}) => {
  console.log(id)
  const [addSubCategory] = useAddCategoryMutation()
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
 const [loading, setLoading] = useState(false);
  // const tt = nameData?.map(item=> item?.categoryName)
  // console.log(nameData)
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

  
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };


  const handleSubmit = async (values) => {
    const formData = new FormData();
    console.log(values);
    formData.append("parent", values?.parent);
    formData.append("name", values?.name);
    formData.append("details", values?.details);

    fileList.forEach((file) => {
      formData.append("image", file.originFileObj);
    });
  setLoading(true)
    addSubCategory(formData)
  .then((response) => {
    console.log(response)
    setOpenAddModal(false);

    if (response) {
      message.success(response?.data?.message);
      form.resetFields();
    } 
    setFileList([]);
    setLoading(false);
  })
  .catch((error) => {
    message.error(error?.data?.message);
    console.error("Error submitting form:", error);
    setLoading(false);
  });
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
            label="Sub-Category Name"
            name="parent"
          initialValue={subCategoryData?.name}
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input disabled className="py-2" type="price" placeholder="Enter Category" />
          </Form.Item>
          <Form.Item
                      label="Category Name"
                      name="name"
                      rules={[{ required: true, message: "Please enter the category" }]}
                    >
                      <Input className="py-2" type="price" placeholder="Enter Category" />
                    </Form.Item>
          <Form.Item
            label="Details"
            name="details"
            rules={[{ required: true, message: "Please enter the Details" }]}
          >
            <Input className="py-2" type="price" placeholder="Enter Category" />
          </Form.Item>
          <Form.Item label="Photos">
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        multiple={true} 
                      >
                        {fileList.length < 5 && '+ Upload'}
                      </Upload>
                    </Form.Item>

         
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
              disabled={loading}
              className="px-4 py-2 w-full bg-black text-white rounded-md"
            >
              {loading ? (
                <Spin size="small" /> 
              ) : (
                "Update"
              )}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
