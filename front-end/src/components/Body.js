import React from "react";

import Box from "@mui/material/Box";

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
            <Box style={{ padding: 5, border: 'solid 1px gray', height: 700 }}>
                {this.state.message !== null ?
                    <ExpenceGrid />
                    : <Box pb={10}>
                        <ol>
                            {constants.help.map((e, i) => (
                                <li key={i}>{e}</li>
                            ))}
                        </ol>
                    </Box>}
            </Box>);
    }
}

export default Body;