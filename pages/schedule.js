import React from 'react';
import PageLayout from '../components/PageLayout'
import  MyCalender  from '../components/calender.js';
import { Breadcrumb } from 'antd';

export default function Schedule() {
    return (
        <PageLayout pageNum='3'>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Subtitle-1</Breadcrumb.Item>
                <Breadcrumb.Item>Subtitle-2</Breadcrumb.Item>
                <Breadcrumb.Item>Subtitle-3</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content"><MyCalender/></div>
        </PageLayout>
    )
}