import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts'

export default function MuscleChart(props) {

    return(
        <RadarChart
            cx={250}
            cy={250}
            outerRadius={150}
            width={500}
            height={500}
            data={props.data}
        >
            <PolarGrid />
            <PolarAngleAxis dataKey='part'/>

            <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
            />

            <Radar
                dataKey='you'
                stroke='#8884d8'
                fill='#8884d8'
                fillOpacity={0.6}
            />

        </RadarChart>
    )
}