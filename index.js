import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../styles/index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import  MyCalender  from '../components/calender.js';

const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Layout className="layout">
    <Header>
      <div className="logo" >Training logo!</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        {new Array(3).fill(null).map((_, index) => {
          const key = index + 1;
          return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
        })}
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Subtitle-1</Breadcrumb.Item>
        <Breadcrumb.Item>Subtitle-2</Breadcrumb.Item>
        <Breadcrumb.Item>Subtitle-3</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content"><MyCalender/></div>
      
    </Content>
    <Footer style={{ textAlign: 'center' }}>Test for muscle group</Footer>
  </Layout>,
  document.getElementById('container'),
);

