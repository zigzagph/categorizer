import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default () => {
    return (
        <Grid container>
            <Grid item xs={2} style={{}}>
                <Typography variant="overline" display="inline">Date</Typography>
            </Grid>
            <Grid item xs={9} style={{}}>
                <Typography variant="overline" display="inline">Description</Typography>
            </Grid>
            <Grid container justify="flex-end" item xs={1} style={{}}>
                <Typography variant="overline" display="inline">Amount</Typography>
            </Grid>
            <Grid item xs>
                <Divider variant="fullWidth" style={{margin: 1, backgroundColor: 'black'}}/>
            </Grid>
        </Grid>
    )
}
