import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import PageLayout from '../components/PageLayout'
import MuscleChart from '../components/MuscleChart';
import { Line } from 'rc-progress'

export default function Index() {
    const data = [
        {part: '腹', you:30, fullMark: 100},
        {part: '背中', you:30, fullMark: 100},
        {part: '足', you:30, fullMark: 100},
        {part: '腕', you:30, fullMark: 100},
        {part: '胸', you:30, fullMark: 100},
    ]

    return (
        <PageLayout pageNum='1'>
            〇〇のマイページ<br/>
            {/* TODO:ここで、ユーザの筋肉情報に基づいて表示する画像を変えたい */}
            <Line percent='10' strokeWidth='1' width='50%' strokeColor='blue'/>
            次のレベルまであとXXX
            <MuscleChart data={data}/>
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">ツイートして共有する</a>
        </PageLayout>
    )
}