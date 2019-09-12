import React from 'react';
import { Grid, Container } from '@material-ui/core';
import SelectFile from './components/SelectFile';
import ShowData from './components/ShowData';
import Dehaze from '@material-ui/icons/Dehaze';
import Fab from '@material-ui/core/Fab';
import ToolTip from '@material-ui/core/Tooltip';
import Clear from '@material-ui/icons/Clear';

// A page to select a pdf : done

// table with a selector at the beginning : done

// a dialog to choose the category to place the item in : done

//Need to create the category tables, summaries/totals : done
//also need to indicate on the table what has already been categoriezed : going to remove from list

// a preview component of the deductions : done

// a way to print/save a summary component : done


const styles = {
    fab: {
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
                {
                    docObj && docObj.debts.length > 0 ? 
                        <ShowData docObj={docObj}/> : 
                        <SelectFile setDocObj={(obj) => setDocObj(obj)} />
                }
            </Grid>
            
            <Grid container justify="center">
                <ToolTip title="Get State Log">
                    <Fab color="primary" size="medium" onClick={logState} style={styles.fab}>
                        <Dehaze />
                    </Fab>
                </ToolTip>
                <ToolTip title="Clear State">
                    <Fab color="primary" size="medium" onClick={clearState} style={styles.fab}>
                        <Clear />
                    </Fab>
                </ToolTip>
            </Grid>
        </Container>  
    );
}