import { Table, Input, Space, Modal, Spin, message } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped, MdModeEditOutline, MdOutlineArrowOutward } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/header/profileLogo.png";

import img from "../../assets/header/img1.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CategoryEdit } from "./CategoryEdit";
import { SubCategoryEdit } from "./SubCategoryEdit";
import Navigate from "../../Navigate";
import { AddSubCategories } from "./AddSubCategories";

const SubCategory = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();

  const userData = [
    {
      key: "1",
      sl: 1,

      categoryName: "John Doe",
      image: img,
    },
  ];

  const openModal = (record) => {
    setSelectedRecord(record);
    setModal2Open(true);
  };

  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
  };

  const handleEdit = (record) => {
    setEditModal(true);
  };

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      width: 70,
      align: "center",
    },
    {
      title: "Sub-Category Name",
      dataIndex: "categoryName",
    },
    {
      title: "Image",
      key: "image",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center">
          <img
            className="w-16 h-16 object-cover rounded"
            src={record.image}
            alt={record.categoryName}
          />
        </div>
      ),
    },
    
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleEdit(record)}
            className="bg-[#0022FF] text-[white] w-[35px] h-[35px] flex justify-center items-center rounded text-xl "
          >
            <MdModeEditOutline />
          </button>
          <button className="" >
            <span className="bg-[#DC4600] text-[white] w-[35px] h-[35px] flex justify-center items-center rounded text-xl ">
            <RiDeleteBin6Line />
            </span>
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-screen bg-white p-3">
      <div className="flex justify-between ">
      <Navigate title={'Sub-Categories'}></Navigate>
      <button onClick={() => setOpenAddModal(true)} className="bg-black py-2 px-4 text-white">+ Add New</button>
      </div>

      <Table
        columns={columns}
        dataSource={userData}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />

<AddSubCategories setOpenAddModal={setOpenAddModal} openAddModal={openAddModal}></AddSubCategories>
      <SubCategoryEdit editModal1={editModal} setEditModal1={setEditModal}></SubCategoryEdit>
    </div>
  );
};

export default SubCategory;
