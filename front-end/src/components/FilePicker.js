import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useFilePicker } from 'use-file-picker';

import { shared } from './shared';

const csv = require('csvtojson');

export default function FilePicker(props) {
    const [, setJCsv] = useState(null);
    const [gridRef,] = useState(React.createRef());

    const [openFileSelector, { filesContent, clear }] = useFilePicker({
        accept: '.CSV',
    });

    async function convertToCsv(content) {
        let csvData = await csv().fromString(content);
        let id = 1000;
        let data = {};

        let saveData = {};
        csvData.forEach(row => {
            row.id = id++;
            row.CATEGORY = 'None';
            data[row.id] = row;
            row.AMOUNT = (row.AMOUNT * 1).toFixed(2);
            saveData[row.id] = row;
        });

        setJCsv(saveData);

        if (gridRef.current !== null) {
            gridRef.current.refreshGrid(saveData);
        }
        clear();
    }

    function processContent(content) {
        convertToCsv(content);
        return null;
    }

    return (
        <>
            <Button size="small" variant="outlined" onClick={() => openFileSelector()}>Select File </Button>
            {filesContent.map((file, i) => (
                <Box key={i}>{processContent(file.content, i)}</Box>))}
        </>

    );
}