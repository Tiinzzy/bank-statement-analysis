import React from "react";

import { shared } from './shared';

class ExpenceGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.callExpenceGrid = this.callExpenceGrid.bind(this);
        shared.callExpenceGrid = this.callExpenceGrid;
    }

    componentDidMount() {
    }

    callExpenceGrid(message) {        
        console.log(message);
        if (message.action === 'update-data') {
            console.log('now i have to update the whole grid data');
        } else if (message.action === 'filter-category') {
            console.log('now i have to just filter over the given category');
        }
    }

    render() {
        return <div style={{ padding: 5, width: 200, height: 200, background: '#eaeaea', height: 500 }}>This is the GRID</div>;
    }
}

export default ExpenceGrid;