import React from "react";

import Box from "@mui/system/Box";

import FilePicker from "./FilePicker";

import { shared } from './shared';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.callHeader = this.callHeader.bind(this);
        shared.callHeader = this.callHeader;
    }

    componentDidMount() {
    }

    callHeader(message) {
        console.log(message);
    }


    updateBody() {
        shared.callBody({ message: 'thanks for your input!' });
    }

    updateExpenceGrid(action) {
        if (action === 'update-data') {
            shared.callExpenceGrid({ action, rows: [1, 2, 3], checkBox: true });
        } else if (action === 'show-less-than-100') {
            shared.callExpenceGrid({ action });
        }
    }

    render() {
        return (
            <Box style={{ borderBottom:'solid 5px #fbc531',  padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'right', backgroundColor: '#063970' }}>
                <Box flexGrow={1} style={{ textAlign: 'center', padding: 10, color: '#f5f5ff', fontWeight:'normal' }}>Bank Statement Analysis </Box>
                <FilePicker />
            </ Box>
        );
    }
}

export default Header;