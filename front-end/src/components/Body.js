import React from "react";

import ExpenceGrid from "./ExpenceGrid";

import { shared } from './shared';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.callBody = this.callBody.bind(this);
        shared.callBody = this.callBody;

    }

    componentDidMount() {
    }

    callBody(message) {
        console.log(message);
    }

    render() {
        return (<div style={{ padding: 5, border: 'solid 1px gray', height: 700 }}>
            <div>This is where we put grid and initial text and ...</div>
            <ExpenceGrid />
        </div>);
    }
}

export default Body;