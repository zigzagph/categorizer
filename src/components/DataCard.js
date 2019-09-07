import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    card: {
        minWidth: 300,
        margin: 40
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default ({docObj}) => {
    const classes = useStyles();
    return (
        <Grid container justify="center">
            <Card className={classes.card}>
                <CardContent>
                    <Grid container direction="column">
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Statement Origin
                        </Typography>
                        <Typography variant="h5" component="h2" style={{ color: "crimson"}}>
                            {docObj.author}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {docObj.startMonth + " - " + docObj.endMonth}
                        </Typography>
                    </Grid>
                    <Grid container direction="row">
                        <Grid container alignItems="center" item xs={6} style={{}} direction="column">
                            <Typography variant="body1" component="p">
                                <strong>Activity</strong>
                            </Typography>
                            <Typography variant="body2" component="p">
                                Deposits: {docObj.deposits}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Checks: {docObj.checks}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Withdrawls: {docObj.withdrawls}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Debit/Credit: {docObj.debits}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Total: {Number(docObj.deposits) + Number(docObj.checks) +  Number(docObj.withdrawls) + Number(docObj.debits)}
                            </Typography>
                        </Grid>
                        <Grid container alignItems="center" item xs={6} style={{width: 300}} direction="column">
                            <Typography variant="body1" component="p">
                                <strong>Stats</strong>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Earned Interest: {docObj.skipped}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Number of pages: {docObj.pages}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Total Lines: {docObj.total}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Parsed Lines: {docObj.complete}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}
