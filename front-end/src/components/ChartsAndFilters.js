import React from "react";

import { shared } from './shared';

class ChartsAndFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.callChartsAndFilters = this.callChartsAndFilters.bind(this);
        shared.callChartsAndFilters = this.callChartsAndFilters;
    }

    componentDidMount() {
    }

    callChartsAndFilters(message) {
        console.log(message);
    }
    render() {
        return <div style={{ padding: 5, border: 'solid 1px blue' }}>This is where we put fast category filters and charts menu</div>;
    }
}

export default ChartsAndFilters;