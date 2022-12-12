import React from "react";

import Box from '@mui/material/Box';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'center', fontSize: '10px' }}>
                Proudly designed by Tina Vatanabadi, Copyright 2022.
            </Box>
        );
    }
}
export default Footer;