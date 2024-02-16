import React, { Component } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UploadUI from './components/UploadUI';
import InputForm from './components/InputForm';

import { Button, Menu } from 'antd';
import "antd/dist/reset.css";
import './App.css';
import {
  DashboardOutlined, HomeOutlined
} from "@ant-design/icons/lib/icons";

function App() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <Header />
      <div style={{ display: "flex", flexDirection: "row", flex: 1}}>
        <Menu onClick={({ key }) => { navigate(key) } }
          items={[
            { label: "Home", key: '/', icon: <HomeOutlined /> },
            { label: "Q&A", key: '/dashboard', icon: <DashboardOutlined /> }
          ]}></Menu>
        <Content />
      </div>
      <Footer />
    </div>
  );
}

function Content() {
  return (
    <div style={{ flex: 1}}>
      <Routes>
        <Route path='/' element={<UploadUI />} />
        <Route path='/dashboard' element={<InputForm/>} />
      </Routes>
    </div>
  );
}

function Header() {
  return (
    <div style={{
      height: 60,
      backgroundColor: "#3498db",
      color: "white",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center"
    }}></div>
  );
}

function Footer() {
  return (
    <div style={{
      height: 60,
      backgroundColor: "#2ecc71",
      color: "white",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    }}></div>
  );
}

export default App;
