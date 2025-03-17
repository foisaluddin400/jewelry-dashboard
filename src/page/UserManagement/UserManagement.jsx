import { Table, Input, Space, Modal, Spin, message } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/header/profileLogo.png";
import Navigate from "../../Navigate";

const UserManagement = () => {

  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  const userData = [
    {
      key: "1",
      sl: 1,
      userName: "John Doe",
      address: "1990-05-14",
      contactNumber: "1234567890",
      email: "john@example.com",
      status: "in-progress",
    },
    
  ];


  const handleToggleStatus = (record) => {
    const newStatus = record.status === "blocked" ? "in-progress" : "blocked";
    setLoadingId(record.key);

    setTimeout(() => {
      message.success(`User status changed to ${newStatus}`);
      record.status = newStatus;
      setLoadingId(null);
    }, 1000);
  };

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      width: 70,
      align: "center",
    },
    {
      title: "User's Name",
      dataIndex: "userName",
      width: 150,
      render: (text) => (
        <Space>
          <img
            src="https://via.placeholder.com/32"
            alt="avatar"
            style={{ borderRadius: "50%", width: 32, height: 32 }}
          />
          {text}
        </Space>
      ),
    },
    {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Mobile Number",
        dataIndex: "contactNumber",
      },
    {
      title: "Address",
      dataIndex: "address",
    },
    
 
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          
          <button
            onClick={() => handleToggleStatus(record)}
            className={`${
              record.status === "blocked" ? "bg-red-600" : "bg-gray-600"
            } text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md`}
            disabled={loadingId === record.key}
          >
            {loadingId === record.key ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : (
              <MdBlockFlipped />
            )}
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-screen bg-white p-3">
      <div className="flex justify-between  ">
        <Navigate title={'User Managements'}></Navigate>
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: "16px", maxWidth: "300px" }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={userData}
        pagination={false}
      />

      
    </div>
  );
};

export default UserManagement;