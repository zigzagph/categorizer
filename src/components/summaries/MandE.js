import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper, Divider } from '@material-ui/core';

const styles = {
    paper: {
        padding: 30,
        margin: "40px 0px 40px 0px",
    },
    header: {
        marginBottom: 40
    },
}

export default ({mande, period}) => {
    console.log(mande);

    const ME = () => {
        return (
            <Paper style={styles.paper}>
                <Grid item style={styles.header}>
                    <Typography variant="h4">
                        Meals & Entertainment Summary
                    </Typography>
                    <Typography variant="caption">
                        {period()}
                    </Typography>
                </Grid>
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
                {
                    mande.map((item, i) => {
                        return (
                        <Grid container key={i} style={{}}>
                            <Grid container item style={{marginTop: 10}}>
                                <Grid item xs={2} style={{}}>
                                    <Typography variant="body1" display="inline">{item.date}</Typography>
                                </Grid>
                                <Grid item xs={9} style={{}}>
                                    <Typography variant="body1" display="inline">{item.desc}</Typography>
                                </Grid>
                                <Grid container justify="flex-end" item xs={1} style={{ color: 'red'}}>
                                    <Typography variant="body1" display="inline">{item.amount}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item style={{marginBottom: 10}}>
                                <Grid container item xs={2} justify="flex-end" style={{}}>
                                    <Typography variant="body1" display="inline">Comment : </Typography>
                                </Grid>
                                <Grid item xs={9} style={{}}>
                                    <Typography variant="body1" display="inline">{item.comment}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Divider variant="middle" style={{margin: 1}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    )})
                }
            </Paper>
        )
    }

    return <div>{ mande.length > 0 ? <ME/> : null }</div>
}
