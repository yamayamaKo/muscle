import {React, Component}  from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link'
import Head from 'next/head'

const { Header, Content, Footer } = Layout;

export default function PageLayout(props) {
    const navItems = ['マイページ','トレーニング','スケジュール']
    const navAddresses = ['/', '/trainingIndex', '/schedule']
    return(
    <Layout className="layout">
        <Head>
            <title>筋肉</title>
            <meta charSet="utf-8"/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css"/>
            <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.2/drawing_utils.js" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/pose.js" crossOrigin="anonymous"></script>
        </Head>
        <Header>
            <Link href="/">
                <a><div className="logo" >筋肉</div></a>
            </Link>
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