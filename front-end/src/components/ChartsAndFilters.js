import React from "react";

import Box from "@mui/material/Box";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { shared } from './shared';
import { constants } from './constants';

class ChartsAndFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleValue: 'All'
        };
        this.callChartsAndFilters = this.callChartsAndFilters.bind(this);
        this.handleChangeToggle = this.handleChangeToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        shared.callChartsAndFilters = this.callChartsAndFilters;
    }

    componentDidMount() {
    }

    callChartsAndFilters(message) {
    }

    handleChangeToggle(e) {
        this.setState({ toggleValue: e.target.value })
        shared.callExpenceGrid({ action: 'filter-over-category', category: e.target.value })
    }

    handleClick(e) {
        this.setState({ toggleValue: e.target.value })
    }

    render() {
        return (
            <Box style={{ padding: 14 }}>
                <ToggleButtonGroup
                    size="small"
                    color="primary"
                    value={this.state.toggleValue}
                    exclusive
                    onChange={(e) => this.handleChangeToggle(e)}
                    aria-label="Platform">
                    {constants.categories.map((e, i) => <ToggleButton key={i} value={e} onClick={(e) => this.handleClick(e)}>{e}</ToggleButton>)}
                </ToggleButtonGroup>
            </Box>
        );
    }
}

export default ChartsAndFilters;