import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    header: {
        marginBottom: 40
    },
}

export default ({period, title}) => {
    return (
        <Grid container direction="column" style={styles.header}>
            <Typography variant="caption">
                {"PMH Productions"}
            </Typography>
            <Typography variant="h5">
                {title + " Summary"}
            </Typography>
            <Typography variant="caption">
                {period()}
            </Typography>
        </Grid>
    )
}
