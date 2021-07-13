import React from 'react';
import MyCards from '../components/MyCards';
import PageLayout from '../components/PageLayout'

export default function TrainingIndex() {
    return (
        <PageLayout pageNum='2'>
            トレーニングホームページ
            <MyCards/>
        </PageLayout>
    )
}