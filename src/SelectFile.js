import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import axios from 'axios';
//import {Progress} from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    
    const handleFileIn = (e) => {
        //console.log("handleFileIn:");

        const data = new FormData()
        for (var x = 0; x < e.target.files.length; x++) {
            data.append('file', e.target.files[x])
        }

        axios.post("http://localhost:4000/upload", data, {
        })
        .then(res => { // then print response status
            //console.log("Response:", res);
            setDocObj(res.data);
        })
        .catch(err => { // then print response status
            // toast.error('upload fail')
            console.log("ERROR:", err);
        })

    }

    return (
        <Grid className={classes.root} container item justify="center" alignContent="center">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Categorizer
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Select a PDF file by clicking the icon below...
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify="center">
                        <input
                            accept=".pdf"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            onChange={handleFileIn}
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="text" component="span" size="small">
                                <PictureAsPdfSharpIcon style={{color: "firebrick"}} />
                            </Button>
                        </label> 
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}