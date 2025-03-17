import { Table, Input, Space, Modal, Spin, message } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped, MdModeEditOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/header/profileLogo.png";

import { AddItem } from "./AddItem";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navigate from "../../Navigate";
import { EditItem } from "./EditItem";

const Items = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();
  

  const userData = [
    {
      key: "1",
      sl: 1,
      itemName: "John Doe",
      category: "John Doe",
      sub_category: "John Doe",
      price: "1990-05-14",
      status: "in-progress",
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
      title: "Item Name",
      dataIndex: "itemName",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Sub-Category",
      dataIndex: "sub_category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button className="" onClick={() => openModal(record)}>
            <span className="bg-black text-[white] w-[35px] h-[35px] flex justify-center items-center rounded text-xl ">
              <LuEye />
            </span>
          </button>
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
          <button className="">
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
      <Navigate title={'Items'}></Navigate>
      <button onClick={() => setOpenAddModal(true)} className="text-white bg-black py-2 px-4">+ Add New</button>
      </div>

      <Table
        columns={columns}
        dataSource={userData}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />

      <Modal
        centered
        open={modal2Open}
        onCancel={closeModal}
        footer={null}
        closable={true}
        width={400}
        bodyStyle={{ borderRadius: 0 }}
        className="no-border-radius-modal"
        closeIcon={<span className="text-lg text-black">×</span>}
      >
        <div className="flex justify-center py-8">
          <img
            className="w-[70px] h-[70px] rounded-full"
            src={Profile}
            alt="profile"
          />
        </div>
        <div>
          <div className="grid grid-cols-2">
            <div className="text-lg gap-4">
              <h4>Customer Name</h4>
              <h4>Category</h4>
              <h4>Sub-Category</h4>
              <h4>Price</h4>
              <h4>Status:</h4>
            </div>
            <div className="gap-4 text-lg ">
              <h3>{selectedRecord?.itemName || "N/A"}</h3>
              <h3>{selectedRecord?.category || "N/A"}</h3>
              <h3>{selectedRecord?.sub_category || "N/A"}</h3>
              <h3>{selectedRecord?.price || "N/A"}</h3>
              <h3>{selectedRecord?.status || "N/A"}</h3>
            </div>
          </div>
        </div>
      </Modal>
      <AddItem setOpenAddModal={setOpenAddModal} openAddModal={openAddModal}></AddItem>
      <EditItem editModal1={editModal} setEditModal1={setEditModal}></EditItem>
      {/* <OrderEdit editModal={editModal} setEditModal={setEditModal}></OrderEdit> */}
    </div>
  );
};

export default Items;
