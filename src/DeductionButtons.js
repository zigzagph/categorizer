import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
}));

export default ({deduction, handleChange}) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} justify="center">
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Deduction Category</FormLabel>
                <RadioGroup
                    name="deduction"
                    className={classes.group}
                    value={deduction}
                    onChange={handleChange}
                >
                    <FormControlLabel value="mande" control={<Radio />} label="Meals/Ent" />
                    <FormControlLabel value="travel" control={<Radio />} label="Travel" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
        </Grid>
    );
}
