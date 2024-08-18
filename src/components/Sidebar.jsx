import React, { useState } from 'react';
import {
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IdcardOutlined,
  TeamOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Mata Kuliah', 'sub1', <ReadOutlined />, [
    getItem('Add Mata Kuliah', '1'),
    getItem('View Mata Kuliah', '2'),
  ]),
  getItem('Mahasiswa', 'sub2', <TeamOutlined />, [
    getItem('Add Mahasiswa', '4'),
    getItem('View Mahasiswa', '5'),
  ]),
  getItem('Dosen', 'sub3', <IdcardOutlined />, [
    getItem('Add Dosen', '6'),
    getItem('View Dosen', '7'),
  ]),
  getItem('Jadwal', 'sub4', <ContainerOutlined />, [
    getItem('Add Jadwal', '8'),
    getItem('View Jadwal', '9'),
  ]),
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 300,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default Sidebar;