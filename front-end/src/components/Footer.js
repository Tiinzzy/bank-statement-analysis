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
            <Box style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'center', fontSize: '10px', borderTop: 'solid 1px #ffe08c',
                paddingTop: 6, margin: '10px 300px 10px 300px', color: '#6883a1'}}>
                Designed by Tina Vatanabadi, Copyright 2022
            </Box>
        );
    }
}
export default Footer;
