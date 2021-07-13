import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card, Col, Row } from 'antd';



class MyCards extends Component{
  render () {
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
            >
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MyCards;
