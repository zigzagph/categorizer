import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
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
    console.log(docObj);

    return (
        <Grid container justify="center">
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Statement Origin
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {docObj.author}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {docObj.startMonth + " - " + docObj.endMonth}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Activity
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
                </CardContent>
                <CardActions>
                    {/* <Button size="small">Learn More</Button> */}
                    <Grid container direction="column">
                        <Typography color="textSecondary">
                            Total lines in pages: {docObj.total}
                        </Typography>
                        <Typography color="textSecondary">
                            Total complete lines: {docObj.complete}
                        </Typography>
                        <Typography color="textSecondary">
                            Number of skipped lines (Earned Interest): {docObj.skipped}
                        </Typography>
                        <Typography color="textSecondary">
                            Number of pages parsed: {docObj.pages}
                        </Typography>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}
