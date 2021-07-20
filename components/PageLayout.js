import {React, Component}  from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link'
import Head from 'next/head'
import Lib from '../lib/library'
import firebase from 'firebase';
import { connect } from 'react-redux';

const { Header, Content, Footer } = Layout;

function PageLayout(props) {
    const navItems = ['マイページ','トレーニング','スケジュール']
    const navAddresses = ['/', '/trainingIndex', '/schedule']
    const defaultStatus = {abs: 0, arm: 0, back: 0, chest: 0, leg: 0, exp: 0}

    const login = () => {
        // Googleを利用した認証
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user_email = Lib.encodeEmail(result.user.email)
                firebase.database().ref(Lib.encodeEmail(result.user.email)).on('value', (snapshot) => {
                    if (snapshot.exists()){
                        props.dispatch({
                            type:'UpdateUser',
                            value:{
                                login:true,
                                user_name: result.user.displayName,
                                email: Lib.encodeEmail(result.user.email),
                                user_status: snapshot.val()
                            }
                        })
                    }else {
                        firebase.database().ref(user_email).set(defaultStatus)
                        props.dispatch({
                            type:'UpdateUser',
                            value:{
                                login:true,
                                user_name: result.user.displayName,
                                email: Lib.encodeEmail(result.user.email),
                                user_status: defaultStatus
                            }                            
                        })
                    }
                })
            })
    }

    const logout = () => {
        firebase.auth().signOut();
        props.dispatch({
            type:'UpdateUser',
            value:{
                login: false,
                user_name: '',
                email: '',
                user_status: defaultStatus,
            }
        })
    }

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
                {props.login ? 
                (
                    <Menu.Item key={4} onClick={() => {logout()}}>
                        ログアウト
                    </Menu.Item>
                )
                :
                (
                    <Menu.Item key={4} onClick={() => {login()}}>
                        ログイン
                    </Menu.Item>
                ) }
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Test for muscle group</Footer>
    </Layout>
    )
}

export default connect((state) => state)(PageLayout)