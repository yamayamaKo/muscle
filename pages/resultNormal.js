import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import MuscleChart from '../components/MuscleChart';
import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function ResultNormal() {
    const data = [
        {part: '腹', you:30, fullMark: 100},
        {part: '背中', you:30, fullMark: 100},
        {part: '足', you:30, fullMark: 100},
        {part: '腕', you:30, fullMark: 100},
        {part: '胸', you:30, fullMark: 100},
    ]
    
    const dataLater = [
        {part: '腹', you:50, fullMark: 100},
        {part: '背中', you:30, fullMark: 100},
        {part: '足', you:30, fullMark: 100},
        {part: '腕', you:30, fullMark: 100},
        {part: '胸', you:30, fullMark: 100},
    ]
    return (
        <div>
            <div className='figure data'>
                <div className='original data' style={{
                                                        display:'inline-block',
                                                        position:'absolute',
                                                        left:'10%'
                                                    }}>
                    <MuscleChart
                        data={data}
                    />
                    <div style={{textAlign:'center'}}> This is div for original character</div>
                </div>
​
                <div 
                    className='arrow' 
                    style={{
                        display:'inline-block',
                        position:'absolute',
                        left:'46%',
                        right:'50%',
                        top:'20%'
                    }}
                >
                    <ArrowRightOutlined style={{fontSize:100}}/>
                </div>
                
                
                <div className='later data' style={{display:'inline-block',
                                                    position:'absolute',
                                                    right:'10%'
                                                    }}>
                    <MuscleChart
                        data={dataLater}
                    />
                    <div style={{textAlign:'center'}}> This is div for later character</div>
                </div>
            </div>
            <div className='word data' style={{
                                                alignContent:'center',
                                                left:'40%',
                                                right:'40%',
                                                bottom:'5%',
                                                position:'absolute'
                                            }}>
                <Result 
                    icon={<SmileOutlined />}   
                title="Great, you have done all the excise!"
                subTitle='You get xxx exp!'
                extra={<Button type="primary">
                    <Link href="/">
                        Return to myprofile
                    </Link>
                </Button>}
                /> 
            </div>
      </div>
    )
}