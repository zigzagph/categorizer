import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Clear from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    card: {
        maxWidth: 375,
        marginTop: 40
    },
    pos: {
        marginBottom: 12,
    },
    fab: {
        marginLeft: 20,
        marginRight: 20
    }
});

export default ({setSearch}) => {
    const classes = useStyles();
    const [query, setQuery] = React.useState("");

    const applyFilter = (e) => {
        const { value } = e.target;
        setQuery(value);
        setSearch(value);
    }

    const clearFilter = () => {
        setQuery("");
        setSearch("");
    }

    return (
        <Grid container justify="center">
            <Card className={classes.card}>
                <CardContent>
                    <Grid container justify="center">
                        <Typography variant="h5" component="h2">
                            List Filter
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            RegEx used on the description field
                        </Typography>
                        <TextField
                            variant="outlined"
                            label="Filter"
                            value={query}
                            fullWidth
                            onChange={(e) => applyFilter(e)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={clearFilter}
                                        >
                                            <Clear />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}
