import React from "react";

import ExpenceGrid from "./ExpenceGrid";

import { shared } from './shared';

import { constants } from './constants';

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
        return (
            <div style={{ padding: 5, border: 'solid 1px gray', height: 700 }}>
                <div pb={10}>
                    <ol>
                        {constants.help.map((e, i) => (
                            <li key={i}>{e}</li>
                        ))}
                    </ol>
                </div>
            </div>);
    }
}

export default Body;