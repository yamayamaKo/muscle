import {React, Component}  from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link'

const { Header, Content, Footer } = Layout;

export default function PageLayout(props) {
    const navItems = ['マイページ','トレーニング','スケジュール']
    const navAddresses = ['/', '/trainingIndex', '/schedule']

    return(
    <Layout className="layout">
        <Header>
            <div className="logo" >Training logo!</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[props.pageNum]}>
                {new Array(3).fill(null).map((_, index) => {
                const key = index + 1;
                return (
                    <Menu.Item key={key}>
                        <Link href={navAddresses[index]}>
                            <a>{navItems[index]}</a>
                        </Link>
                    </Menu.Item>
                )
                })}
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Test for muscle group</Footer>
    </Layout>
    )
}