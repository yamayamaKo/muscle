import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import PageLayout from '../components/PageLayout'
import MuscleChart from '../components/MuscleChart';
import { Line } from 'rc-progress'
import { connect } from 'react-redux';
import Image from 'next/image'
import Lib from '../lib/library'
import { Card, Col, Row } from 'antd';

function Index(props) {
    const data = [
        {part: '腹', you:props.user_status.abs, fullMark: 100},
        {part: '背中', you:props.user_status.back, fullMark: 100},
        {part: '足', you:props.user_status.leg, fullMark: 100},
        {part: '腕', you:props.user_status.arm, fullMark: 100},
        {part: '胸', you:props.user_status.chest, fullMark: 100},
    ]
    
    return (
        <PageLayout pageNum='1'>
            {props.login ? props.user_name : "〇〇"}さんのマイページ<br/>
            {/* TODO:ここで、ユーザの筋肉情報に基づいて表示する画像を変えたい */}
            {/* <Line percent='10' strokeWidth='1' width='50%' strokeColor='blue'/>
            次のレベルまであとXXX */}
            <Row gutter={16}>
                <Col span={12}>
                    <MuscleChart data={data}/>
                </Col>
                <Col span={12}>
                    <Image src={"/images/player/"+Lib.choiceImage(props.user_status)} width={400} height={400} />
                </Col>
            </Row>
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">ツイートして共有する</a>
        </PageLayout>
    )
}

export default connect((state) => state)(Index)