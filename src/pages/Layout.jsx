import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ContainerOutlined,
  IdcardOutlined,
  TeamOutlined,
  ReadOutlined,
  EyeOutlined,
  PlusOutlined,
  LogoutOutlined,
  FormOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useAuth } from '../hooks/useAuth';
const { Header, Sider, Content } = Layout;


const Layouts = () => {
  useAuth();
  const navigate = useNavigate();

  function handleMenuClick({ key }) {
    switch (key) {
      case '1':
        navigate('/matakuliah/add');
        break;
      case '2':
        navigate('/matakuliah/view');
        break;
      case '3':
        navigate('/mahasiswa/add');
        break;
      case '4':
        navigate('/mahasiswa/view');
        break;
      case '5':
        navigate('/dosen/add');
        break;
      case '6':
        navigate('/dosen/view');
        break;
      case '7':
        navigate('/jadwal/add');
        break;
      case '8':
        navigate('/jadwal/view');
        break;
      default:
        break;
    }
  }

  function getItem(label, key, icon, children, type, onClick) {
    return {
      key,
      icon,
      children,
      label,
      type,
      onClick
    };
  }

  function showLogoutConfirmation() {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('idToken');
        navigate('/login');
      } else {
        console.log('Cancel');
      }
    });
  }

  const items = [
    getItem('Mata Kuliah', 'sub1', <ReadOutlined />, [
      getItem('Add Mata Kuliah', '1', <PlusOutlined />),
      getItem('View Mata Kuliah', '2', <EyeOutlined />),
    ]),
    getItem('Mahasiswa', 'sub2', <TeamOutlined />, [
      getItem('Add Mahasiswa', '3', <PlusOutlined />),
      getItem('View Mahasiswa', '4', <EyeOutlined />),
    ]),
    getItem('Dosen', 'sub3', <IdcardOutlined />, [
      getItem('Add Dosen', '5', <PlusOutlined />),
      getItem('View Dosen', '6', <EyeOutlined />),
    ]),
    getItem('Jadwal', 'sub4', <ContainerOutlined />, [
      getItem('Add Jadwal', '7', <PlusOutlined />),
      getItem('View Jadwal', '8', <EyeOutlined />),
    ]),
    getItem('Logout', '10', <LogoutOutlined />, null, null, showLogoutConfirmation),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <main className='flex'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='text-[16px] font-bold bg-[#1B9AD7]  py-5 justify-between px-[30px] flex'>
          <Link to="/" className='text-white hover:text-white'><FormOutlined className='mr-2' />{collapsed ? '' : 'ADAB'}</Link>
        </div>
        <Menu
          mode="inline"
          color="#fff"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          style={{ height: '100vh' }}
          onClick={({ key }) => handleMenuClick({ key })}
        />
      </Sider>
      <main className='w-full'>
        <Header
          style={{
            padding: 0,
            background: "#1B9AD7",
            color: "#fff",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: '#fff',
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Link className="text-white hover:text-white" to="/">Dashboard</Link>
        </Header>
        <Content
          style={{
            margin: '16px 8px',
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </main>
    </main>
  );
};


export default Layouts;
