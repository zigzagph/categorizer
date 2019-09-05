import React from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import SelectFile from './SelectFile';
import ShowData from './ShowData';

// A page to open the pdf : done

// A page to display the contents of the pdf
// in a table with a selector at the beginning 

// a dialog to choose the category to place the item in

// a preview page of the categories

// a way to print everything out. 


const styles = {
    button: {
        margin: 20
    }
}

export default () => {
    const [docObj, setDocObj] = React.useState({debts:[]});
 
    const logState = () => {
        console.log(docObj)
    }

    const clearState = () => {
        //console.log(items)
        setDocObj({debts:[]});
    }

    return (
        <Container >
            <Grid container className="App">
                {docObj && docObj.debts.length > 0 ? 
                    <ShowData docObj={docObj}/> 
                    : 
                    <SelectFile setDocObj={(obj) => setDocObj(obj)} />
                }
            </Grid>
            <Grid container justify="center">
                <Button variant="contained" onClick={logState} style={styles.button}>
                    Log State
                </Button>
                <Button variant="contained" onClick={clearState} style={styles.button}>
                    Clear State
                </Button>
            </Grid>
        </Container>  
    );
}