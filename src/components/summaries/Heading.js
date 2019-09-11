import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToolTip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Box from '@material-ui/core/Box';

const styles = {
    header: {
        marginBottom: 40
    },
}

export default ({period, title, save}) => {
    return (
        <Grid container item style={styles.header}>
            <Grid item xs>
                <Typography variant="caption">
                    {"PMH Productions"}
                </Typography>
                <Typography variant="h4">
                    {title + " Summary"}
                </Typography>
                <Typography variant="caption">
                    {period()}
                </Typography>
            </Grid>
            <Grid container item xs justify="flex-end">
                <Box display="block" displayPrint="none">
                    <ToolTip title="Save">
                        <Fab color="primary" size="medium" onClick={save} style={{}}>
                            <SaveAlt />
                        </Fab>
                    </ToolTip>
                </Box>
                {/* {save} */}
            </Grid>
        </Grid>
    )
}
