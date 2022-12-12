import React from "react";

import Box from "@mui/material/Box";

import ExpenceGrid from "./ExpenceGrid";

import { shared } from './shared';
import { constants } from './constants';
import { getDataFromPublic } from "./functions";


class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []

        };
        this.callBody = this.callBody.bind(this);
        shared.callBody = this.callBody;

    }

    async componentDidMount() {
        let data = await getDataFromPublic();
        this.setState({ data });
    }

    callBody(message) {
        console.log(message);
    }

    render() {
        return (
            <Box style={{ padding: 5, border: 'solid 1px gray', height: 700 }}>
                {this.state.data.length > 0 ?
                    <ExpenceGrid data={this.state.data} />
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