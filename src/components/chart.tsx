import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, YAxis,VerticalGridLines,HorizontalGridLines, XAxis} from 'react-vis';

type tableChartProps = {
    id1: string;
    id2: string;
    data1: any[];
    data2: any[];
};

const Chart: React.FunctionComponent<tableChartProps> = ({ id1, id2, data1, data2 }) => {
    return(
        <div className="tableChart">
            <h2>DATA</h2>
            <div className="legend">
                <div className="identifiers">
                    <div className="squareId1"></div>
                    <p>{id1}</p>
                </div>
                <div className="identifiers">
                    <div className="squareId2"></div>
                    <p>{id2}</p>
                </div>
            </div>
        <XYPlot height={300} width={1000} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <LineSeries data={data1} style={{stroke: 'violet', strokeWidth: 3}}/>
            <LineSeries data={data2} style={{stroke: 'red', strokeWidth: 3}}/>
        </XYPlot>
        </div>
    )
}

export default Chart