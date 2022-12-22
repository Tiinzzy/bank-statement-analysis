import React from "react";

import { Chart } from "react-google-charts";
import Box from '@mui/material/Box';

export default function GraphDialogDisplay(props) {
    
    return (
        <Box style={{ margin: 20 }}>
            {props.graphIndex === 1 && <Chart
                chartType="Bar"
                height={window.innerHeight / 2}
                data={props.dailyData}
            />}

            {props.graphIndex === 2 && <Chart
                chartType="Bar"
                height={window.innerHeight / 2}
                data={props.weeklyData}
            />}

            {props.graphIndex === 3 && <Chart
                chartType="Bar"
                height={window.innerHeight / 2}
                data={props.detailedData}
            />}
        </Box>
    );
};