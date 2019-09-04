import React from 'react';
import { Grid, Container } from '@material-ui/core';
import SelectFile from './SelectFile';

// A page to open the pdf

// A page to display the contents of the pdf
// in a table with a selector at the beginning 

// a dialog to choose the category to place the item in

// a preview page of the categories

// a way to print everything out. 


export default () => {
    return (
        <Container>
            <Grid container className="App">
                <SelectFile />
            </Grid>
        </Container>  
    );
}