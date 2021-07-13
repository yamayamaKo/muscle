import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card, Col, Row } from 'antd';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { func } from 'prop-types';

export default function MyCards() {
  const router = useRouter();

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card 
            title="腕立て伏せ" 
            size={'small'}
            bordered={true} 
            hoverable={true} 
            cover = {<img src={'/images/push_up.jpeg'} alt="push_up"/>}
            onClick={() =>{
              router.push({
                pathname:"/training",
                query: {mode: "pushups", cnt: 10}
              })
            }}
          >         
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="スクワット" 
            size={'small'}
            bordered={true} 
            hoverable={true}
            cover = {<img src={'/images/Squat.jpeg'} alt="Squart"/>}
            onClick={() =>{
              router.push({
                pathname:"/training",
                query: {mode: "squat", cnt: 10}
              })
            }}
          >
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="腹筋" 
            size={'small'}
            bordered={true} 
            hoverable={true}
            cover = {<img src={'/images/Crunchy.jpeg'} alt="Crunchy"/>}
            onClick={() =>{
              router.push({
                pathname:"/training",
                query: {mode: "situps", cnt: 10}
              })
            }}
          >
          </Card>
        </Col>
      </Row>
    </div>
  )
}
