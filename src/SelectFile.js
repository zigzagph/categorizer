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
import { ToastContainer, toast } from 'react-toastify';
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

export default () => {
    const classes = useStyles();
    const [loaded, setLoaded] = React.useState(0);
    
    const handleFileIn = (e) => {
        //console.log("handleFileIn:");

        const data = new FormData()
        for (var x = 0; x < e.target.files.length; x++) {
            data.append('file', e.target.files[x])
        }

        axios.post("http://localhost:4000/upload", data, {
            onUploadProgress: ProgressEvent => {
                setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100);
            },
        })
        .then(res => { // then print response status
            console.log("Response:", res);
            toast.success('upload success')
        })
        .catch(err => { // then print response status
            toast.error('upload fail')
        })

    }
    
    /* const showState = () => {
        console.log(file);
    } */

    return (
        <Grid className={classes.root} container item justify="center">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Categorizer
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Select a PDF file below to open and categorize...
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
                        {/* <Button size="small" onClick={showState}>State</Button> */}
                        <ToastContainer />
                        {/* {
                            loaded > 0 ? 
                                <Progress max="100" color="success" value={loaded} >{Math.round(loaded,2) }%</Progress> 
                            :
                                 null
                        } */}
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}