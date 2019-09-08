import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
//import BlurOn from '@material-ui/icons/BlurOn';

const useStyles = makeStyles({
    root: {
        margin: 40,
    },
    card: {
        minWidth: 275,
    },
    pos: {
        marginTop: 12,
    },
});

export default ({setDocObj}) => {
    const classes = useStyles();
    
    // handles the file selection
    // and making the API call
    const handleFile = (e) => {

        // append the file(s) to the formdata
        const data = new FormData()
        for (var x = 0; x < e.target.files.length; x++) {
            data.append('file', e.target.files[x])
        }

        // make the api call to the API server
        axios.post("http://localhost:4000/upload", data)
        .then(res => {
            console.log("Response:", res);
            setDocObj(res.data);
        })
        .catch(err => {
            console.log("ERROR:", err);
        })
    }

    // just used for testing
    /* const loadTest = () => {
        axios.get("http://localhost:4000")
        .then(res => {
            console.log("Response:", res);
            setDocObj(res.data);
        })
        .catch(err => {
            console.log("ERROR:", err);
        })
    } */

    return (
        <Grid className={classes.root} container item justify="center" alignContent="center">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Categorizer
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Click the button below and select a PDF file.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify="center">
                        <input
                            accept=".pdf"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            onChange={handleFile}
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Fab color="secondary" size="medium" component="span" style={{marginBottom: 20}}>
                                <PictureAsPdfSharpIcon />
                            </Fab>
                        </label> 
                    </Grid>
                    {/* <Grid container justify="center">
                        <Fab color="secondary" size="medium" onClick={loadTest} style={{marginBottom: 20}}>
                            <BlurOn />
                        </Fab>
                    </Grid> */}
                </CardActions>
            </Card>
        </Grid>
    );
}