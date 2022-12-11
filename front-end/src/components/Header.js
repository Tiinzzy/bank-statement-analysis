import React from "react";

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
        if (action  === 'update-data') {
            shared.callExpenceGrid({ action, rows: [1, 2, 3], checkBox: true });
        } else if (action  === 'filter-category') { 
            shared.callExpenceGrid({ action, category: 'commute' });
        }
    }

    render() {
        return (
            <div style={{ padding: 5, border: 'solid 1px red' }}>
                This is header and probably the place to put upload file (i suggest top right)
                <div>
                    <button style={{ margin: 10 }} onClick={() => this.updateBody()}>update someting in Body</button>
                    <button style={{ margin: 10 }} onClick={() => this.updateExpenceGrid('update-data')}>send new data to expence grid</button>
                    <button style={{ margin: 10 }} onClick={() => this.updateExpenceGrid('filter-category')}>filter data for category</button>
                </div>
            </div>);
    }
}

export default Header;