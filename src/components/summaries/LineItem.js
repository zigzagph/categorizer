import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default ({item}) => {
    console.log(item);
    return (
        <Grid container>
            <Grid container item style={{marginTop: 10}}>
                <Grid item xs={2}>
                    <Typography variant="body1" display="inline">{item.date}</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body1" display="inline">{item.desc}</Typography>
                </Grid>
                <Grid container justify="flex-end" item xs={1} style={{ color: 'red'}}>
                    <Typography variant="body1" display="inline">{item.amount}</Typography>
                </Grid>
            </Grid>
            {
                item.comment ? 
                    <Grid container item style={{marginBottom: 10, marginTop: 10}}>
                        <Grid container item xs={2} justify="flex-end">
                            <Typography variant="body1" display="inline">Purchase Note : </Typography>
                        </Grid>
                        <Grid item xs={9} style={{paddingLeft: 4}}>
                            <Typography variant="body1" display="inline">{item.comment}</Typography>
                        </Grid>
                    </Grid>
                :
                    null
            }
            {
                item.adjustment ? 
                    <Grid container item style={{marginBottom: 10}}>
                        <Grid container item xs={2} justify="flex-end">
                            <Typography variant="body1" display="inline">Adjustment : </Typography>
                        </Grid>
                        <Grid item xs={9} style={{paddingLeft: 4}}>
                            <Typography variant="body1" display="inline">{item.adjustmentComment}</Typography>
                        </Grid>
                        <Grid container item xs={1} justify='flex-end' style={{paddingLeft: 4}}>
                            <Typography variant="body1" display="inline">{item.adjustment}</Typography>
                        </Grid>
                    </Grid>
                :
                    null
            }
            <Grid container>
                <Grid item xs>
                    <Divider variant="middle" style={{margin: 1}}/>
                </Grid>
            </Grid>
        </Grid>
    )
}
