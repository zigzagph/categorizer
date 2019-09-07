import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
/**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export default ({items}) => {
    return (
        <Grid container item xs style={{marginTop: 20}} justify="flex-end" alignItems="center">
            <Typography display="inline" variant="body1" style={{paddingRight: 20}}>
                <strong>Total :</strong>
            </Typography>
            <Typography display="inline" variant="body2" style={{paddingRight: 30, color: 'red'}}>
                <strong>{items.reduce((p, c) => p += Number(c.amount.replace(',', '')), 0).format(2)}</strong>
            </Typography>
        </Grid>
    )
}
